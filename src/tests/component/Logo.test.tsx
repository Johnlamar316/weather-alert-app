import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from 'components/Logo';

describe('Logo component', () => {
  it('renders the logo text', () => {
    render(<Logo />);
    const text = screen.getByTestId('logo-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('National Weather Alerts');
  });
});
