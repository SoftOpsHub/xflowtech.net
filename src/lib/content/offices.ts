import type { OfficeLocation } from './types';

export const OFFICES: readonly OfficeLocation[] = [
  {
    entity: 'X Flow Software Technology LLC',
    addressLines: ['Office 304 Al Wahda Building,', 'Port Saeed Road, Deira, Dubai, UAE'],
    email: 'info@xflowtech.net',
    region: 'AE',
    logo: 'xflow-logo',
  },
  {
    entity: 'xFlow Tech Inc.',
    addressLines: ['Austin, Texas, USA'],
    email: 'info@xflowtech.net',
    region: 'US',
    logo: 'cropped-unnamed-alt',
  },
  {
    entity: 'xFlow Tech Pvt. Ltd.',
    addressLines: [
      'First Floor, Plot # 100-A, Street 14,',
      'Industrial Area, Sector I-9/2, Islamabad, Pakistan.',
    ],
    email: null,
    region: 'PK',
    logo: 'cropped-unnamed-alt',
  },
];
