import { render, screen } from '@testing-library/react';
import Background from 'components/Background';
import { describe, it, expect } from 'vitest';

describe('Background component', () => {
  it('renders a background video when type is "video"', () => {
    render(<Background type="video" src="/video.mp4" />);
    const video = screen.getByTestId('background-video');
    expect(video).toBeInTheDocument();
    expect(video.querySelector('source')).toHaveAttribute('src', '/video.mp4');
    expect(video.querySelector('source')).toHaveAttribute('type', 'video/mp4');
  });
  it('renders a background image when type is "image"', () => {
    render(<Background type="image" src="/test-image.jpg" />);
    const image = screen.getByTestId('background-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});
