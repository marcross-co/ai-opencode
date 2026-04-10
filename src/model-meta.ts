/**
 * Model metadata for all OpenCode models
 * TanStack AI Community Adapter for OpenCode
 *
 * NOTE: Capabilities are set conservatively (Option A):
 * - Only verified capabilities marked as true
 * - Unclear capabilities marked as false with notes
 */

import type { OpencodeModelMeta } from "./types.js";

// ==========================================
// MOONSHOT AI MODELS
// ==========================================

export const KIMI_K2_5: OpencodeModelMeta = {
  name: "kimi-k2.5",
  description:
    "Moonshot AI advanced reasoning model with 200K context and vision support",
  provider: "moonshot",
  subscription: "both",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 0.6,
    output: 3.0,
    cachedInput: 0.1,
    currency: "USD",
  },
};

// ==========================================
// ANTHROPIC MODELS (Claude 3 family)
// ==========================================

export const CLAUDE_OPUS_4_6: OpencodeModelMeta = {
  name: "claude-opus-4-6",
  description:
    "Anthropic Claude Opus 4.6 - Most capable model for complex tasks",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 5.0,
    output: 25.0,
    cachedInput: 0.5,
    cachedWrite: 6.25,
    currency: "USD",
  },
};

export const CLAUDE_OPUS_4_5: OpencodeModelMeta = {
  name: "claude-opus-4-5",
  description: "Anthropic Claude Opus 4.5",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 5.0,
    output: 25.0,
    cachedInput: 0.5,
    cachedWrite: 6.25,
    currency: "USD",
  },
};

export const CLAUDE_OPUS_4_1: OpencodeModelMeta = {
  name: "claude-opus-4-1",
  description: "Anthropic Claude Opus 4.1 - Original Opus model",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 15.0,
    output: 75.0,
    cachedInput: 1.5,
    cachedWrite: 18.75,
    currency: "USD",
  },
};

export const CLAUDE_SONNET_4_6: OpencodeModelMeta = {
  name: "claude-sonnet-4-6",
  description: "Anthropic Claude Sonnet 4.6 - Balanced performance",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 3.0,
    output: 15.0,
    cachedInput: 0.3,
    cachedWrite: 3.75,
    currency: "USD",
  },
};

export const CLAUDE_SONNET_4_5: OpencodeModelMeta = {
  name: "claude-sonnet-4-5",
  description: "Anthropic Claude Sonnet 4.5",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 3.0,
    output: 15.0,
    cachedInput: 0.3,
    cachedWrite: 3.75,
    currency: "USD",
  },
  notes: "Input cost doubles to $6.00 for contexts >200K tokens",
};

export const CLAUDE_SONNET_4: OpencodeModelMeta = {
  name: "claude-sonnet-4",
  description: "Anthropic Claude Sonnet 4",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 3.0,
    output: 15.0,
    cachedInput: 0.3,
    cachedWrite: 3.75,
    currency: "USD",
  },
  notes: "Input cost doubles to $6.00 for contexts >200K tokens",
};

export const CLAUDE_HAIKU_4_5: OpencodeModelMeta = {
  name: "claude-haiku-4-5",
  description: "Anthropic Claude Haiku 4.5 - Fast, cost-effective",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 4096,
  pricing: {
    input: 1.0,
    output: 5.0,
    cachedInput: 0.1,
    cachedWrite: 1.25,
    currency: "USD",
  },
};

export const CLAUDE_HAIKU_3_5: OpencodeModelMeta = {
  name: "claude-3-5-haiku",
  description: "Anthropic Claude 3.5 Haiku - Fast, cost-effective model",
  provider: "anthropic",
  subscription: "zen",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0.8,
    output: 4.0,
    cachedInput: 0.08,
    cachedWrite: 1.0,
    currency: "USD",
  },
  notes: "Also used by OpenCode for generating session titles",
};

// ==========================================
// OPENAI MODELS (GPT family)
// ==========================================

export const GPT_5_4: OpencodeModelMeta = {
  name: "gpt-5.4",
  description: "OpenAI GPT-5.4 - Advanced reasoning and coding",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 2.5,
    output: 15.0,
    cachedInput: 0.25,
    currency: "USD",
  },
};

export const GPT_5_4_PRO: OpencodeModelMeta = {
  name: "gpt-5.4-pro",
  description: "OpenAI GPT-5.4 Pro - Most capable GPT model",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 30.0,
    output: 180.0,
    cachedInput: 30.0,
    currency: "USD",
  },
};

export const GPT_5_4_MINI: OpencodeModelMeta = {
  name: "gpt-5.4-mini",
  description: "OpenAI GPT-5.4 Mini - Balanced performance",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 0.75,
    output: 4.5,
    cachedInput: 0.075,
    currency: "USD",
  },
};

export const GPT_5_4_NANO: OpencodeModelMeta = {
  name: "gpt-5.4-nano",
  description: "OpenAI GPT-5.4 Nano - Fast, cost-effective",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 0.2,
    output: 1.25,
    cachedInput: 0.02,
    currency: "USD",
  },
};

export const GPT_5_3_CODEX: OpencodeModelMeta = {
  name: "gpt-5.3-codex",
  description: "OpenAI GPT-5.3 Codex - Specialized for coding",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.75,
    output: 14.0,
    cachedInput: 0.175,
    currency: "USD",
  },
};

export const GPT_5_3_CODEX_SPARK: OpencodeModelMeta = {
  name: "gpt-5.3-codex-spark",
  description: "OpenAI GPT-5.3 Codex Spark - Lightweight coding model",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.75,
    output: 14.0,
    cachedInput: 0.175,
    currency: "USD",
  },
};

export const GPT_5_2: OpencodeModelMeta = {
  name: "gpt-5.2",
  description: "OpenAI GPT-5.2",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.75,
    output: 14.0,
    cachedInput: 0.175,
    currency: "USD",
  },
};

export const GPT_5_2_CODEX: OpencodeModelMeta = {
  name: "gpt-5.2-codex",
  description: "OpenAI GPT-5.2 Codex",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.75,
    output: 14.0,
    cachedInput: 0.175,
    currency: "USD",
  },
};

export const GPT_5_1: OpencodeModelMeta = {
  name: "gpt-5.1",
  description: "OpenAI GPT-5.1",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.07,
    output: 8.5,
    cachedInput: 0.107,
    currency: "USD",
  },
};

export const GPT_5_1_CODEX: OpencodeModelMeta = {
  name: "gpt-5.1-codex",
  description: "OpenAI GPT-5.1 Codex",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.07,
    output: 8.5,
    cachedInput: 0.107,
    currency: "USD",
  },
};

export const GPT_5_1_CODEX_MAX: OpencodeModelMeta = {
  name: "gpt-5.1-codex-max",
  description: "OpenAI GPT-5.1 Codex Max",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.25,
    output: 10.0,
    cachedInput: 0.125,
    currency: "USD",
  },
};

export const GPT_5_1_CODEX_MINI: OpencodeModelMeta = {
  name: "gpt-5.1-codex-mini",
  description: "OpenAI GPT-5.1 Codex Mini",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 0.25,
    output: 2.0,
    cachedInput: 0.025,
    currency: "USD",
  },
};

export const GPT_5: OpencodeModelMeta = {
  name: "gpt-5",
  description: "OpenAI GPT-5",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.07,
    output: 8.5,
    cachedInput: 0.107,
    currency: "USD",
  },
};

export const GPT_5_CODEX: OpencodeModelMeta = {
  name: "gpt-5-codex",
  description: "OpenAI GPT-5 Codex",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 1.07,
    output: 8.5,
    cachedInput: 0.107,
    currency: "USD",
  },
};

export const GPT_5_NANO: OpencodeModelMeta = {
  name: "gpt-5-nano",
  description: "OpenAI GPT-5 Nano - Free model",
  provider: "openai",
  subscription: "zen",
  endpoint: "/responses",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 16384,
  pricing: {
    input: 0,
    output: 0,
    currency: "USD",
  },
  notes: "Free model with usage limits",
};

// ==========================================
// GOOGLE MODELS (Gemini family)
// ==========================================

export const GEMINI_3_1_PRO: OpencodeModelMeta = {
  name: "gemini-3.1-pro",
  description: "Google Gemini 3.1 Pro - Advanced reasoning with 1M context",
  provider: "google",
  subscription: "zen",
  endpoint: "/models/gemini-3.1-pro",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 200000,
  maxOutputTokens: 8192,
  pricing: {
    input: 2.0,
    output: 12.0,
    cachedInput: 0.2,
    currency: "USD",
  },
  notes: "Pricing changes to $4.00/$18.00 for contexts >200K tokens",
};

export const GEMINI_3_FLASH: OpencodeModelMeta = {
  name: "gemini-3-flash",
  description: "Google Gemini 3 Flash - Fast, cost-effective",
  provider: "google",
  subscription: "zen",
  endpoint: "/models/gemini-3-flash",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 8192,
  pricing: {
    input: 0.5,
    output: 3.0,
    cachedInput: 0.05,
    currency: "USD",
  },
};

// ==========================================
// ZHIPU AI MODELS (GLM family)
// ==========================================

export const GLM_5_1: OpencodeModelMeta = {
  name: "glm-5.1",
  description: "Zhipu AI GLM 5.1 - Flagship model with 200K context",
  provider: "zhipu",
  subscription: "both",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: false,
  },
  contextWindow: 200000,
  maxOutputTokens: 128000,
  pricing: {
    input: 1.4,
    output: 4.4,
    cachedInput: 0.26,
    currency: "USD",
  },
  notes: "Text-only. Use GLM-5V-Turbo variant for vision support",
};

export const GLM_5: OpencodeModelMeta = {
  name: "glm-5",
  description: "Zhipu AI GLM 5 - General purpose model",
  provider: "zhipu",
  subscription: "both",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: false,
  },
  contextWindow: 200000,
  maxOutputTokens: 128000,
  pricing: {
    input: 1.0,
    output: 3.2,
    cachedInput: 0.2,
    currency: "USD",
  },
  notes: "Text-only. Use GLM-5V-Turbo variant for vision support",
};

// ==========================================
// MINIMAX MODELS
// ==========================================

export const MINIMAX_M2_5: OpencodeModelMeta = {
  name: "minimax-m2.5",
  description: "MiniMax M2.5 - General purpose chat model",
  provider: "minimax",
  subscription: "both",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: false,
    vision: false,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0.3,
    output: 1.2,
    cachedInput: 0.06,
    currency: "USD",
  },
  notes:
    "Structured output and vision support not verified. Available for free during beta",
};

export const MINIMAX_M2_5_FREE: OpencodeModelMeta = {
  name: "minimax-m2.5-free",
  description: "MiniMax M2.5 Free - Limited time free access",
  provider: "minimax",
  subscription: "zen",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: false,
    vision: false,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0,
    output: 0,
    currency: "USD",
  },
  notes: "Free during beta period. Data may be used for model improvement",
};

export const MINIMAX_M2_7: OpencodeModelMeta = {
  name: "minimax-m2.7",
  description: "MiniMax M2.7 - Enhanced version of M2.5",
  provider: "minimax",
  subscription: "go",
  endpoint: "/messages",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: false,
    vision: false,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0.3,
    output: 1.2,
    cachedInput: 0.06,
    currency: "USD",
  },
  notes: "Structured output and vision support not verified",
};

// ==========================================
// MIMO MODELS
// ==========================================

export const MIMO_V2_OMNI: OpencodeModelMeta = {
  name: "mimo-v2-omni",
  description: "MiMo V2 Omni - Multimodal model",
  provider: "mimo",
  subscription: "go",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0.5,
    output: 2.0,
    currency: "USD",
  },
  notes: 'Vision support inferred from "omni" naming. Verification needed',
};

export const MIMO_V2_PRO: OpencodeModelMeta = {
  name: "mimo-v2-pro",
  description: "MiMo V2 Pro - Professional tier model",
  provider: "mimo",
  subscription: "go",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: false,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0.5,
    output: 2.0,
    currency: "USD",
  },
  notes: "Vision support not verified",
};

// ==========================================
// OTHER MODELS
// ==========================================

export const BIG_PICKLE: OpencodeModelMeta = {
  name: "big-pickle",
  description: "OpenCode Big Pickle - Stealth model",
  provider: "opencode",
  subscription: "zen",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: false,
    vision: false,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0,
    output: 0,
    currency: "USD",
  },
  notes:
    "Stealth model. Free during testing. Data may be used for model improvement",
};

export const QWEN_3_6_PLUS_FREE: OpencodeModelMeta = {
  name: "qwen3.6-plus-free",
  description: "Qwen 3.6 Plus - Alibaba Qwen model",
  provider: "qwen",
  subscription: "zen",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: true,
    vision: true,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0,
    output: 0,
    currency: "USD",
  },
  notes:
    "Free during beta. Vision and structured output capabilities not yet verified",
};

export const NEMOTRON_3_SUPER_FREE: OpencodeModelMeta = {
  name: "nemotron-3-super-free",
  description: "NVIDIA Nemotron 3 Super",
  provider: "nvidia",
  subscription: "zen",
  endpoint: "/chat/completions",
  supports: {
    chat: true,
    streaming: true,
    tools: true,
    structuredOutput: false,
    vision: false,
  },
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricing: {
    input: 0,
    output: 0,
    currency: "USD",
  },
  notes: "Free model. Likely text-only. Structured output not verified",
};

// ==========================================
// ALL MODELS ARRAY
// ==========================================

export const ALL_MODELS = [
  // Moonshot
  KIMI_K2_5,
  // Anthropic
  CLAUDE_OPUS_4_6,
  CLAUDE_OPUS_4_5,
  CLAUDE_OPUS_4_1,
  CLAUDE_SONNET_4_6,
  CLAUDE_SONNET_4_5,
  CLAUDE_SONNET_4,
  CLAUDE_HAIKU_4_5,
  CLAUDE_HAIKU_3_5,
  // OpenAI
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
  // Google
  GEMINI_3_1_PRO,
  GEMINI_3_FLASH,
  // Zhipu
  GLM_5_1,
  GLM_5,
  // MiniMax
  MINIMAX_M2_5,
  MINIMAX_M2_5_FREE,
  MINIMAX_M2_7,
  // MiMo
  MIMO_V2_OMNI,
  MIMO_V2_PRO,
  // Others
  BIG_PICKLE,
  QWEN_3_6_PLUS_FREE,
  NEMOTRON_3_SUPER_FREE,
] as const;
