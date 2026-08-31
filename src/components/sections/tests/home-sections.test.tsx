import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/src/test/render';
import { ServicesGrid } from '../ServicesGrid';
import { Products } from '../Products';
import { PartnerLogoWall } from '../PartnerLogoWall';
import { SERVICES } from '@/src/lib/content/services';
import { PRODUCTS } from '@/src/lib/content/products';
import { PARTNERS } from '@/src/lib/content/partners';

describe('home sections', () => {
  it('ServicesGrid shows every service and links the ones with an href', () => {
    renderWithProviders(<ServicesGrid />);
    for (const service of SERVICES) {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    }
    const linked = SERVICES.filter((s) => s.href);
    for (const service of linked) {
      expect(screen.getByRole('link', { name: service.name })).toHaveAttribute(
        'href',
        service.href!,
      );
    }
  });

  it('Products renders one card per product', () => {
    renderWithProviders(<Products />);
    for (const product of PRODUCTS) {
      expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    }
  });

  it('PartnerLogoWall renders an image per partner with its name as alt', () => {
    renderWithProviders(<PartnerLogoWall />);
    for (const partner of PARTNERS) {
      expect(screen.getByRole('img', { name: partner.name })).toBeInTheDocument();
    }
  });
});
