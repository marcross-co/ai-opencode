/**
 * Shared types for @marcross/ai-opencode
 * TanStack AI Community Adapter for OpenCode
 */

/**
 * AI model providers available through OpenCode
 */
export type OpencodeProvider =
  | 'anthropic'
  | 'google'
  | 'openai'
  | 'moonshot'
  | 'minimax'
  | 'zhipu'
  | 'mimo'
  | 'qwen'
  | 'nvidia'
  | 'opencode'

/**
 * Subscription tiers for OpenCode access
 */
export type OpencodeSubscription = 'zen' | 'go' | 'both'

/**
 * API endpoint types used by different models
 * Note: OpenCode uses OpenAI-compatible endpoints
 */
export type OpencodeEndpoint = '/chat/completions' | '/messages' | '/responses' | '/models/gemini-3.1-pro' | '/models/gemini-3-flash'

/**
 * Input/output modalities supported by models
 */
export type Modality = 'text' | 'image' | 'audio' | 'video'

/**
 * Pricing information for a model (per 1M tokens in USD)
 */
export interface OpencodePricing {
  /** Input token cost per 1M tokens */
  input: number
  /** Output token cost per 1M tokens */
  output: number
  /** Cached input token cost per 1M tokens (if applicable) */
  cachedInput?: number
  /** Cached write token cost per 1M tokens (if applicable) */
  cachedWrite?: number
  /** Currency (always USD for OpenCode) */
  currency: 'USD'
}

/**
 * Capabilities supported by a model
 */
export interface OpencodeModelCapabilities {
  /** Basic chat completion support */
  chat: boolean
  /** Streaming response support */
  streaming: boolean
  /** Tool/function calling support */
  tools: boolean
  /** Structured output / JSON mode support */
  structuredOutput: boolean
  /** Vision / image input support */
  vision: boolean
}

/**
 * Comprehensive metadata for an OpenCode model
 */
export interface OpencodeModelMeta {
  /** Model identifier (e.g., 'kimi-k2.5') */
  name: string
  /** Human-readable description */
  description: string
  /** Original provider of the model */
  provider: OpencodeProvider
  /** Subscription tier(s) where model is available */
  subscription: OpencodeSubscription
  /** API endpoint used by this model */
  endpoint: OpencodeEndpoint
  /** Supported capabilities */
  supports: OpencodeModelCapabilities
  /** Context window size in tokens */
  contextWindow: number
  /** Maximum output tokens */
  maxOutputTokens: number
  /** Pricing information */
  pricing: OpencodePricing
  /** Additional notes or warnings */
  notes?: string
}

/**
 * Configuration options shared by all models
 */
export interface OpencodeConfigBase {
  /** OpenCode API key (falls back to OPENCODE_API_KEY env var) */
  apiKey?: string
  /** OpenCode subscription tier: 'zen' (pay-as-you-go, default) or 'go' ($10/month) */
  subscription?: 'zen' | 'go'
  /** Request timeout in milliseconds */
  timeout?: number
  /** Maximum number of retries for failed requests */
  maxRetries?: number
}
