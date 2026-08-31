import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/src/test/render';
import { SiteHeader } from '../SiteHeader';
import { useUIStore } from '@/src/store/ui-store';

describe('SiteHeader', () => {
  beforeEach(() => {
    useUIStore.setState({ mobileNavOpen: false });
  });

  it('renders the three primary nav links', () => {
    renderWithProviders(<SiteHeader />);
    const primary = screen.getAllByRole('navigation', { name: 'Primary' })[0];
    expect(primary).toBeInTheDocument();
    for (const label of ['Home', 'About Us', 'Contact Us']) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
  });

  it('toggles the mobile nav and aria-expanded', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(useUIStore.getState().mobileNavOpen).toBe(true);
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});
