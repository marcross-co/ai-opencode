---
"@marcross/ai-opencode": patch
---

refactor!: rename variant to subscription

BREAKING CHANGE: The config option `variant` has been renamed to `subscription` to better reflect the semantic meaning of OpenCode's pricing tiers.

- `variant?: 'zen' | 'go'` → `subscription?: 'zen' | 'go'`
- Updated all documentation and examples
- Aligns with existing `OpencodeSubscription` type used in model metadata
