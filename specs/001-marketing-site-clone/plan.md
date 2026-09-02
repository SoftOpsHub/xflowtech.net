# Implementation Plan: xFlow Marketing Site Clone

**Branch**: `001-marketing-site-clone` | **Date**: 2026-08-31 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-marketing-site-clone/spec.md`

## Summary

Rebuild the public xFlow marketing site (`xflowresearch.com` — a WordPress site) as a
faithful static site on this repo's Next.js static-export stack. Three pages — Home (`/`), About
Us (`/about-us`), Contact (`/contact`) — are recreated section-by-section as composed React
components. All text is transcribed into typed content data and section components; all media
(logo, section icons, partner/technology logos, product images) is captured once from the live
site into `public/`, with a recorded inventory. Fonts are self-hosted at build time. The site
makes zero runtime requests to `xflowresearch.com` or any third-party host. The only interactive
behaviour is the mobile-nav toggle and `mailto:` links.

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19, Next.js 16 (App Router, `output: 'export'`)

**Primary Dependencies**: Next.js, Tailwind CSS v4, shadcn/ui + Radix primitives (already
vendored in `src/components/ui/`), Zustand (mobile-nav state), `next/font` (self-hosted fonts).
No new runtime dependencies expected.

**Storage**: N/A — content is typed data modules in `src/lib/content/`; media is static files in
`public/`. No database, no CMS.

**Testing**: Vitest + React Testing Library (section/component rendering), Playwright + axe
(routing, no-external-requests, `mailto:`, 404, accessibility).

**Target Platform**: Any static file host; modern evergreen browsers; viewport ~320px → ultra-wide.

**Project Type**: Static web frontend (single project — this repo).

**Performance Goals**: Each page readable < 1s and interactive < 2s on broadband (SC-005);
Lighthouse Performance & Accessibility ≥ 95 on desktop; no layout shift from late-loading images.

**Constraints**: No backend, no Server Actions, no `app/api/`, no `next/headers` (Constitution I);
no runtime requests to `xflowresearch.com` or third-party asset/font/script hosts (FR-006);
WCAG 2.1 AA (FR-014); static export must succeed (`out/`).

**Scale/Scope**: 3 routes + 404; ~10–14 section components; ~40–70 captured static assets
(estimate: 1 logo, ~20 service icons, ~15 partner logos, ~6 product images, favicon + OG image);
1 language (English); content is a point-in-time snapshot.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                  | Assessment                                                                                                                                                                                                                          | Status          |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| I. Static-First, No Backend                | Pure static export. No forms on the live site; Contact uses `mailto:`. No server/API/middleware code.                                                                                                                               | PASS            |
| II. Component-Based Architecture           | `app/` pages stay thin (metadata + compose sections). Sections live in `src/components/sections/`, chrome in `src/components/layout/`, structured copy in `src/lib/content/`, mobile-nav state in existing `src/store/ui-store.ts`. | PASS (see note) |
| III. Type Safety & Automated Quality Gates | Content data fully typed; `typecheck`/`lint`/`test` gates unchanged; conventional commits.                                                                                                                                          | PASS            |
| IV. Test the Behavior That Ships           | Vitest for section content rendering; Playwright for routes, no-external-requests, `mailto:`, 404; axe for a11y.                                                                                                                    | PASS            |
| V. Accessible, Responsive UI               | Semantic landmarks, keyboard-operable nav (Radix), visible focus, AA contrast, responsive Tailwind, `prefers-reduced-motion` respected.                                                                                             | PASS            |
| Technology Constraints                     | No banned deps; no new runtime deps; pnpm.                                                                                                                                                                                          | PASS            |

**Note on Principle II**: The constitution's fixed `src/` layout does not list a `content/`
folder. This plan keeps structured/repeated copy (service list, partner list, product list,
office list, nav items, per-page metadata) as pure typed data under **`src/lib/content/`** —
i.e. inside the sanctioned `lib/` (pure helpers/data) directory — rather than introducing a new
top-level `src/content/`. Prose (hero copy, About narrative) lives directly in the section
components. No deviation from the fixed layout; no Complexity Tracking entry required.

**New repo-root directory**: `scripts/` for the one-off asset-capture helper (dev-only, not part
of the static export). This is authoring tooling, not application source, and is outside `src/`.
Permitted.

## Project Structure

### Documentation (this feature)

```text
specs/001-marketing-site-clone/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── routes.md        # Route + per-page section contract
│   ├── content-schema.md# Shape of src/lib/content/* data
│   └── asset-inventory.md# Format + seed of the captured-asset manifest
└── tasks.md             # /speckit-tasks output (not created here)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                  # root: fonts, <SiteHeader/>, <SiteFooter/>, globals
├── page.tsx                    # Home — composes home sections + metadata
├── about-us/page.tsx           # About Us — composes about sections + metadata
├── contact/page.tsx            # Contact — office list + metadata
├── not-found.tsx               # branded 404 (already exists — restyle)
├── error.tsx / loading.tsx     # already exist
└── globals.css                 # Tailwind + design tokens (extend with brand palette)

src/
├── components/
│   ├── layout/
│   │   ├── Container.tsx        # exists
│   │   ├── SiteHeader.tsx       # nav (Home / About Us / Contact Us) + mobile toggle
│   │   └── SiteFooter.tsx       # copyright + any footer content
│   ├── sections/               # one component per distinct live-site section
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── OpenSourceContributions.tsx
│   │   ├── ResearchStandardization.tsx
│   │   ├── Products.tsx
│   │   ├── PartnerLogoWall.tsx
│   │   ├── AboutIntro.tsx
│   │   ├── AboutExpertise.tsx
│   │   └── ... (finalised during capture)
│   ├── ui/                      # shadcn primitives (exists)
│   └── SectionHeading.tsx       # shared presentational helpers as needed
├── lib/
│   ├── utils.ts                 # exists (cn)
│   └── content/
│       ├── site.ts              # site name, nav items, footer text, socials
│       ├── services.ts          # Service[] (name, blurb, icon asset key)
│       ├── open-source.ts       # OpenSourceContribution[]
│       ├── research.ts          # ResearchPartner[]
│       ├── products.ts          # Product[]
│       ├── partners.ts          # PartnerReference[] (logo wall)
│       ├── offices.ts           # OfficeLocation[]
│       └── metadata.ts          # per-page title/description/OG
├── store/
│   └── ui-store.ts              # exists — use mobileNavOpen/setMobileNavOpen
└── test/                        # setup.ts, render.tsx (exist)

public/
├── favicon.ico
├── og/                          # social-share preview image(s)
└── assets/
    ├── brand/                   # xFlow logo (light/dark variants)
    ├── icons/                   # service/section icons
    ├── partners/                # partner + technology logos
    └── products/                # product images

scripts/
└── capture-assets.mjs           # dev-only: download listed asset URLs → public/assets/, emit manifest

e2e/
├── navigation.spec.ts
├── no-external-requests.spec.ts
├── contact.spec.ts
├── not-found.spec.ts
└── accessibility.spec.ts

src/components/sections/tests/   # Vitest: each section renders its captured content
```

**Structure Decision**: Single-project static site. `app/` holds three thin route files plus the
existing 404/error/loading. All UI is in `src/components/` split into `layout/` (site chrome) and
`sections/` (page content blocks). Repeated/structured copy is typed data in `src/lib/content/`;
prose lives in section components. Captured media is organised under `public/assets/`. A
dev-only `scripts/capture-assets.mjs` makes the asset snapshot reproducible and writes the
inventory consumed by `contracts/asset-inventory.md`.

## Complexity Tracking

No constitution violations. Table intentionally omitted.
