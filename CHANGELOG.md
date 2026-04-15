# @marcross/ai-opencode

## 0.1.3

### Minor Changes

- Added Alibaba Qwen model support
  - `qwen3.5-plus`: Advanced reasoning model with 262K context ($0.20/$1.20 per 1M tokens)
  - `qwen3.6-plus`: Enhanced reasoning model with 262K context ($0.50/$3.00 per 1M tokens)
  - Both models support: chat, streaming, tools, structured output, and vision
  - Added `"alibaba"` provider type to `OpencodeProvider`

## 0.1.2

### Patch Changes

- 85642c2: Removed Quen 3.6 Plus Free model

  Added typechecking for `opencodeText`

  ```typescript
  opencodeText("big-pickle", { subscription: "zen" }); // works correctly
  opencodeText("fake-model", { subscription: "zen" }); // throws error
  ```

## 0.1.1

### Patch Changes

- b3d3b43: refactor!: rename variant to subscription

  BREAKING CHANGE: The config option `variant` has been renamed to `subscription` to better reflect the semantic meaning of OpenCode's pricing tiers.
  - `variant?: 'zen' | 'go'` → `subscription?: 'zen' | 'go'`
  - Updated all documentation and examples
  - Aligns with existing `OpencodeSubscription` type used in model metadata
