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

/** A styled run of text inside a paragraph or list item: plain string, or bold/italic. */
export type InlineRun = string | { b: string } | { i: string };

export interface GalleryItem {
  image: AssetKey;
  alt: string;
  /** Optional external link; when set the tile links out in a new tab. */
  href?: string;
  caption?: string;
}

/** One tab of an {@link ServiceBlock} embed — a third-party interactive frame. */
export interface EmbedFrame {
  label: string;
  src: string;
  title: string;
}

export type ServiceBlock =
  | { type: 'para'; runs: InlineRun[] }
  | { type: 'heading'; text: string }
  | { type: 'list'; ordered: boolean; items: InlineRun[][] }
  | { type: 'gallery'; items: GalleryItem[] }
  | { type: 'embed'; title?: string; frames: EmbedFrame[] };

/** Body content for a service's own page, mirrored from the live site. */
export interface ServiceContent {
  blocks: ServiceBlock[];
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
  /** Where the card links, as on the live site. null → not a link. */
  href?: string | null;
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
