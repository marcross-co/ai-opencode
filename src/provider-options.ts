/**
 * Option fragments and per-model type definitions
 * TanStack AI Community Adapter for OpenCode
 */

import type { Tool } from "@tanstack/ai";

// ==========================================
// OPTION FRAGMENTS
// ==========================================

/**
 * Base options supported by all OpenCode models
 */
export interface OpencodeBaseOptions {
  /** OpenCode API key (falls back to OPENCODE_API_KEY env var) */
  apiKey?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Maximum number of retries for failed requests */
  maxRetries?: number;
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Sampling temperature (0-2) */
  temperature?: number;
  /** Nucleus sampling (0-1) */
  topP?: number;
}

/**
 * Tool/function calling options
 */
export interface OpencodeToolsOptions {
  /** Tools available to the model */
  tools?: Array<Tool<unknown, unknown, string>>;
  /** How to choose tools: 'auto' lets model decide, 'none' disables tools */
  toolChoice?:
    | "auto"
    | "none"
    | { type: "function"; function: { name: string } };
}

/**
 * Structured output options
 */
export interface OpencodeStructuredOutputOptions {
  /** Response format for structured output */
  responseFormat?:
    | { type: "json_object" }
    | { type: "json_schema"; schema: object; name?: string };
}

/**
 * Streaming options
 */
export interface OpencodeStreamingOptions {
  /** Enable streaming response */
  stream?: boolean;
}

/**
 * Vision/multimodal options
 */
export interface OpencodeVisionOptions {
  /** Enable vision capabilities */
  vision?: boolean;
}

// ==========================================
// PER-MODEL PROVIDER OPTIONS
// ==========================================

/**
 * Map of provider options for each model.
 * Models only include options they actually support based on verified capabilities.
 */
export type OpencodeChatModelProviderOptionsByName = {
  // Moonshot
  "kimi-k2.5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;

  // Anthropic - all support same features
  "claude-opus-4-6": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-opus-4-5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-opus-4-1": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-sonnet-4-6": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-sonnet-4-5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-sonnet-4": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-haiku-4-5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "claude-3-5-haiku": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;

  // OpenAI - all GPT models support same features
  "gpt-5.4": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.4-pro": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.4-mini": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.4-nano": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.3-codex": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.3-codex-spark": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.2": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.2-codex": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.1": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.1-codex": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.1-codex-max": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5.1-codex-mini": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5-codex": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gpt-5-nano": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;

  // Google
  "gemini-3.1-pro": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "gemini-3-flash": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;

  // Zhipu - text-only (no vision)
  "glm-5.1": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions;
  "glm-5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions;

  // MiniMax - conservative (no structured output or vision)
  "minimax-m2.5": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStreamingOptions;
  "minimax-m2.5-free": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStreamingOptions;
  "minimax-m2.7": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStreamingOptions;

  // MiMo
  "mimo-v2-omni": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "mimo-v2-pro": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions;

  // Others - conservative
  "big-pickle": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStreamingOptions;
  "qwen3.6-plus-free": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStructuredOutputOptions &
    OpencodeStreamingOptions &
    OpencodeVisionOptions;
  "nemotron-3-super-free": OpencodeBaseOptions &
    OpencodeToolsOptions &
    OpencodeStreamingOptions;
};

// ==========================================
// PER-MODEL INPUT MODALITIES
// ==========================================

/**
 * Input modalities supported by each model.
 * Text-only models: ['text']
 * Vision models: ['text', 'image']
 */
export type OpencodeModelInputModalitiesByName = {
  "kimi-k2.5": readonly ["text", "image"];
  "claude-opus-4-6": readonly ["text", "image"];
  "claude-opus-4-5": readonly ["text", "image"];
  "claude-opus-4-1": readonly ["text", "image"];
  "claude-sonnet-4-6": readonly ["text", "image"];
  "claude-sonnet-4-5": readonly ["text", "image"];
  "claude-sonnet-4": readonly ["text", "image"];
  "claude-haiku-4-5": readonly ["text", "image"];
  "claude-3-5-haiku": readonly ["text", "image"];
  "gpt-5.4": readonly ["text", "image"];
  "gpt-5.4-pro": readonly ["text", "image"];
  "gpt-5.4-mini": readonly ["text", "image"];
  "gpt-5.4-nano": readonly ["text", "image"];
  "gpt-5.3-codex": readonly ["text", "image"];
  "gpt-5.3-codex-spark": readonly ["text", "image"];
  "gpt-5.2": readonly ["text", "image"];
  "gpt-5.2-codex": readonly ["text", "image"];
  "gpt-5.1": readonly ["text", "image"];
  "gpt-5.1-codex": readonly ["text", "image"];
  "gpt-5.1-codex-max": readonly ["text", "image"];
  "gpt-5.1-codex-mini": readonly ["text", "image"];
  "gpt-5": readonly ["text", "image"];
  "gpt-5-codex": readonly ["text", "image"];
  "gpt-5-nano": readonly ["text", "image"];
  "gemini-3.1-pro": readonly ["text", "image"];
  "gemini-3-flash": readonly ["text", "image"];
  "glm-5.1": readonly ["text"];
  "glm-5": readonly ["text"];
  "minimax-m2.5": readonly ["text"];
  "minimax-m2.5-free": readonly ["text"];
  "minimax-m2.7": readonly ["text"];
  "mimo-v2-omni": readonly ["text", "image"];
  "mimo-v2-pro": readonly ["text"];
  "big-pickle": readonly ["text"];
  "qwen3.6-plus-free": readonly ["text", "image"];
  "nemotron-3-super-free": readonly ["text"];
};

// ==========================================
// PER-MODEL OUTPUT MODALITIES
// ==========================================

/**
 * Output modalities supported by each model.
 * Currently all models only support text output.
 */
export type OpencodeModelOutputModalitiesByName = {
  "kimi-k2.5": readonly ["text"];
  "claude-opus-4-6": readonly ["text"];
  "claude-opus-4-5": readonly ["text"];
  "claude-opus-4-1": readonly ["text"];
  "claude-sonnet-4-6": readonly ["text"];
  "claude-sonnet-4-5": readonly ["text"];
  "claude-sonnet-4": readonly ["text"];
  "claude-haiku-4-5": readonly ["text"];
  "claude-3-5-haiku": readonly ["text"];
  "gpt-5.4": readonly ["text"];
  "gpt-5.4-pro": readonly ["text"];
  "gpt-5.4-mini": readonly ["text"];
  "gpt-5.4-nano": readonly ["text"];
  "gpt-5.3-codex": readonly ["text"];
  "gpt-5.3-codex-spark": readonly ["text"];
  "gpt-5.2": readonly ["text"];
  "gpt-5.2-codex": readonly ["text"];
  "gpt-5.1": readonly ["text"];
  "gpt-5.1-codex": readonly ["text"];
  "gpt-5.1-codex-max": readonly ["text"];
  "gpt-5.1-codex-mini": readonly ["text"];
  "gpt-5": readonly ["text"];
  "gpt-5-codex": readonly ["text"];
  "gpt-5-nano": readonly ["text"];
  "gemini-3.1-pro": readonly ["text"];
  "gemini-3-flash": readonly ["text"];
  "glm-5.1": readonly ["text"];
  "glm-5": readonly ["text"];
  "minimax-m2.5": readonly ["text"];
  "minimax-m2.5-free": readonly ["text"];
  "minimax-m2.7": readonly ["text"];
  "mimo-v2-omni": readonly ["text"];
  "mimo-v2-pro": readonly ["text"];
  "big-pickle": readonly ["text"];
  "qwen3.6-plus-free": readonly ["text"];
  "nemotron-3-super-free": readonly ["text"];
};
