# Sitewide Design QA

## Product direction

- Positioning: Apache 2.0, Rust-based, self-hosted S3-compatible object storage in public beta.
- Primary audiences: platform and storage operators, AI/data platform teams, and technical decision-makers evaluating license, maturity, migration, and operating risk.
- Primary journey: understand fit → evaluate locally → verify compatibility → model topology → review production readiness.
- Trust boundary: distributed mode, lifecycle management, and KMS are identified as under validation; S3 Tables, RDMA, DPU, and MCP are presented as preview or roadmap directions.

## Visual evidence

- Evidence folder: `/Users/overtrue/.codex/visualizations/2026/07/21/019f82bf-324e-71c2-9188-5cd8ab3f336f/sitewide-audit`
- Desktop before: `01` through `12`, captured at 1280 × 720.
- Responsive before: `13` through `18`, captured at 800 × 900.
- Desktop final: `51` through `62`, captured at 1280 × 720 after the final implementation pass.
- Responsive final: `81`, `83` through `88`, and `92`, captured at 800 × 900; `93` captures the scrollable menu at 800 × 500.
- Routes covered: Home, five Product routes, Download including rc and topology, Pricing, Blog index/detail, EC calculator, About, and Contact.

## Verified behavior

- Product menu closes on outside click and Escape.
- Product and Resources menus use a wider two-column desktop layout.
- The full desktop navigation switches to the mobile menu below the `lg` breakpoint, including at 800 px.
- The 800 × 500 mobile menu is height-limited and vertically scrollable.
- Download selects the latest recommended beta (`v1.0.0-beta.10`) instead of an older preview release.
- Home feature, server-install, and topology tabs use a roving tab stop and respond to Arrow, Home, and End keys.
- Protocol visual order matches page content: S3, WebDAV, Swift, FTP(s), MCP.
- The shared logo respects component sizing; live review measured no horizontal overflow at 1280, 1024, or 800 px.
- Fixed contact control is hidden below 2xl and no longer overlays primary content.
- Contact CAPTCHA is deferred until its viewport step is reached, preventing initial auto-scroll and reducing first-view noise.
- Skip-link target focus, live form status, alert semantics, reduced-motion behavior, and form context are implemented.
- Browser log review found no runtime errors or warnings beyond development/HMR information.

## Visual-system decisions

- Preserved Geist, RustFS blue, square corners, thin rules, dark/light tokens, the globe, product diagrams, Download tabs, and the EC calculator.
- Reduced nested-card weight by using three surface types: framed controls/data, ruled lists/timelines, and open editorial content.
- Replaced the solid-blue Pricing card with an open three-column comparison rail.
- Used blue for state, evidence, and primary action rather than as a large decorative fill.
- Kept motion state-based and reduced ambient background flicker, including reduced-motion fallbacks.

## Validation

- `npx tsc --noEmit`: passed.
- `pnpm run lint`: passed with no warnings.
- `pnpm run build`: passed with all 30 static routes generated.
- `out/`: generated.
- `out/sitemap.xml`: generated and validated with 30 URLs.
- Build emitted existing informational warnings for the SVGO `removeViewBox` option and Turbopack NFT tracing in `next.config.ts`; neither blocked compilation, type checking, static generation, or sitemap validation.
