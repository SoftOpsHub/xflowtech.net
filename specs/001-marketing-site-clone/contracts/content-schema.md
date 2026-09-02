# Contract: Content Data Schema (`src/lib/content/**`)

All content modules export typed, immutable data. Shapes below are the contract; the concrete
values are filled from the captured snapshot during implementation.

```ts
// src/lib/content/types.ts
export type AssetKey = string; // must resolve in public/assets/manifest.json

export interface NavItem {
  label: string;
  href: '/' | '/about-us' | '/contact';
}

export interface SiteMeta {
  siteName: string; // "xFlow"
  logo: AssetKey; // brand/logo
  logoAlt: string;
  navItems: NavItem[]; // exactly 3, in live order
  footerText: string; // "© 2026 · xFlow Inc · All Rights Reserved"
}

export interface Service {
  slug: string;
  name: string; // non-empty
  blurb: string; // "" allowed if live card is title-only
  icon: AssetKey;
}

export interface OpenSourceContribution {
  name: string;
  url: string | null;
  logo: AssetKey | null;
}
export interface ResearchPartner {
  name: string;
  url: string | null;
  logo: AssetKey | null;
}

export interface Product {
  slug: string;
  name: string;
  blurb: string;
  image: AssetKey | null;
}

export interface PartnerReference {
  name: string; // used as alt text
  logo: AssetKey;
  url: string | null;
  category: 'partner' | 'technology' | 'academic' | null;
}

export interface OfficeLocation {
  entity: string;
  addressLines: string[]; // >= 1
  email: string | null; // rendered as mailto: when present
  region: 'AE' | 'US' | 'PK';
}

export interface PageMeta {
  path: '/' | '/about-us' | '/contact';
  title: string;
  description: string;
  ogImage: AssetKey;
  sections: string[]; // section ids, ordered
}
```

## Module exports

| Module           | Export              | Type                                                 |
| ---------------- | ------------------- | ---------------------------------------------------- |
| `site.ts`        | `SITE`              | `SiteMeta`                                           |
| `services.ts`    | `SERVICES`          | `readonly Service[]`                                 |
| `open-source.ts` | `OPEN_SOURCE`       | `readonly OpenSourceContribution[]`                  |
| `research.ts`    | `RESEARCH_PARTNERS` | `readonly ResearchPartner[]`                         |
| `products.ts`    | `PRODUCTS`          | `readonly Product[]`                                 |
| `partners.ts`    | `PARTNERS`          | `readonly PartnerReference[]`                        |
| `offices.ts`     | `OFFICES`           | `readonly OfficeLocation[]` (length 3)               |
| `metadata.ts`    | `PAGES`             | `Record<'/' \| '/about-us' \| '/contact', PageMeta>` |

## Invariants (enforced by Vitest guard `src/lib/content/tests/content.test.ts`)

1. Every `AssetKey` in any module exists as a `key` in `public/assets/manifest.json`.
2. `SITE.navItems` has length 3 and hrefs are exactly `/`, `/about-us`, `/contact`.
3. `OFFICES` has length 3; each has `>= 1` address line; the two entities that show an email on
   the live site carry `email`.
4. No string field contains `xflowresearch.com/wp-content` (assets must be localised — FR-006).
5. `PAGES[p].sections` is non-empty and every id has a matching section component.
6. `SERVICES`, `PRODUCTS`, `PARTNERS` names are unique and non-empty.
