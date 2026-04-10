import OpenAI from "openai";
import { BaseTextAdapter } from "@tanstack/ai/adapters";
import type {
  ContentPart,
  StreamChunk,
  TextOptions,
  Tool,
} from "@tanstack/ai";

import type { OpencodeModel } from "./constants.js";
import { OPENCODE_BASE_URL_ZEN, OPENCODE_BASE_URL_GO } from "./constants.js";
import type {
  OpencodeBaseOptions,
  OpencodeToolsOptions,
  OpencodeStructuredOutputOptions,
  OpencodeStreamingOptions,
  OpencodeVisionOptions,
} from "./provider-options.js";
import { ALL_MODELS } from "./model-meta.js";
import type { OpencodeModelMeta } from "./types.js";

/**
 * Combined options type for OpenCode models
 */
export type OpencodeProviderOptions = OpencodeBaseOptions &
  Partial<OpencodeToolsOptions> &
  Partial<OpencodeStructuredOutputOptions> &
  Partial<OpencodeStreamingOptions> &
  Partial<OpencodeVisionOptions>;

/**
 * Get model metadata by name
 */
function getModelMeta(name: OpencodeModel): OpencodeModelMeta {
  const model = ALL_MODELS.find((m) => m.name === name);
  if (!model) throw new Error(`Unknown model: ${name}`);
  return model;
}

/**
 * Extract text content from a message content value.
 */
function extractTextContent(content: string | null | Array<ContentPart>): string {
  if (content === null) return "";
  if (typeof content === "string") return content;
  return content
    .filter((p): p is ContentPart & { type: "text" } => p.type === "text")
    .map((p) => p.content)
    .join("");
}

/**
 * Convert TanStack AI tools to OpenAI format
 */
function convertToolsToOpenAI(
  tools?: Array<Tool<unknown, unknown, string>>,
): OpenAI.Chat.ChatCompletionTool[] | undefined {
  if (!tools || tools.length === 0) return undefined;

  return tools.map((tool) => ({
    type: "function" as const,
    function: {
      name: tool.name,
      description: tool.description,
      parameters: (tool.inputSchema || { type: "object", properties: {} }) as Record<string, unknown>,
    },
  }));
}

/**
 * OpenCode Text Adapter
 *
 * Implements TanStack AI BaseTextAdapter with comprehensive model metadata support.
 */
/**
 * Output metadata by modality
 */
interface OutputMetadataByModality {
  text: Record<string, unknown>;
  image: Record<string, unknown>;
  audio: Record<string, unknown>;
  video: Record<string, unknown>;
  document: Record<string, unknown>;
}

/**
 * OpenCode Text Adapter
 *
 * Implements TanStack AI BaseTextAdapter with comprehensive model metadata support.
 */
class OpencodeTextAdapter extends BaseTextAdapter<
  OpencodeModel,
  OpencodeProviderOptions,
  readonly ["text"] | readonly ["text", "image"],
  OutputMetadataByModality
> {
  readonly kind = "text" as const;
  readonly name = "opencode" as const;
  readonly model: OpencodeModel;
  private openaiClient: OpenAI;

  constructor(
    config: {
      apiKey: string;
      baseURL: string;
      timeout?: number;
      maxRetries?: number;
    },
    model: OpencodeModel,
  ) {
    super({}, model);
    this.model = model;
    this.openaiClient = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
      timeout: config.timeout,
      maxRetries: config.maxRetries,
    });
  }

  async *chatStream(options: TextOptions<OpencodeProviderOptions>): AsyncIterable<StreamChunk> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    // Add system prompts
    if (options.systemPrompts && options.systemPrompts.length > 0) {
      messages.push({
        role: "system",
        content: options.systemPrompts.join("\n"),
      });
    }

    // Convert messages to OpenAI format
    for (const msg of options.messages) {
      if (msg.role === "user") {
        messages.push({
          role: "user",
          content: extractTextContent(msg.content),
        });
      } else if (msg.role === "assistant") {
        const hasToolCalls = msg.toolCalls && msg.toolCalls.length > 0;
        const assistantMsg: OpenAI.Chat.ChatCompletionAssistantMessageParam & {
          reasoning_content?: string;
        } = {
          role: "assistant",
          content: hasToolCalls ? null : extractTextContent(msg.content),
        };
        if (hasToolCalls && msg.toolCalls) {
          assistantMsg.tool_calls = msg.toolCalls.map((tc) => ({
            id: tc.id,
            type: "function",
            function: {
              name: tc.function.name,
              arguments: tc.function.arguments,
            },
          }));
          // Kimi requires reasoning_content on assistant tool call messages
          if (this.model === "kimi-k2.5") {
            assistantMsg.reasoning_content = " ";
          }
        }
        messages.push(assistantMsg);
      } else if (msg.role === "tool") {
        if (!msg.toolCallId) {
          console.warn("[OpenCode Adapter] Skipping tool message without toolCallId");
          continue;
        }
        messages.push({
          role: "tool",
          tool_call_id: msg.toolCallId,
          content: extractTextContent(msg.content),
        });
      }
    }

    // Generate AG-UI protocol IDs
    const runId = `run-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    let hasEmittedRunStarted = false;
    let hasEmittedTextMessageStart = false;

    if (process.env.DEBUG_OPENCODE) {
      console.log("[OpenCode Adapter] Sending messages:", JSON.stringify(messages, null, 2));
    }

    try {
      const tools = convertToolsToOpenAI(options.tools);
      const modelMeta = getModelMeta(this.model);

      const stream = await this.openaiClient.chat.completions.create({
        model: this.model,
        messages,
        stream: true,
        max_tokens: options.maxTokens || modelMeta.maxOutputTokens,
        temperature: options.temperature,
        top_p: options.topP,
        tools,
        tool_choice: tools ? "auto" : undefined,
      });

      const toolCallMetadata = new Map<
        number,
        { id: string; name: string; started: boolean; args: string; ended: boolean }
      >();
      let accumulatedContent = "";
      let hasEmittedRunFinished = false;

      for await (const chunk of stream) {
        const timestamp = Date.now();
        const delta = chunk.choices[0]?.delta;

        // Emit RUN_STARTED on first chunk
        if (!hasEmittedRunStarted) {
          hasEmittedRunStarted = true;
          yield {
            type: "RUN_STARTED",
            runId,
            model: this.model,
            timestamp,
          };
        }

        // Handle tool calls
        if (delta?.tool_calls && delta.tool_calls.length > 0) {
          for (const toolCallDelta of delta.tool_calls) {
            const index = toolCallDelta.index ?? 0;

            // Initialize metadata for this index if not exists
            if (!toolCallMetadata.has(index)) {
              toolCallMetadata.set(index, {
                id: toolCallDelta.id || "",
                name: toolCallDelta.function?.name || "",
                started: false,
                args: "",
                ended: false,
              });
            }
            const metadata = toolCallMetadata.get(index)!;

            // Update ID and name if provided (first chunk)
            if (toolCallDelta.id) {
              metadata.id = toolCallDelta.id;
            }
            if (toolCallDelta.function?.name) {
              metadata.name = toolCallDelta.function.name;
            }

            // Emit TOOL_CALL_START when we have an ID and haven't started yet
            if (metadata.id && !metadata.started) {
              metadata.started = true;
              yield {
                type: "TOOL_CALL_START",
                toolCallId: metadata.id,
                toolName: metadata.name,
                model: this.model,
                timestamp,
                index,
              };
            }

            // Accumulate and emit TOOL_CALL_ARGS for arguments delta
            if (toolCallDelta.function?.arguments) {
              metadata.args += toolCallDelta.function.arguments;
              if (metadata.id) {
                yield {
                  type: "TOOL_CALL_ARGS",
                  toolCallId: metadata.id,
                  model: this.model,
                  timestamp,
                  delta: toolCallDelta.function.arguments,
                };
              }
            }
          }
        }

        // Handle content
        if (delta?.content) {
          // Emit TEXT_MESSAGE_START on first text content
          if (!hasEmittedTextMessageStart) {
            hasEmittedTextMessageStart = true;
            yield {
              type: "TEXT_MESSAGE_START",
              messageId,
              model: this.model,
              timestamp,
              role: "assistant",
            };
          }

          accumulatedContent += delta.content;
          yield {
            type: "TEXT_MESSAGE_CONTENT",
            messageId,
            model: this.model,
            timestamp,
            delta: delta.content,
            content: accumulatedContent,
          };
        }

        const finishReason = chunk.choices[0]?.finish_reason;

        if (finishReason && !hasEmittedRunFinished) {
          hasEmittedRunFinished = true;

          // If tool_calls finish reason, emit TOOL_CALL_END for any unended tool calls
          if (finishReason === "tool_calls") {
            for (const metadata of toolCallMetadata.values()) {
              if (!metadata.ended && metadata.id) {
                metadata.ended = true;
                // Parse accumulated arguments
                let parsedInput: Record<string, unknown> = {};
                try {
                  parsedInput = metadata.args ? JSON.parse(metadata.args) : {};
                } catch {
                  parsedInput = {};
                }
                yield {
                  type: "TOOL_CALL_END",
                  toolCallId: metadata.id,
                  toolName: metadata.name,
                  model: this.model,
                  timestamp: Date.now(),
                  input: parsedInput,
                };
              }
            }
          }

          // Emit TEXT_MESSAGE_END if we had text content
          if (hasEmittedTextMessageStart) {
            yield {
              type: "TEXT_MESSAGE_END",
              messageId,
              model: this.model,
              timestamp: Date.now(),
            };
          }

          // Emit RUN_FINISHED
          const hasFunctionCalls = toolCallMetadata.size > 0;
          yield {
            type: "RUN_FINISHED",
            runId,
            model: this.model,
            timestamp: Date.now(),
            finishReason: hasFunctionCalls ? "tool_calls" : "stop",
          };
        }
      }
    } catch (error) {
      const err = error as Error & { status?: number; statusText?: string; error?: unknown }
      console.error("[OpenCode Adapter] Error during chat stream:", {
        message: err.message,
        status: err.status,
        statusText: err.statusText,
        errorBody: err.error,
      });
      yield {
        type: "RUN_ERROR",
        runId,
        model: this.model,
        timestamp: Date.now(),
        error: {
          message: err.message || "Unknown error during chat stream",
          code: err.status?.toString(),
        },
      };
    }
  }

  async structuredOutput<T = unknown>(options: {
    chatOptions: TextOptions<OpencodeProviderOptions>;
    outputSchema: Record<string, unknown>;
  }): Promise<{ data: T; rawText: string }> {
    const modelMeta = getModelMeta(this.model);

    if (!modelMeta.supports.structuredOutput) {
      throw new Error(`Model ${this.model} does not support structured output.`);
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (options.chatOptions.systemPrompts && options.chatOptions.systemPrompts.length > 0) {
      messages.push({
        role: "system",
        content: options.chatOptions.systemPrompts.join("\n"),
      });
    }

    for (const msg of options.chatOptions.messages) {
      if (msg.role === "user") {
        messages.push({
          role: "user",
          content: extractTextContent(msg.content),
        });
      }
    }

    // Build response format based on schema
    const responseFormat: OpenAI.Chat.ChatCompletionCreateParams["response_format"] =
      options.outputSchema
        ? {
            type: "json_schema",
            json_schema: {
              name: "response",
              schema: options.outputSchema as Record<string, unknown>,
              strict: true,
            },
          }
        : { type: "json_object" };

    const response = await this.openaiClient.chat.completions.create({
      model: this.model,
      messages,
      response_format: responseFormat,
      max_tokens: options.chatOptions.maxTokens || modelMeta.maxOutputTokens,
      temperature: options.chatOptions.temperature,
      top_p: options.chatOptions.topP,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from model");
    }

    try {
      return { data: JSON.parse(content), rawText: content };
    } catch {
      throw new Error(`Failed to parse structured output as JSON: ${content}`);
    }
  }
}

// ==========================================
// FACTORY FUNCTIONS
// ==========================================

/**
 * Helper to get API key from environment
 */
function getOpencodeApiKeyFromEnv(): string {
  const key = process.env.OPENCODE_API_KEY;
  if (!key) {
    throw new Error(
      "OPENCODE_API_KEY environment variable is required. " +
        "Get your API key at https://opencode.ai/auth",
    );
  }
  return key;
}

/**
 * Get the base URL for a given subscription tier
 */
function getBaseURL(subscription: "zen" | "go" = "zen"): string {
  return subscription === "go" ? OPENCODE_BASE_URL_GO : OPENCODE_BASE_URL_ZEN;
}

/**
 * Configuration options for opencodeText
 */
export interface OpencodeTextConfig extends OpencodeProviderOptions {
  /** OpenCode subscription tier: 'zen' (pay-as-you-go, default) or 'go' ($10/month) */
  subscription?: "zen" | "go";
}

/**
 * Creates an OpenCode text adapter for TanStack AI
 *
 * @param model - The model identifier (e.g., 'kimi-k2.5', 'claude-opus-4-6')
 * @param config - Optional configuration including subscription (zen/go), temperature, etc.
 *
 * @example
 * ```typescript
 * import { opencodeText } from '@marcross/ai-opencode'
 *
 * // Zen (default, pay-as-you-go)
 * const adapter = opencodeText('kimi-k2.5')
 *
 * // Go subscription ($10/month)
 * const goAdapter = opencodeText('kimi-k2.5', { subscription: 'go' })
 *
 * // With options
 * const adapter = opencodeText('claude-opus-4-6', {
 *   temperature: 0.7,
 *   maxTokens: 4096,
 * })
 * ```
 */
export function opencodeText(model: OpencodeModel, config?: OpencodeTextConfig) {
  const apiKey = config?.apiKey || getOpencodeApiKeyFromEnv();
  const subscription = config?.subscription ?? "zen";

  return new OpencodeTextAdapter(
    {
      apiKey,
      baseURL: getBaseURL(subscription),
      timeout: config?.timeout,
      maxRetries: config?.maxRetries,
    },
    model,
  );
}

/**
 * Alias for opencodeText
 */
export const opencode = opencodeText;

/**
 * Factory function with explicit API key
 *
 * @param model - The model identifier
 * @param apiKey - Your OpenCode API key
 * @param config - Optional additional configuration
 */
export function createOpencodeChat(
  model: OpencodeModel,
  apiKey: string,
  config?: Omit<OpencodeTextConfig, "apiKey">,
) {
  const subscription = config?.subscription ?? "zen";

  return new OpencodeTextAdapter(
    {
      apiKey,
      baseURL: getBaseURL(subscription),
      timeout: config?.timeout,
      maxRetries: config?.maxRetries,
    },
    model,
  );
}

// ==========================================
// RE-EXPORTS FROM MODULES
// ==========================================

export { OpencodeTextAdapter };
export type { OpencodeModel, OpencodeZenModel, OpencodeGoModel } from "./constants.js";
export type {
  OpencodeProvider,
  OpencodeSubscription,
  OpencodeEndpoint,
  OpencodeModelMeta,
  OpencodeConfigBase,
} from "./types.js";

// Model metadata exports
export {
  KIMI_K2_5,
  CLAUDE_OPUS_4_6,
  CLAUDE_OPUS_4_5,
  CLAUDE_OPUS_4_1,
  CLAUDE_SONNET_4_6,
  CLAUDE_SONNET_4_5,
  CLAUDE_SONNET_4,
  CLAUDE_HAIKU_4_5,
  CLAUDE_HAIKU_3_5,
  GPT_5_4,
  GPT_5_4_PRO,
  GPT_5_4_MINI,
  GPT_5_4_NANO,
  GPT_5_3_CODEX,
  GPT_5_3_CODEX_SPARK,
  GPT_5_2,
  GPT_5_2_CODEX,
  GPT_5_1,
  GPT_5_1_CODEX,
  GPT_5_1_CODEX_MAX,
  GPT_5_1_CODEX_MINI,
  GPT_5,
  GPT_5_CODEX,
  GPT_5_NANO,
  GEMINI_3_1_PRO,
  GEMINI_3_FLASH,
  GLM_5_1,
  GLM_5,
  MINIMAX_M2_5,
  MINIMAX_M2_5_FREE,
  MINIMAX_M2_7,
  MIMO_V2_OMNI,
  MIMO_V2_PRO,
  BIG_PICKLE,
  QWEN_3_6_PLUS_FREE,
  NEMOTRON_3_SUPER_FREE,
  ALL_MODELS,
} from "./model-meta.js";

// Constants exports
export {
  OPENCODE_ZEN_MODELS,
  OPENCODE_GO_MODELS,
  OPENCODE_CHAT_MODELS,
  OPENCODE_TOOLS_MODELS,
  OPENCODE_STREAMING_MODELS,
  OPENCODE_STRUCTURED_OUTPUT_MODELS,
  OPENCODE_VISION_MODELS,
  OPENCODE_ANTHROPIC_MODELS,
  OPENCODE_OPENAI_MODELS,
  OPENCODE_GOOGLE_MODELS,
  OPENCODE_MOONSHOT_MODELS,
  OPENCODE_ZHIPU_MODELS,
  OPENCODE_MINIMAX_MODELS,
  OPENCODE_BASE_URL_ZEN,
  OPENCODE_BASE_URL_GO,
} from "./constants.js";

// Provider options exports
export type {
  OpencodeBaseOptions,
  OpencodeToolsOptions,
  OpencodeStructuredOutputOptions,
  OpencodeStreamingOptions,
  OpencodeVisionOptions,
  OpencodeChatModelProviderOptionsByName,
  OpencodeModelInputModalitiesByName,
  OpencodeModelOutputModalitiesByName,
} from "./provider-options.js";

export default opencodeText;
