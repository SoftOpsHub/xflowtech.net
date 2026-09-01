import type { PageMeta } from './types';

export const PAGES: Record<'/' | '/about-us' | '/contact', PageMeta> = {
  '/': {
    path: '/',
    title: 'xFlow Tech — Network Infrastructure Services',
    description:
      'xFlow Tech builds solutions and provides research services in NFV, SDN, IoT, ' +
      'fast data communication, and other cutting-edge cloud technologies.',
    ogImage: 'xflow-logo-white',
    sections: ['hero', 'services', 'products', 'partners'],
  },
  '/about-us': {
    path: '/about-us',
    title: 'About Us — xFlow Tech',
    description:
      'xFlow is one of the very first companies providing SDN, NFV, and ' +
      'OpenStack development services, with roots in academic networking research.',
    ogImage: 'xflow-logo-white',
    sections: ['about-intro'],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us — xFlow Tech',
    description: 'Get in touch with xFlow — based in Dubai, UAE.',
    ogImage: 'xflow-logo-white',
    sections: ['offices'],
  },
};
