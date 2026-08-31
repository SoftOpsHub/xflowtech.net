import { describe, it, expect } from 'vitest';
import { ASSET_KEYS } from '@/src/lib/assets';
import { SITE } from '@/src/lib/content/site';
import { SERVICES } from '@/src/lib/content/services';
import { PRODUCTS } from '@/src/lib/content/products';
import { PARTNERS } from '@/src/lib/content/partners';
import { OFFICES } from '@/src/lib/content/offices';
import { PAGES } from '@/src/lib/content/metadata';

const keys = new Set(ASSET_KEYS);
const routes = ['/', '/about-us', '/contact'];

function collectAssetKeys(): string[] {
  const out: string[] = [SITE.logo];
  SERVICES.forEach((s) => out.push(s.icon));
  PRODUCTS.forEach((p) => p.image && out.push(p.image));
  PARTNERS.forEach((p) => out.push(p.logo));
  OFFICES.forEach((o) => out.push(o.logo));
  Object.values(PAGES).forEach((p) => out.push(p.ogImage));
  return out;
}

describe('content data integrity', () => {
  it('every referenced asset key exists in the manifest', () => {
    const missing = collectAssetKeys()
      .filter((k) => !k.startsWith('lucide:'))
      .filter((k) => !keys.has(k));
    expect(missing).toEqual([]);
  });

  it('nav points at the three real routes', () => {
    expect(SITE.navItems.map((n) => n.href)).toEqual(routes);
  });

  it('footer text matches the live copyright line', () => {
    expect(SITE.footerText).toBe('© 2026 · xFlow Tech Inc · All Rights Reserved');
  });

  it('has exactly three offices; Dubai and Austin carry an email', () => {
    expect(OFFICES).toHaveLength(3);
    OFFICES.forEach((o) => expect(o.addressLines.length).toBeGreaterThan(0));
    expect(OFFICES.filter((o) => o.email).map((o) => o.entity)).toEqual([
      'X Flow Software Technology LLC',
      'xFlow Tech Inc.',
    ]);
  });

  it('no content string hotlinks a live asset', () => {
    const blob = JSON.stringify({ SERVICES, PRODUCTS, PARTNERS });
    expect(blob).not.toMatch(/xflowresearch\.com\/wp-content/);
  });

  it('every page has a non-empty ordered section list', () => {
    for (const route of routes) {
      const meta = PAGES[route as keyof typeof PAGES];
      expect(meta.sections.length).toBeGreaterThan(0);
    }
  });

  it('service, product and partner names are unique and non-empty', () => {
    for (const list of [
      SERVICES.map((s) => s.name),
      PRODUCTS.map((p) => p.name),
      PARTNERS.map((p) => p.name),
    ]) {
      expect(list.every((n) => n.trim().length > 0)).toBe(true);
      expect(new Set(list).size).toBe(list.length);
    }
  });
});
