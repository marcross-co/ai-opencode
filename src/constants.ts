/**
 * Capability arrays and constants for OpenCode models
 * TanStack AI Community Adapter for OpenCode
 */

import {
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
} from './model-meta.js'

// ==========================================
// BASE URLS
// ==========================================

export const OPENCODE_BASE_URL_ZEN = 'https://opencode.ai/zen/v1'
export const OPENCODE_BASE_URL_GO = 'https://opencode.ai/zen/go/v1'

// ==========================================
// SUBSCRIPTION TIER ARRAYS
// ==========================================

/** Models available through OpenCode Zen (pay-as-you-go) */
export const OPENCODE_ZEN_MODELS = [
  KIMI_K2_5.name,
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
  GLM_5_1.name,
  GLM_5.name,
  MINIMAX_M2_5.name,
  MINIMAX_M2_5_FREE.name,
  BIG_PICKLE.name,
  QWEN_3_6_PLUS_FREE.name,
  NEMOTRON_3_SUPER_FREE.name,
] as const

/** Models available through OpenCode Go ($10/month subscription) */
export const OPENCODE_GO_MODELS = [
  KIMI_K2_5.name,
  GLM_5_1.name,
  GLM_5.name,
  MINIMAX_M2_5.name,
  MINIMAX_M2_7.name,
  MIMO_V2_OMNI.name,
  MIMO_V2_PRO.name,
] as const

// ==========================================
// CAPABILITY ARRAYS (TanStack AI Guidelines)
// ==========================================

/** All models that support chat completion */
export const OPENCODE_CHAT_MODELS = [
  KIMI_K2_5.name,
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
  GLM_5_1.name,
  GLM_5.name,
  MINIMAX_M2_5.name,
  MINIMAX_M2_5_FREE.name,
  MINIMAX_M2_7.name,
  MIMO_V2_OMNI.name,
  MIMO_V2_PRO.name,
  BIG_PICKLE.name,
  QWEN_3_6_PLUS_FREE.name,
  NEMOTRON_3_SUPER_FREE.name,
] as const

/** All models that support tool/function calling */
export const OPENCODE_TOOLS_MODELS = [
  KIMI_K2_5.name,
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
  GLM_5_1.name,
  GLM_5.name,
  MINIMAX_M2_5.name,
  MINIMAX_M2_5_FREE.name,
  MINIMAX_M2_7.name,
  MIMO_V2_OMNI.name,
  MIMO_V2_PRO.name,
  BIG_PICKLE.name,
  QWEN_3_6_PLUS_FREE.name,
  NEMOTRON_3_SUPER_FREE.name,
] as const

/** All models that support streaming responses */
export const OPENCODE_STREAMING_MODELS = [
  KIMI_K2_5.name,
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
  GLM_5_1.name,
  GLM_5.name,
  MINIMAX_M2_5.name,
  MINIMAX_M2_5_FREE.name,
  MINIMAX_M2_7.name,
  MIMO_V2_OMNI.name,
  MIMO_V2_PRO.name,
  BIG_PICKLE.name,
  QWEN_3_6_PLUS_FREE.name,
  NEMOTRON_3_SUPER_FREE.name,
] as const

/** Models with verified structured output / JSON mode support */
export const OPENCODE_STRUCTURED_OUTPUT_MODELS = [
  KIMI_K2_5.name,
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
  GLM_5_1.name,
  GLM_5.name,
  MIMO_V2_OMNI.name,
  MIMO_V2_PRO.name,
  QWEN_3_6_PLUS_FREE.name,
] as const

/** Models with verified vision / image input support */
export const OPENCODE_VISION_MODELS = [
  KIMI_K2_5.name,
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
  MIMO_V2_OMNI.name,
  QWEN_3_6_PLUS_FREE.name,
] as const

// ==========================================
// PROVIDER-SPECIFIC ARRAYS
// ==========================================

/** Anthropic Claude models */
export const OPENCODE_ANTHROPIC_MODELS = [
  CLAUDE_OPUS_4_6.name,
  CLAUDE_OPUS_4_5.name,
  CLAUDE_OPUS_4_1.name,
  CLAUDE_SONNET_4_6.name,
  CLAUDE_SONNET_4_5.name,
  CLAUDE_SONNET_4.name,
  CLAUDE_HAIKU_4_5.name,
  CLAUDE_HAIKU_3_5.name,
] as const

/** OpenAI GPT models */
export const OPENCODE_OPENAI_MODELS = [
  GPT_5_4.name,
  GPT_5_4_PRO.name,
  GPT_5_4_MINI.name,
  GPT_5_4_NANO.name,
  GPT_5_3_CODEX.name,
  GPT_5_3_CODEX_SPARK.name,
  GPT_5_2.name,
  GPT_5_2_CODEX.name,
  GPT_5_1.name,
  GPT_5_1_CODEX.name,
  GPT_5_1_CODEX_MAX.name,
  GPT_5_1_CODEX_MINI.name,
  GPT_5.name,
  GPT_5_CODEX.name,
  GPT_5_NANO.name,
] as const

/** Google Gemini models */
export const OPENCODE_GOOGLE_MODELS = [
  GEMINI_3_1_PRO.name,
  GEMINI_3_FLASH.name,
] as const

/** Moonshot AI models */
export const OPENCODE_MOONSHOT_MODELS = [
  KIMI_K2_5.name,
] as const

/** Zhipu AI GLM models */
export const OPENCODE_ZHIPU_MODELS = [
  GLM_5_1.name,
  GLM_5.name,
] as const

/** MiniMax models */
export const OPENCODE_MINIMAX_MODELS = [
  MINIMAX_M2_5.name,
  MINIMAX_M2_5_FREE.name,
  MINIMAX_M2_7.name,
] as const

// ==========================================
// TYPE EXPORTS
// ==========================================

/** Type for Zen-only models */
export type OpencodeZenModel = (typeof OPENCODE_ZEN_MODELS)[number]

/** Type for Go-only models */
export type OpencodeGoModel = (typeof OPENCODE_GO_MODELS)[number]

/** Type for all OpenCode models */
export type OpencodeModel = OpencodeZenModel | OpencodeGoModel
