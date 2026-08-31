# Contract: Routes & Page Composition

The site exposes exactly four static outputs. Paths MUST match the live site (FR-001).

| Route         | File                    | Static output             | Purpose                    |
| ------------- | ----------------------- | ------------------------- | -------------------------- |
| `/`           | `app/page.tsx`          | `out/index.html`          | Home                       |
| `/about-us`   | `app/about-us/page.tsx` | `out/about-us/index.html` | About Us                   |
| `/contact`    | `app/contact/page.tsx`  | `out/contact/index.html`  | Contact                    |
| (any unknown) | `app/not-found.tsx`     | `out/404.html`            | Branded not-found (FR-009) |

## Shared chrome (every route)

- `<SiteHeader>` — landmark `<header>` + `<nav aria-label="Primary">` with links in this order:
  `Home → /`, `About Us → /about-us`, `Contact Us → /contact` (FR-004). Below the mobile
  breakpoint, links collapse behind a toggle button bound to `ui-store` `mobileNavOpen`;
  toggle is a real `<button>` with `aria-expanded` / `aria-controls`.
- `<SiteFooter>` — landmark `<footer>` containing exactly the live copyright line
  `© 2026 · xFlow Tech Inc · All Rights Reserved` (FR-004).
- `<main>` wraps page sections; skip-to-content link precedes the header.

## Per-page section order

Section order MUST match the live page (FR-002/003). Final list is confirmed during capture;
the expected set:

**Home** (`sections: ['hero','services','open-source','research-standardization','products','partners']`)

| Section id                 | Component                 | Layout                   | Data source                    |
| -------------------------- | ------------------------- | ------------------------ | ------------------------------ |
| `hero`                     | `Hero`                    | hero                     | in-component prose + `site.ts` |
| `services`                 | `ServicesGrid`            | card-grid                | `services.ts`                  |
| `open-source`              | `OpenSourceContributions` | logo-wall / feature-list | `open-source.ts`               |
| `research-standardization` | `ResearchStandardization` | logo-wall                | `research.ts`                  |
| `products`                 | `Products`                | card-grid                | `products.ts`                  |
| `partners`                 | `PartnerLogoWall`         | logo-wall                | `partners.ts`                  |

**About Us** (`sections: ['about-intro','about-expertise','about-clients','about-openstack','about-nfv']`)

| Section id        | Component        | Layout               | Data source          |
| ----------------- | ---------------- | -------------------- | -------------------- |
| `about-intro`     | `AboutIntro`     | prose                | in-component         |
| `about-expertise` | `AboutExpertise` | prose / feature-list | in-component         |
| `about-clients`   | `AboutClients`   | prose + logo-wall    | `partners.ts` subset |
| `about-openstack` | `AboutOpenStack` | prose                | in-component         |
| `about-nfv`       | `AboutNfv`       | prose                | in-component         |

**Contact** (`sections: ['offices']`)

| Section id | Component    | Layout        | Data source  |
| ---------- | ------------ | ------------- | ------------ |
| `offices`  | `OfficeList` | card-grid (3) | `offices.ts` |

## Metadata contract (per route)

Each `page.tsx` exports `metadata` built from `src/lib/content/metadata.ts`:

```
metadata = {
  title: <mirrors live <title>>,
  description: <mirrors live meta description>,
  openGraph: { title, description, images: ['/og/<page>.<ext>'] },
}
```

`app/layout.tsx` sets `metadataBase`, default title template, favicon (`app/icon.*`), and the
self-hosted font variables.

## Build/runtime invariants

- `next build` completes with `output: 'export'`; `out/` contains the four HTML outputs above.
- No route file imports `next/headers`, `next/server`, Server Actions, or anything under
  `app/api/` (none exists).
- Loading any output HTML triggers **zero** network requests to `xflowresearch.com` or a
  third-party host (FR-006 / SC-003).
