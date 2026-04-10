# @marcross/ai-opencode

## 0.1.1

### Patch Changes

- b3d3b43: refactor!: rename variant to subscription

  BREAKING CHANGE: The config option `variant` has been renamed to `subscription` to better reflect the semantic meaning of OpenCode's pricing tiers.
  - `variant?: 'zen' | 'go'` → `subscription?: 'zen' | 'go'`
  - Updated all documentation and examples
  - Aligns with existing `OpencodeSubscription` type used in model metadata
