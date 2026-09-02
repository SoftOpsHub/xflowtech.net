---
description: 'Task list for xFlow Marketing Site Clone'
---

# Tasks: xFlow Marketing Site Clone

**Input**: Design documents from `specs/001-marketing-site-clone/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included. The constitution (Principle IV) requires every shipped behavior to have a
test, and the spec's success criteria (SC-002…SC-007) are defined as automated checks.

**Organization**: Grouped by user story. Foundational phase covers the shared asset pipeline,
content types, and site chrome that every story needs.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1 Home · US2 About Us · US3 Contact · US4 Self-hosted media
- All paths are repo-relative from `/home/zohaib-hassan/Development/XFLOW/xflowtech.net`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: tooling and skeletons needed before anything else

- [x] T001 Add `@axe-core/playwright` to `devDependencies` in `package.json`, run `pnpm install`, then `pnpm exec playwright install`
- [x] T002 [P] Create `src/lib/content/types.ts` with all interfaces from `specs/001-marketing-site-clone/contracts/content-schema.md` (`AssetKey`, `NavItem`, `SiteMeta`, `Service`, `OpenSourceContribution`, `ResearchPartner`, `Product`, `PartnerReference`, `OfficeLocation`, `PageMeta`)
- [x] T003 [P] Create `scripts/asset-sources.json` seeded from the table in `specs/001-marketing-site-clone/contracts/asset-inventory.md` (array of `{ key, sourceUrl, type, alt }`)
- [x] T004 [P] Add brand design-token placeholders to `app/globals.css` (`--brand-*` custom properties for header, headings, links, buttons, section backgrounds) under both `:root` and `.dark`, values marked `TODO(capture)`

**Checkpoint**: types compile, `pnpm typecheck` green

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: the asset snapshot, content spine, and site chrome that US1–US4 all depend on

**⚠️ No user-story phase may start until this phase is complete.**

### Asset capture pipeline

- [x] T005 Implement `scripts/capture-assets.mjs` per `specs/001-marketing-site-clone/contracts/asset-inventory.md`: read `scripts/asset-sources.json`, download each `sourceUrl` into `public/assets/<key>.<ext>`, compute `bytes`+`sha256`, write `public/assets/manifest.json` (`capturedAt`, `sourceOrigin`, `assets[]`), skip unchanged by sha256. Not imported by any `app/`/`src/` module
- [x] T006 Compile the FULL `scripts/asset-sources.json` by inspecting the three live pages (`/`, `/about-us`, `/contact`): every service icon (~20), every partner/technology/academic logo, every product image, section illustrations, `favicon`, `og/*`. Record accurate `alt` text per row
- [x] T007 Run `node scripts/capture-assets.mjs`; commit `public/assets/**` and `public/assets/manifest.json`; record the capture date
- [ ] T008 [P] Pre-size/compress captured raster images (keep `.webp`/`.svg` where source provides; target reasonable dimensions for display) and re-run capture so `manifest.json` hashes match committed files

### Content spine

- [x] T009 [P] Create `src/lib/content/site.ts` exporting `SITE: SiteMeta` — `siteName` "xFlow", `logo`/`logoAlt`, `navItems` (`Home`→`/`, `About Us`→`/about-us`, `Contact Us`→`/contact`), `footerText` "© 2026 · xFlow Inc · All Rights Reserved"
- [x] T010 [P] Create `src/lib/content/metadata.ts` exporting `PAGES: Record<'/'|'/about-us'|'/contact', PageMeta>` with `title`/`description` mirroring the live `<title>` + meta description of each page, `ogImage`, and ordered `sections`
- [x] T011 [P] Write content guard test `src/lib/content/tests/content.test.ts` — asserts every `AssetKey` used in any content module exists in `public/assets/manifest.json`; `SITE.navItems` = the 3 real routes; no content string contains `xflowresearch.com/wp-content`; `PAGES[p].sections` non-empty (per `contracts/content-schema.md` invariants 1–6)

### Site chrome

- [x] T012 [P] Create `src/components/layout/SiteHeader.tsx` — `<header>` + `<nav aria-label="Primary">` from `SITE.navItems`; below mobile breakpoint collapse behind a `<button>` (`aria-expanded`/`aria-controls`) bound to `useUIStore` `mobileNavOpen`/`setMobileNavOpen`; `'use client'` only on this leaf
- [x] T013 [P] Create `src/components/layout/SiteFooter.tsx` — `<footer>` rendering `SITE.footerText` exactly
- [x] T014 [P] Create `src/components/SectionHeading.tsx` and any shared presentational helpers (eyebrow + heading + optional intro) used by multiple sections
- [x] T015 Update `app/layout.tsx` — self-host fonts via `next/font` (families identified from live CSS; substitute + note in manifest if non-redistributable), set `metadataBase` + default title template from `PAGES`, render skip-to-content link + `<SiteHeader/>` + `{children}` in `<main>` + `<SiteFooter/>`; keep `<Toaster/>`
- [x] T016 [P] Restyle `app/not-found.tsx` to site branding — `<SiteHeader/>`/`<SiteFooter/>` chrome, "page not found" message, link back to `/` (FR-009)
- [x] T017 [P] Vitest `src/components/layout/tests/SiteHeader.test.tsx` — renders the 3 nav links in order; clicking the toggle flips `mobileNavOpen` and `aria-expanded`
- [x] T018 [P] Playwright `e2e/navigation.spec.ts` — from `/`, `/about-us`, `/contact` the nav links reach all three routes; every `<img>` on each page has `naturalWidth > 0` (SC-004)

**Checkpoint**: `pnpm typecheck && pnpm lint && pnpm test` green; `pnpm build` emits `out/` with `index.html`, `about-us/index.html`, `contact/index.html`, `404.html` (bare pages OK)

---

## Phase 3: User Story 1 — Home page (Priority: P1) 🎯 MVP

**Goal**: `/` reproduces the live home page section-for-section: hero, services, open-source
contributions, research & standardization, products, partner logo wall.

**Independent Test**: Open `/` with no network access to `xflowresearch.com`; every live section
is present in the same order with the same headings, copy, and imagery; layout matches at 1440px
and 375px.

- [x] T019 [P] [US1] `src/lib/content/services.ts` → `SERVICES: readonly Service[]` — one entry per live Services card (name, blurb, `icon` AssetKey); ~20 entries
- [x] T020 [P] [US1] `src/lib/content/open-source.ts` → `OPEN_SOURCE: readonly OpenSourceContribution[]` (SONiC, Camara, GNS3, OSM, OPNFV, POX/NOX, ArcGIS — confirm on capture)
- [x] T021 [P] [US1] `src/lib/content/research.ts` → `RESEARCH_PARTNERS: readonly ResearchPartner[]` (ETSI, GSMA, MENA 6G Alliance, IEEE — confirm)
- [x] T022 [P] [US1] `src/lib/content/products.ts` → `PRODUCTS: readonly Product[]` — one entry per live product (Traffic Classification & Shaping, Data Analytics, Camara Telecom APIs, Telecom Data Management, Drive Test Automation, DPI — confirm)
- [x] T023 [P] [US1] `src/lib/content/partners.ts` → `PARTNERS: readonly PartnerReference[]` — every logo on the home logo wall with `name` used as `alt`, `logo` AssetKey, optional `category`
- [x] T024 [P] [US1] `src/components/sections/Hero.tsx` — hero layout; headline/subcopy transcribed from live home hero; primary CTA(s) as on the live site
- [x] T025 [P] [US1] `src/components/sections/ServicesGrid.tsx` — card grid, one card per `SERVICES` entry (icon `<img alt>`, name, blurb); responsive columns matching the live grid
- [x] T026 [P] [US1] `src/components/sections/OpenSourceContributions.tsx` — renders `OPEN_SOURCE` (logo/feature list per live layout)
- [x] T027 [P] [US1] `src/components/sections/ResearchStandardization.tsx` — renders `RESEARCH_PARTNERS` logo wall
- [x] T028 [P] [US1] `src/components/sections/Products.tsx` — card grid from `PRODUCTS`
- [x] T029 [P] [US1] `src/components/sections/PartnerLogoWall.tsx` — responsive logo wall from `PARTNERS`, each `<img>` with `alt` = partner name
- [x] T030 [US1] `app/page.tsx` — `export const metadata` from `PAGES['/']`; compose the six sections in `PAGES['/'].sections` order inside `<Container>` as needed
- [x] T031 [US1] Fill real brand token values in `app/globals.css` (`--brand-*`) from the live site's computed styles; apply to header/sections/buttons
- [x] T032 [P] [US1] Vitest `src/components/sections/tests/home-sections.test.tsx` — `ServicesGrid` renders `SERVICES.length` cards each with a non-empty accessible name + `<img alt>`; `PartnerLogoWall` renders `PARTNERS.length` images with non-empty `alt`; `Products` renders `PRODUCTS.length` items
- [x] T033 [US1] Manual visual-parity pass of `/` vs live at 1440px and 375px; fix layout/spacing/color deltas; confirm no horizontal overflow at 320px

**Checkpoint**: `/` is a complete, deployable MVP — all gates green, visual parity signed off

---

## Phase 4: User Story 2 — About Us page (Priority: P2)

**Goal**: `/about-us` reproduces the live About Us narrative and imagery.

**Independent Test**: Open `/about-us`; company history + expertise + client portfolio content
matches the live page; shared header/footer present; reachable from the nav on every page.

- [ ] T034 [P] [US2] `src/components/sections/AboutIntro.tsx` — company intro ("one of the very first companies providing SDN, NFV, OpenStack development services" framing), transcribed from live
- [ ] T035 [P] [US2] `src/components/sections/AboutExpertise.tsx` — technical focus (controllers, OVS porting, VxLAN/NVGRE/STT/GTP overlays, OpenFlow, DPDK; benchmarking, profiling, TCAM optimization, data visualization)
- [ ] T036 [P] [US2] `src/components/sections/AboutClients.tsx` — client/academic portfolio (Dell, Broadcom, Marvell, Intel, Cavium, universities); reuse `PARTNERS` subset where logos apply
- [ ] T037 [P] [US2] `src/components/sections/AboutOpenStack.tsx` — OpenStack development / training / educational cloud deployment narrative
- [ ] T038 [P] [US2] `src/components/sections/AboutNfv.tsx` — NFV specialization (VNF research, infrastructure, MANO)
- [x] T039 [US2] `app/about-us/page.tsx` — `metadata` from `PAGES['/about-us']`; compose about sections in order
- [ ] T040 [P] [US2] Vitest `src/components/sections/tests/about-sections.test.tsx` — each about section renders its heading and key content; any `<img>` has `alt`
- [ ] T041 [P] [US2] Playwright: extend `e2e/navigation.spec.ts` (or add `e2e/about.spec.ts`) — `/about-us` renders its main heading and the shared chrome
- [ ] T042 [US2] Manual visual-parity pass of `/about-us` vs live at 1440px and 375px

**Checkpoint**: `/` and `/about-us` both match live; all gates green

---

## Phase 5: User Story 3 — Contact page (Priority: P3)

**Goal**: `/contact` lists the three offices with addresses and the `mailto:` email.

**Independent Test**: Open `/contact`; three office blocks with correct addresses; `info@xflowresearch.com`
is a working `mailto:` link; no form present.

- [x] T043 [P] [US3] `src/lib/content/offices.ts` → `OFFICES: readonly OfficeLocation[]` (length 3) — X Flow Software Technology LLC (Dubai, `info@xflowresearch.com`), xFlow Inc. (Austin TX, `info@xflowresearch.com`), xFlow Pvt. Ltd. (Islamabad, `email: null`) with exact `addressLines` from `data-model.md`
- [x] T044 [P] [US3] `src/components/sections/OfficeList.tsx` — 3-up responsive card grid; render `addressLines`; render `email` as `mailto:` link when present
- [x] T045 [US3] `app/contact/page.tsx` — `metadata` from `PAGES['/contact']`; render `<OfficeList/>` inside `<Container>`
- [x] T046 [P] [US3] Extend content guard test `src/lib/content/tests/content.test.ts` — `OFFICES` length 3; each has ≥1 address line; Dubai + Austin carry `email` (invariant 3)
- [x] T047 [P] [US3] Playwright `e2e/contact.spec.ts` — three office entities visible; `a[href="mailto:info@xflowresearch.com"]` present (FR-007)
- [x] T048 [US3] Manual visual-parity pass of `/contact` vs live

**Checkpoint**: all three pages match live; all gates green

---

## Phase 6: User Story 4 — All media is self-hosted (Priority: P2)

**Goal**: the site is fully portable — every asset served from its own origin, zero runtime
requests to `xflowresearch.com` or third parties, auditable inventory.

**Independent Test**: With outbound network blocked except the site's own host, load all pages —
every image/font renders; the asset inventory accounts for every file with a source URL + date.

- [x] T049 [US4] Playwright `e2e/no-external-requests.spec.ts` — `page.route('**/*', …)`; load `/`, `/about-us`, `/contact` and assert no requested URL host is `xflowresearch.com` or a known font/CDN host (fonts.googleapis.com, fonts.gstatic.com, cdn.*, etc.) (SC-003)
- [x] T050 [P] [US4] Add a build-output guard: script/test that greps `out/**` after `pnpm build` for `xflowresearch.com` and `wp-content` and fails on any hit; wire into `e2e` or a `pnpm` script
- [x] T051 [P] [US4] Sync human-readable `specs/001-marketing-site-clone/contracts/asset-inventory.md` from the final `public/assets/manifest.json` (full table: key, localPath, sourceUrl, type, alt, capturedAt, substitution) (SC-008)
- [x] T052 [US4] Offline verification per `quickstart.md` step 4 — serve `out/` with network to external hosts blocked; confirm no broken images/fonts on all pages; record result in `quickstart.md` checklist

**Checkpoint**: SC-003 and SC-008 automated + verified

---

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T053 [P] Playwright `e2e/accessibility.spec.ts` — `@axe-core/playwright` on `/`, `/about-us`, `/contact`; assert zero serious/critical violations (SC-006); keyboard-only pass of nav + email link
- [x] T054 [P] Playwright `e2e/not-found.spec.ts` — unknown path renders branded 404 with a link to `/` (FR-009)
- [ ] T055 [P] Audit all motion for `prefers-reduced-motion` (spec edge case); gate any entrance animation in `app/globals.css`
- [ ] T056 [P] Performance check — `pnpm build` + serve `out/`; Lighthouse desktop Performance & Accessibility ≥ 95; confirm pages readable <1s / interactive <2s on throttled broadband (SC-005); add `loading`/`width`/`height` to images to prevent layout shift
- [ ] T057 [P] `favicon` + `og/*` wired (`app/icon.*`, `openGraph.images` in metadata); verify social preview renders
- [ ] T058 [P] Update `README.md` — replace scaffold blurb with a short xFlow site overview + link to `specs/001-marketing-site-clone/quickstart.md`; note the asset-capture step
- [x] T059 Run full gate: `pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm test:e2e`; serve `out/` as static files and confirm SC-007
- [ ] T060 Reviewer sign-off on SC-001 (content complete) and SC-002 (visual match) across all three pages; record in `specs/001-marketing-site-clone/checklists/requirements.md` notes

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** → **Phase 2 (Foundational)** → user-story phases.
- **Phase 2 blocks everything.** In particular T005→T006→T007→T008 (asset pipeline) must finish
  before any section component can reference an `AssetKey`.
- **US1 (Phase 3)** is the MVP and depends only on Phase 2.
- **US2 (Phase 4)** and **US3 (Phase 5)** depend only on Phase 2; independent of US1 and each
  other (US2 may reuse `PARTNERS` from T023 — if built first, add those rows in T036).
- **US4 (Phase 6)** depends on US1–US3 pages existing (needs routes to test).
- **Phase 7 (Polish)** depends on US1–US4.

```
Setup ──▶ Foundational ──┬──▶ US1 (P1, MVP) ──┐
                         ├──▶ US2 (P2) ───────┤
                         ├──▶ US3 (P3) ───────┼──▶ US4 (P2) ──▶ Polish
                         └────────────────────┘
```

## Parallel Opportunities

- **Setup**: T002, T003, T004 in parallel (T001 first — install).
- **Foundational**: after T007, the content spine (T009–T011) and chrome (T012–T014, T016–T018)
  run in parallel; T015 waits on T012/T013.
- **US1**: all content modules T019–T023 in parallel; all section components T024–T029 in
  parallel once their content module exists; T030 waits on all; T032 parallel with T031/T033.
- **US2**: T034–T038 in parallel; T039 waits on all.
- **US3**: T043 ∥ T044 partly (T044 renders T043's type); T046, T047 parallel after T045.
- **Across stories**: once Foundational is done, one person can take US1 while another takes
  US2+US3.
- **Polish**: T053–T058 all parallel; T059 then T060 last.

## Implementation Strategy

1. **MVP = Phase 1 + Phase 2 + Phase 3 (US1).** Ship `/` alone — a faithful home page with
   self-hosted assets and passing gates is a demonstrable deliverable.
2. **Increment 2**: add US2 (`/about-us`) and US3 (`/contact`).
3. **Increment 3**: US4 hardening (no-external-requests test + build guard + inventory sync +
   offline check).
4. **Increment 4**: Polish — a11y, 404, perf, reduced-motion, README, full-gate sign-off.

## Notes

- Tests are first-class here (Constitution IV). Write the Vitest/Playwright task in the same
  increment as the component it covers.
- The asset-capture script is the ONLY code permitted to contact `xflowresearch.com`, and only
  at authoring time — never imported by `app/` or `src/`.
- If the live site is found to have standalone per-service/per-product pages, STOP and log them
  as an out-of-scope follow-up (spec Assumption); do not expand this feature.
