import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

// The app has no global provider stack (no Redux, no i18n, no query client) —
// state lives in Zustand stores that need no Provider. This wrapper exists as
// the single seam to add one later without touching every test.
function Wrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function renderWithProviders(
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> = {},
) {
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
