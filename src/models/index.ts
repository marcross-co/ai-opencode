/**
 * Model exports for @marcross/ai-opencode/models
 *
 * Import model metadata and capability arrays:
 * ```ts
 * import { KIMI_K2_5, OPENCODE_CHAT_MODELS } from '@marcross/ai-opencode/models'
 * ```
 */

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
  NEMOTRON_3_SUPER_FREE,
} from "../model-meta.js";

// Capability arrays
export {
  ALL_MODELS,
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
} from "../constants.js";

// Type exports
export type { OpencodeModelMeta } from "../types.js";
export type {
  OpencodeModel,
  OpencodeZenModel,
  OpencodeGoModel,
} from "../constants.js";
