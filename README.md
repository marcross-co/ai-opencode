# @marcross/ai-opencode

[![TanStack AI Community Adapter](https://img.shields.io/badge/TanStack%20AI-Community%20Adapter-blue)](https://tanstack.com/ai)

A community-maintained TanStack AI adapter for [OpenCode](https://opencode.ai/) API. Provides seamless integration with OpenCode's OpenAI-compatible Chat Completions API, supporting 30+ models across multiple providers.

> **Note**: This is a community adapter maintained by the [Marcross](https://github.com/marcross-co) organization, not an official TanStack package. For community adapter guidelines, see the [TanStack AI Community Adapters Guide](https://github.com/TanStack/ai/blob/main/docs/community-adapters/guide.md).

> 🤖 **AI-Generated**: This project was developed entirely using AI assistance, specifically [OpenCode](https://opencode.ai/) with the [Kimi K2.5](https://www.moonshot.cn/) model. It demonstrates the power of AI-assisted development for building production-ready TypeScript packages.

## Features

- 🤖 **30+ Models**: Full support for OpenCode Zen and Go models including Claude, GPT, Gemini, Kimi, GLM, MiniMax, and more
- 🛠️ **Tool Calling**: Full support for function/tool calling with streaming
- 📡 **Streaming**: Real-time streaming responses
- 📋 **Structured Output**: JSON mode and JSON Schema support for structured responses
- 🎯 **Type Safety**: Full TypeScript support with per-model types and capabilities
- 📊 **Model Metadata**: Comprehensive model metadata including pricing, context windows, and capabilities
- 🔍 **Conservative Verification**: Only verified capabilities marked as supported

## Installation

```bash
npm install @marcross/ai-opencode @tanstack/ai
```

## Quick Start

```typescript
import { opencodeText } from "@marcross/ai-opencode";
import { chat } from "@tanstack/ai";

// Create adapter
const adapter = opencodeText("kimi-k2.5");

// Use with chat
const stream = chat({
  adapter,
  messages: [{ role: "user", content: "Hello!" }],
});

// Handle streaming response
for await (const chunk of stream) {
  switch (chunk.type) {
    case "content":
      process.stdout.write(chunk.delta || "");
      break;
    case "tool_call":
      console.log(`Tool called: ${chunk.toolCall.function.name}`);
      break;
    case "done":
      console.log("\nDone:", chunk.finishReason);
      break;
    case "error":
      console.error("Error:", chunk.error.message);
      break;
  }
}
```

## Configuration

### Environment Variable

Set your OpenCode API key:

```bash
export OPENCODE_API_KEY=your-api-key
```

Get your API key at [https://opencode.ai/auth](https://opencode.ai/auth)

### Explicit API Key

```typescript
import { createOpencodeChat } from "@marcross/ai-opencode";

const adapter = createOpencodeChat("kimi-k2.5", "your-api-key");
```

### Advanced Configuration

```typescript
import { opencodeText } from "@marcross/ai-opencode";

const adapter = opencodeText("claude-opus-4-6", {
  apiKey: "your-api-key", // Optional: falls back to OPENCODE_API_KEY env var
  subscription: "zen", // 'zen' (pay-as-you-go, default) or 'go' ($10/month)
  temperature: 0.7, // Sampling temperature (0-2)
  topP: 0.9, // Nucleus sampling (0-1)
  maxTokens: 4096, // Maximum tokens to generate
  timeout: 30000, // Request timeout in milliseconds
  maxRetries: 3, // Maximum retry attempts
});
```

## Subscription Tiers

### OpenCode Zen (Pay-as-you-go)

Access to 30+ models with per-token pricing:

- All Anthropic Claude models (Opus, Sonnet, Haiku)
- All OpenAI GPT models (GPT-5.4, GPT-5.3 Codex, etc.)
- All Google Gemini models
- Kimi K2.5, GLM-5/5.1, MiniMax, MiMo, and more

### OpenCode Go ($10/month subscription)

Budget-friendly access to 7 open-weight models:

- Kimi K2.5
- GLM-5, GLM-5.1
- MiniMax M2.5, M2.7
- MiMo V2 Omni, V2 Pro

```typescript
// Use Go subscription
const adapter = opencodeText("kimi-k2.5", { subscription: "go" });
```

## Tool Calling

```typescript
import { opencodeText } from "@marcross/ai-opencode";
import { chat } from "@tanstack/ai";
import { z } from "zod";

const weatherTool = {
  name: "getWeather",
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City name"),
  }),
  execute: async ({ location }) => {
    // Your implementation
    return { temperature: 22, unit: "celsius" };
  },
};

const adapter = opencodeText("kimi-k2.5");

const stream = chat({
  adapter,
  messages: [{ role: "user", content: "What's the weather in Paris?" }],
  tools: [weatherTool],
});

for await (const chunk of stream) {
  switch (chunk.type) {
    case "content":
      process.stdout.write(chunk.delta || "");
      break;
    case "tool_call":
      console.log(`\nTool: ${chunk.toolCall.function.name}`);
      break;
    case "tool_result":
      console.log(`Result: ${chunk.content}`);
      break;
  }
}
```

## Structured Output

Generate typed responses using Zod schemas:

```typescript
import { opencodeText } from "@marcross/ai-opencode";
import { chat } from "@tanstack/ai";
import { z } from "zod";

const adapter = opencodeText("kimi-k2.5");

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  hobbies: z.array(z.string()),
});

const result = await chat({
  adapter,
  messages: [
    {
      role: "user",
      content: "Generate a user profile for John who likes hiking and reading",
    },
  ],
  outputSchema: userSchema,
});

// result is typed: { name: string, age: number, hobbies: string[] }
console.log(result.name); // "John"
console.log(result.hobbies); // ["hiking", "reading"]
```

## Supported Models

### Anthropic (Claude 3 Family)

| Model               | Context | Vision | Tools | Structured | Pricing (per 1M) |
| ------------------- | ------- | ------ | ----- | ---------- | ---------------- |
| `claude-opus-4-6`   | 200K    | ✅     | ✅    | ✅         | $5.00 / $25.00   |
| `claude-opus-4-5`   | 200K    | ✅     | ✅    | ✅         | $5.00 / $25.00   |
| `claude-sonnet-4-6` | 200K    | ✅     | ✅    | ✅         | $3.00 / $15.00   |
| `claude-sonnet-4-5` | 200K    | ✅     | ✅    | ✅         | $3.00 / $15.00   |
| `claude-haiku-4-5`  | 200K    | ✅     | ✅    | ✅         | $1.00 / $5.00    |
| `claude-3-5-haiku`  | 200K    | ✅     | ✅    | ✅         | $0.80 / $4.00    |

### OpenAI (GPT Family)

| Model           | Context | Vision | Tools | Structured | Pricing (per 1M) |
| --------------- | ------- | ------ | ----- | ---------- | ---------------- |
| `gpt-5.4`       | 128K    | ✅     | ✅    | ✅         | $2.50 / $15.00   |
| `gpt-5.4-pro`   | 128K    | ✅     | ✅    | ✅         | $30.00 / $180.00 |
| `gpt-5.4-mini`  | 128K    | ✅     | ✅    | ✅         | $0.75 / $4.50    |
| `gpt-5.4-nano`  | 128K    | ✅     | ✅    | ✅         | $0.20 / $1.25    |
| `gpt-5.3-codex` | 128K    | ✅     | ✅    | ✅         | $1.75 / $14.00   |
| `gpt-5-nano`    | 128K    | ✅     | ✅    | ✅         | Free             |

### Google (Gemini)

| Model            | Context | Vision | Tools | Structured | Pricing (per 1M) |
| ---------------- | ------- | ------ | ----- | ---------- | ---------------- |
| `gemini-3.1-pro` | 200K    | ✅     | ✅    | ✅         | $2.00 / $12.00   |
| `gemini-3-flash` | 128K    | ✅     | ✅    | ✅         | $0.50 / $3.00    |

### Other Models

| Model          | Provider    | Context | Vision | Tools | Structured |
| -------------- | ----------- | ------- | ------ | ----- | ---------- |
| `kimi-k2.5`    | Moonshot AI | 200K    | ✅     | ✅    | ✅         |
| `glm-5.1`      | Zhipu AI    | 200K    | ❌     | ✅    | ✅         |
| `glm-5`        | Zhipu AI    | 200K    | ❌     | ✅    | ✅         |
| `minimax-m2.5` | MiniMax     | 128K    | ❓     | ✅    | ❓         |
| `mimo-v2-omni` | MiMo        | 128K    | ✅     | ✅    | ✅         |

> **Note**: ❓ indicates capabilities not yet verified (conservative approach). These models may support the feature but haven't been verified.

## Model Metadata

Access comprehensive metadata for each model:

```typescript
import { KIMI_K2_5, CLAUDE_OPUS_4_6, GPT_5_4 } from "@marcross/ai-opencode";

console.log(KIMI_K2_5);
// {
//   name: 'kimi-k2.5',
//   provider: 'moonshot',
//   contextWindow: 200000,
//   supports: { chat: true, streaming: true, tools: true, structuredOutput: true, vision: true },
//   pricing: { input: 0.60, output: 3.00, cachedInput: 0.10, currency: 'USD' }
// }
```

## Capability Arrays

Filter models by capability:

```typescript
import {
  OPENCODE_ZEN_MODELS,
  OPENCODE_GO_MODELS,
  OPENCODE_VISION_MODELS,
  OPENCODE_STRUCTURED_OUTPUT_MODELS,
} from "@marcross/ai-opencode";

// All Zen models
console.log(OPENCODE_ZEN_MODELS); // ['kimi-k2.5', 'claude-opus-4-6', ...]

// All Go models
console.log(OPENCODE_GO_MODELS); // ['kimi-k2.5', 'glm-5', ...]

// Models with vision support
console.log(OPENCODE_VISION_MODELS); // ['kimi-k2.5', 'claude-opus-4-6', ...]

// Models with verified structured output
console.log(OPENCODE_STRUCTURED_OUTPUT_MODELS);
```

## Provider-Specific Arrays

```typescript
import {
  OPENCODE_ANTHROPIC_MODELS,
  OPENCODE_OPENAI_MODELS,
  OPENCODE_GOOGLE_MODELS,
  OPENCODE_MOONSHOT_MODELS,
} from "@marcross/ai-opencode";

// Get all Claude models
const claudeModels = OPENCODE_ANTHROPIC_MODELS;
```

## API Reference

### `opencodeText(model, config?)`

Creates a text adapter for OpenCode API.

**Parameters:**

- `model`: `OpencodeModel` - One of the supported model identifiers
- `config?`: Configuration object
  - `apiKey?: string` - API key (falls back to OPENCODE_API_KEY env var)
  - `subscription?: 'zen' | 'go'` - Subscription tier (default: 'zen')
  - `temperature?: number` - Sampling temperature (0-2)
  - `topP?: number` - Nucleus sampling (0-1)
  - `maxTokens?: number` - Maximum tokens to generate
  - `timeout?: number` - Request timeout in ms
  - `maxRetries?: number` - Maximum retry attempts
  - `tools?: Tool[]` - Available tools
  - `toolChoice?: 'auto' | 'none' | {...}` - Tool selection mode

**Returns:** `OpencodeTextAdapter` - Configured text adapter

### `createOpencodeChat(model, apiKey, config?)`

Factory function with explicit API key.

### `adapter.structuredOutput(options)`

Generate structured JSON output (for models that support it).

```typescript
const result = await adapter.structuredOutput({
  messages: [{ role: "user", content: "Generate a user profile" }],
  schema: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
    },
  },
});
// Returns: { data: { name: '...', age: ... }, rawText: '...' }
```

## Debug Mode

Enable debug logging to see request/response details:

```bash
DEBUG_OPENCODE=true node your-script.js
```

## Technical Details

### Model Capabilities

Capabilities are marked conservatively based on verification:

- ✅ **Verified**: Tested and confirmed working
- ❌ **Not Supported**: Confirmed not available
- ❓ **Unknown**: Not yet verified (may work but untested)

### Moonshot AI (kimi-k2.5) Special Handling

The kimi-k2.5 model requires a `reasoning_content` field on assistant messages with tool calls. This adapter automatically injects a placeholder space character when needed.

### API Endpoints

- **Zen**: `https://opencode.ai/zen/v1`
- **Go**: `https://opencode.ai/zen/go/v1`
- **Protocol**: OpenAI-compatible Chat Completions API
- **Streaming**: Supported via Server-Sent Events

## Disclaimer

This project is an independent community effort and is **not endorsed, sponsored, or affiliated** with any of the companies, organizations, or entities mentioned in this repository, including but not limited to:

- **OpenCode** (the API provider)
- **TanStack** (the AI SDK framework)
- **Moonshot AI** (Kimi models)
- **Anthropic** (Claude models)
- **OpenAI** (GPT models)
- **Google** (Gemini models)
- **Zhipu AI** (GLM models)
- **MiniMax** (MiniMax models)
- **Xiaomi** (MiMo models)
- **Alibaba** (Qwen models)
- **NVIDIA** (Nemotron models)

All trademarks, brand names, product names, and logos referenced herein are the property of their respective owners. The use of these names and references is for identification purposes only and does not imply endorsement.

All copyrights and intellectual property rights for the respective models, APIs, and services remain with their original owners. This adapter simply provides a bridge to access these services through the TanStack AI SDK.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to [marcross/ai-opencode](https://github.com/marcross-co/ai-opencode).

## Support

- [OpenCode Documentation](https://opencode.ai/docs)
- [TanStack AI Documentation](https://tanstack.com/ai)
- [GitHub Issues](https://github.com/marcross/ai-opencode/issues)
