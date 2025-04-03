import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from 'components/Logo';

describe('Logo component', () => {
  it('renders the logo image with correct src and alt', () => {
    render(<Logo />);
    const image = screen.getByTestId('logo-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/logo.png');
    expect(image).toHaveAttribute('alt', 'App Logo');
  });

  it('renders the logo text', () => {
    render(<Logo />);
    const text = screen.getByTestId('logo-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('National Weather Alerts');
  });
});
