# Design QA

- Source visual truth: `/var/folders/_g/pcyqq2g56_58wdbb339vl11h0000gn/T/codex-clipboard-4a8ea97c-11f2-4c04-a602-42e50159ddb0.png`
- Implementation screenshot: unavailable; the in-app browser blocked the automated localhost refresh
- Viewport: source crop only; implementation viewport unavailable
- Dimensions: source 400 × 120 px; implementation capture unavailable; density normalization not applicable
- State: desktop homepage announcement banner

## Full-view comparison evidence

The source crop shows the `NEW` badge occupying most of the announcement banner height. The implementation now constrains the badge to `h-5` (20 CSS px), removes vertical padding, uses a 9 px label, and applies `leading-none`. The surrounding banner layout, message, and link remain unchanged.

## Focused-region comparison evidence

The badge is the only requested region. A rendered after-state could not be captured because the browser security policy rejected the localhost refresh, so direct visual comparison remains blocked.

## Findings

- No unresolved source-level P0/P1/P2 issue is apparent in the requested badge-height change.
- Automated visual verification is blocked until the local preview can be refreshed manually.

## Comparison history

- Initial finding: the bordered `NEW` label is visually too tall relative to the announcement text.
- Fix applied: set a fixed 20 px height, vertically center the label, remove vertical padding, and tighten font size and line height.
- Post-fix visual evidence: unavailable due to the blocked localhost browser refresh.

final result: blocked
