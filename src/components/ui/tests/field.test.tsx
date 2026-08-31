import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/src/test/render';
import { FieldLabel } from '../field';

describe('FieldLabel', () => {
  it('renders an asterisk when required', () => {
    renderWithProviders(
      <FieldLabel htmlFor="name" required>
        Name
      </FieldLabel>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
  });

  it('renders "(optional)" when not required', () => {
    renderWithProviders(
      <FieldLabel htmlFor="middleName" required={false}>
        Middle name
      </FieldLabel>,
    );

    expect(screen.getByText('(optional)')).toBeInTheDocument();
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
});
