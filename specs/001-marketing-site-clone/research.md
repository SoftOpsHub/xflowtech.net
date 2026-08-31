# Phase 0 Research: xFlow Tech Marketing Site Clone

The spec carried no `[NEEDS CLARIFICATION]` markers. This document records the technical
decisions that shape Phase 1 design.

## 1. Source site technology

**Decision**: Treat `xflowresearch.com` as a black box — reproduce the rendered result, not the
implementation.

**Findings**: The live site is WordPress (asset paths under `/wp-content/uploads/`, dated folders
such as `/2025/05/`, `/2023/12/`). Page building is a WordPress theme/page-builder. Media is a
mix of `.png` (e.g. `ai-icon-150x150.png`), `.webp` (e.g. `ETSI-Logo-300x132.webp`), and likely
`.jpg`/`.svg`.

**Rationale**: We only owe visual + content parity (FR-002, FR-003). Re-implementing on the repo
stack is cleaner and removes WordPress/plugin runtime baggage, which also satisfies the
"no third-party requests / no analytics / no chat widget" assumptions.

**Alternatives considered**: (a) Full HTML/CSS scrape served as-is — rejected: violates
Constitution II (component architecture) and III (type safety), drags in WP inline scripts and
external requests. (b) Headless-WP + Next — rejected: introduces a backend (Constitution I).

## 2. Content capture method

**Decision**: One-time manual transcription of prose + a small dev-only script for bulk asset
download, both producing an auditable snapshot.

- Prose (hero copy, About narrative, section headings) is transcribed by a human/agent into the
  section components during implementation, cross-checked against the live pages.
- Structured lists (services, open-source projects, research bodies, products, partner logos,
  offices) are entered as typed arrays in `src/lib/content/`.
- Binary assets are downloaded by `scripts/capture-assets.mjs` from an explicit URL list into
  `public/assets/**`, and the script emits/updates a manifest (source URL, local path, bytes,
  sha256, capture date).
- The capture date and the list of source URLs are committed (FR-012).

**Rationale**: Prose needs human judgement for structure and alt text; assets are mechanical and
benefit from a repeatable script. Keeps the snapshot reproducible and reviewable.

**Alternatives considered**: `wget --mirror` of the whole site — rejected: pulls unwanted HTML/CSS/JS
and makes the inventory noisy; hard to map to components.

## 3. Fonts

**Decision**: Self-host at build time. Identify the live site's font families by inspecting its
CSS during implementation; then either (a) load matching families via `next/font/google` (Next
downloads and self-hosts them at build — no runtime request to Google), or (b) if a family is
proprietary/non-redistributable, substitute the closest openly-licensed family via
`next/font/local` and record the substitution in the asset inventory (spec Assumption on fonts).

**Rationale**: `next/font` eliminates layout shift and satisfies FR-006 (no runtime font-host
requests). The repo already uses `next/font/google` (IBM Plex) in `app/layout.tsx` as the pattern.

**Alternatives considered**: `<link>` to Google Fonts — rejected: runtime third-party request
(FR-006). Shipping raw `.woff2` from the WP server without licence check — rejected: licensing risk.

## 4. Visual fidelity approach

**Decision**: Rebuild layout with Tailwind utilities to match the live site at two reference
widths (desktop ~1440px, mobile ~375px), verified by side-by-side human review (SC-002). Capture
the brand palette (header, headings, links, buttons, section backgrounds) as CSS custom
properties in `app/globals.css`, extending the existing shadcn token set.

**Rationale**: The spec defines "exact" as a close visual tolerance judged by a reviewer, not a
pixel-diff gate (checklist note). Tailwind + tokens keeps it maintainable and theme-consistent.

**Alternatives considered**: Absolute-position pixel-matching / copying computed styles verbatim
— rejected: brittle, unreadable, fails Constitution II & V.

## 5. Interactivity & motion

**Decision**: The only client state is the mobile-nav open/close, already modelled in
`src/store/ui-store.ts` (`mobileNavOpen`). Hover/scroll affordances use CSS. Any entrance
animation is CSS-only and gated behind `prefers-reduced-motion` (spec edge case).

**Rationale**: Minimises `'use client'` surface (Constitution II) and keeps the static export
trivial.

## 6. Routing & 404

**Decision**: App Router file routes — `app/page.tsx`, `app/about-us/page.tsx`,
`app/contact/page.tsx`. `output: 'export'` emits `index.html`, `about-us/index.html`,
`contact/index.html`, `404.html`. Restyle the existing `app/not-found.tsx` to site branding
(FR-009). Add `trailingSlash` consideration: the live site uses `/about-us` and `/contact`
without trailing slash in nav; keep Next's default and confirm the static host serves
`about-us/index.html` for `/about-us`.

**Rationale**: Matches live paths (FR-001) with zero routing code.

## 7. Metadata, favicon, social preview

**Decision**: Per-route `export const metadata` sourced from `src/lib/content/metadata.ts`
(title, description). `app/favicon.ico` (or `app/icon.png`) captured from the live site.
One OG image in `public/og/` referenced via `openGraph.images`. Mirror the live `<title>` and
meta description text (FR-013).

## 8. Testing strategy

**Decision**:

- **Vitest + RTL** — each section component renders its expected headings and its content-data
  items (e.g. `ServicesGrid` renders one card per `services.ts` entry with correct name + icon
  `alt`). `SiteHeader` renders the three nav links; mobile toggle flips `ui-store`.
- **Playwright** —
  - `navigation.spec.ts`: from each page, nav links reach `/`, `/about-us`, `/contact`.
  - `no-external-requests.spec.ts`: `page.route('**/*', …)` — assert no request URL host is
    `xflowresearch.com` or a known third-party font/CDN host while loading each page (SC-003).
  - `contact.spec.ts`: three offices render; `mailto:info@xflowresearch.com` link present.
  - `not-found.spec.ts`: unknown path renders branded 404 with a home link.
  - `accessibility.spec.ts`: `@axe-core/playwright` on all three pages → zero serious/critical
    (SC-006). (Add `@axe-core/playwright` as a dev dependency — it was removed during scaffold;
    re-adding is justified by FR-014/SC-006.)
- **Broken-image check** — Playwright asserts every `<img>` has `naturalWidth > 0` after load
  (SC-004).

**Rationale**: Directly maps each success criterion to an automated check.

**Dependency note**: `@axe-core/playwright` re-added to `devDependencies` (removed in the initial
scaffold). One-line PR justification: required by FR-014 / SC-006 accessibility gate.

## 9. Asset optimisation under static export

**Decision**: `next.config.ts` already sets `images: { unoptimized: true }` (required for
`output: 'export'`). Use plain `<img>` or `next/image` with `unoptimized`; pre-size/compress
captured images in `scripts/capture-assets.mjs` (or a follow-up manual pass) so unoptimised
delivery still meets SC-005. Prefer `.webp` where the source already provides it; keep `.svg`
for vector logos.

## 10. Open items deferred to implementation (not blockers)

- Exact section inventory per page (finalised while capturing — `contracts/routes.md` lists the
  expected set from the spec).
- Exact brand hex values and font families (read from live CSS during implementation).
- Whether the live site has any standalone service/product pages — spec Assumption says
  out-of-scope; log as follow-up if found.
