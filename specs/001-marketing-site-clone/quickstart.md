# Quickstart: Validate the xFlow Tech Marketing Site Clone

End-to-end validation that the rebuilt site meets the spec. Run from repo root.

## Prerequisites

- Node LTS + `pnpm`
- `pnpm install` (re-adds `@axe-core/playwright` per research §8)
- `pnpm exec playwright install` (browsers, first run only)

## 1. Capture the asset snapshot (authoring step)

```bash
node scripts/capture-assets.mjs
```

Expected: `public/assets/**` populated, `public/assets/manifest.json` written with a
`capturedAt` date. Re-running is idempotent (skips unchanged files).

Verify: `contracts/asset-inventory.md` rules — every referenced `AssetKey` resolves, every
image row has `alt`, no row is missing `sourceUrl`/`substitution`.

## 2. Content-data integrity

```bash
pnpm test src/lib/content
```

Expected: `content.test.ts` passes — nav has 3 real routes, `OFFICES` length 3, no
`xflowresearch.com/wp-content` strings in content, every `AssetKey` in the manifest,
section ids resolve to components.

## 3. Component rendering

```bash
pnpm test src/components/sections
```

Expected: each section renders its heading and one node per content item (e.g. `ServicesGrid`
renders `SERVICES.length` cards, each with a non-empty accessible name and an `<img alt>`).
`SiteHeader` renders Home / About Us / Contact Us; clicking the mobile toggle flips
`ui-store.mobileNavOpen` and `aria-expanded`.

## 4. Dev server — visual parity

```bash
pnpm dev   # http://localhost:3000
```

Manual side-by-side against the live site (SC-001, SC-002):

- [ ] `/`, `/about-us`, `/contact` — every live section present, same order, same copy.
- [ ] Header nav + footer copyright identical on all three pages.
- [ ] At 1440px and at 375px the layout matches the live site (no overflow, same reflow).
- [ ] All images render; logo, service icons, partner wall, product images visible.
- [ ] `info@xflowresearch.com` opens a mail client.
- [ ] `prefers-reduced-motion` disables any entrance animation.

## 5. Static export

```bash
pnpm build
npx serve out   # or any static server
```

Expected (`contracts/routes.md`): `out/index.html`, `out/about-us/index.html`,
`out/contact/index.html`, `out/404.html`. Site fully functional when served as plain files
(SC-007).

## 6. Automated e2e + accessibility + no-external-requests

```bash
pnpm test:e2e
```

Expected — all specs green:

| Spec                           | Proves                                                            |
| ------------------------------ | ----------------------------------------------------------------- |
| `navigation.spec.ts`           | nav links reach all 3 routes from every page                      |
| `no-external-requests.spec.ts` | zero requests to `xflowresearch.com` / third-party hosts (SC-003) |
| `contact.spec.ts`              | 3 offices + `mailto:` link (FR-007)                               |
| `not-found.spec.ts`            | unknown path → branded 404 with home link (FR-009)                |
| `accessibility.spec.ts`        | axe: 0 serious/critical on all 3 pages (SC-006)                   |
| (in navigation spec)           | every `<img>` has `naturalWidth > 0` (SC-004)                     |

## 7. Gates

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

All must pass (Constitution III). Then a reviewer familiar with the live site signs off on
SC-001 / SC-002 and the network-tab check for SC-003.

## Done when

- Steps 2, 3, 5, 6, 7 pass in CI.
- Step 4 manual checklist signed off.
- `public/assets/manifest.json` committed with the snapshot date; `scripts/asset-sources.json`
  committed.
