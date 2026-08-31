# Phase 1 Data Model: xFlow Tech Marketing Site Clone

All "data" here is compile-time TypeScript in `src/lib/content/**` plus static files in
`public/assets/**`. Nothing is persisted at runtime.

## Entity: Page

A route in the site.

| Field       | Type        | Notes                                                        |
| ----------- | ----------- | ------------------------------------------------------------ |
| path        | string      | `/`, `/about-us`, `/contact` (must match live site — FR-001) |
| title       | string      | `<title>` text, mirrors live (FR-013)                        |
| description | string      | meta description, mirrors live (FR-013)                      |
| ogImage     | AssetKey    | social preview image                                         |
| sections    | SectionId[] | ordered; matches the live page's section order (FR-002/003)  |

**Instances**: `home`, `about-us`, `contact`. Defined in `src/lib/content/metadata.ts` +
composed in the matching `app/**/page.tsx`.

## Entity: ContentSection

A titled block rendered by exactly one component in `src/components/sections/`.

| Field   | Type                                                                | Notes                                                 |
| ------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| id      | SectionId                                                           | stable slug, e.g. `hero`, `services`, `partners`      |
| heading | string \| null                                                      | visible section heading (null for hero)               |
| layout  | `'hero' \| 'card-grid' \| 'logo-wall' \| 'prose' \| 'feature-list'` | drives the component chosen                           |
| body    | string \| string[]                                                  | prose paragraphs (in-component, not in `lib/content`) |
| items   | Service[] \| Product[] \| PartnerReference[] \| …                   | for list/grid layouts                                 |

**Relationships**: `Page.sections` → `ContentSection.id` (ordered many). Each `ContentSection`
maps 1:1 to a React component.

**Expected sections** (from spec; confirm during capture):

- Home: `hero`, `services`, `open-source`, `research-standardization`, `products`, `partners`
- About Us: `about-intro`, `about-expertise`, `about-clients`, `about-openstack`, `about-nfv`
- Contact: `offices`

## Entity: Service

One offering in the Home "Services" grid.

| Field | Type     | Rules                                                                                    |
| ----- | -------- | ---------------------------------------------------------------------------------------- |
| slug  | string   | unique, kebab-case                                                                       |
| name  | string   | required, non-empty (e.g. "Artificial Intelligence")                                     |
| blurb | string   | short description as shown on the live card; may be empty if the live card is title-only |
| icon  | AssetKey | references an entry in the asset manifest under `assets/icons/`                          |

**Source**: `src/lib/content/services.ts` → `Service[]`. Count ≈ 20 (SC-001 requires all live
entries present).

## Entity: OpenSourceContribution

| Field | Type             | Rules                                            |
| ----- | ---------------- | ------------------------------------------------ |
| name  | string           | e.g. "SONiC", "GNS3", "OSM"                      |
| url   | string \| null   | upstream project link, if the live site links it |
| logo  | AssetKey \| null |                                                  |

**Source**: `src/lib/content/open-source.ts`.

## Entity: ResearchPartner

Standardisation / research body the company participates in.

| Field | Type             | Rules                                           |
| ----- | ---------------- | ----------------------------------------------- |
| name  | string           | e.g. "ETSI", "GSMA", "IEEE", "MENA 6G Alliance" |
| logo  | AssetKey \| null |                                                 |
| url   | string \| null   |                                                 |

**Source**: `src/lib/content/research.ts`.

## Entity: Product

| Field | Type             | Rules                                          |
| ----- | ---------------- | ---------------------------------------------- |
| slug  | string           | unique                                         |
| name  | string           | required (e.g. "Deep Packet Inspection (DPI)") |
| blurb | string           | as shown on the live site                      |
| image | AssetKey \| null |                                                |

**Source**: `src/lib/content/products.ts`. Count ≈ 6.

## Entity: PartnerReference

A logo on the Home partner/technology "logo wall".

| Field    | Type                                              | Rules                                            |
| -------- | ------------------------------------------------- | ------------------------------------------------ |
| name     | string                                            | org/project name — used as image `alt` and title |
| logo     | AssetKey                                          | required; `assets/partners/**`                   |
| url      | string \| null                                    |                                                  |
| category | `'partner' \| 'technology' \| 'academic'` \| null | optional grouping if the live site groups them   |

**Source**: `src/lib/content/partners.ts`. Names seen: ETSI, Linux Foundation, Dell
Technologies, SONiC, GSMA, Khalifa University, Intel, VMware, Red Hat (confirm full list on
capture).

## Entity: OfficeLocation

| Field        | Type                   | Rules                                                                                 |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------- |
| entity       | string                 | legal name, e.g. "xFlow Tech Inc."                                                |
| addressLines | string[]               | full postal address as shown                                                          |
| email        | string \| null         | `info@xflowresearch.com` where the live site shows it; rendered as `mailto:` (FR-007) |
| region       | `'AE' \| 'US' \| 'PK'` | for optional ordering/labelling                                                       |

**Instances** (from live Contact page):

1. `X Flow Software Technology LLC` — Office 304 Al Wahda Building, Port Saeed Road, Deira,
   Dubai, UAE — `info@xflowresearch.com`
2. `xFlow Tech Inc.` — Austin, Texas, USA — `info@xflowresearch.com`
3. `xFlow Tech Pvt. Ltd.` — First Floor, Plot # 100-A, Street 14, Industrial Area,
   Sector I-9/2, Islamabad, Pakistan — (no email on live site)

**Source**: `src/lib/content/offices.ts`.

## Entity: MediaAsset (manifest row)

Every file under `public/assets/**`, tracked in the asset inventory.

| Field        | Type                                                 | Rules                                                                           |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| key          | AssetKey                                             | stable id referenced from content data (e.g. `partners/etsi`)                   |
| localPath    | string                                               | repo path under `public/` (e.g. `/assets/partners/etsi.webp`)                   |
| sourceUrl    | string                                               | original `xflowresearch.com/wp-content/...` URL (FR-012)                        |
| type         | `'logo' \| 'icon' \| 'product' \| 'og' \| 'favicon'` |                                                                                 |
| alt          | string                                               | required for every non-decorative image (FR-011); empty string marks decorative |
| bytes        | number                                               | recorded by the capture script                                                  |
| sha256       | string                                               | integrity + dedupe                                                              |
| capturedAt   | string (ISO date)                                    | snapshot date (FR-012)                                                          |
| substitution | string \| null                                       | set when a font/image was swapped for a licensed alternative                    |

**Source**: generated into `public/assets/manifest.json` by `scripts/capture-assets.mjs`;
human-readable copy tracked at `specs/001-marketing-site-clone/contracts/asset-inventory.md`.

## Entity: NavItem / SiteMeta

| Field      | Type                                | Notes                                                                |
| ---------- | ----------------------------------- | -------------------------------------------------------------------- |
| navItems   | `{ label: string; href: string }[]` | `Home → /`, `About Us → /about-us`, `Contact Us → /contact` (FR-004) |
| siteName   | string                              | "xFlow Tech"                                                     |
| footerText | string                              | "© 2026 · xFlow Tech Inc · All Rights Reserved" (FR-004)         |
| logo       | AssetKey                            | brand logo(s)                                                        |

**Source**: `src/lib/content/site.ts`.

## Validation rules (enforced by types + a Vitest guard)

- Every `AssetKey` referenced in any content module MUST exist in `manifest.json` (test:
  `content-assets-exist.test.ts`).
- Every image asset MUST have non-null `alt` unless explicitly `''` (decorative).
- `navItems[*].href` MUST be one of the three real routes.
- `Page.sections` MUST reference defined section components.
- No content string may contain a `http(s)://xflowresearch.com` URL for an embeddable resource
  (test: guards FR-006 at the data layer).
