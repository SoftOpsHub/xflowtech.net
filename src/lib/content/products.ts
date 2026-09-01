import type { Product } from './types';

export const PRODUCTS: readonly Product[] = [
  {
    slug: 'traffic-classification-shaping',
    name: 'Traffic Classification and Shaping Solutions',
    blurb: 'Classify and shape network traffic in real time.',
    image: 'traffic-shapping',
    href: '/traffic-classification-and-shaping-solutions',
  },
  {
    slug: 'data-analytics',
    name: 'Data Analytics Solution',
    blurb: 'Turn network and telecom data into actionable insight.',
    image: 'data-analysis',
    href: '/data-analytics-solution',
  },
];

/** Products that get their own local page (internal href). */
export const PRODUCT_PAGES = PRODUCTS.filter((p) => p.href?.startsWith('/'));
