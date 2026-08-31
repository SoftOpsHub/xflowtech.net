// Shapes for the site's compile-time content. Concrete values live in the sibling
// modules; see specs/001-marketing-site-clone/contracts/content-schema.md.

/** Key into public/assets/manifest.json. */
export type AssetKey = string;

export interface NavItem {
  label: string;
  href: '/' | '/about-us' | '/contact';
}

export interface SiteMeta {
  siteName: string;
  logo: AssetKey;
  logoAlt: string;
  navItems: NavItem[];
  footerText: string;
}

export interface Service {
  slug: string;
  name: string;
  blurb: string;
  icon: AssetKey;
  /** Where the card links, as on the live site. null → not a link. */
  href: string | null;
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
  name: string;
  logo: AssetKey;
  url: string | null;
  category: 'partner' | 'technology' | 'academic' | null;
}

export interface OfficeLocation {
  entity: string;
  addressLines: string[];
  email: string | null;
  region: 'AE' | 'US' | 'PK';
  logo: AssetKey;
}

export interface PageMeta {
  path: '/' | '/about-us' | '/contact';
  title: string;
  description: string;
  ogImage: AssetKey;
  sections: string[];
}
