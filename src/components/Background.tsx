import React from 'react';
import { BaseBackground, BackgroundVideo, BackgroundImage } from './common/styled';

interface BackgroundProps {
  type?: 'video' | 'image';
  src: string;
}

//Background image and video component
const Background: React.FC<BackgroundProps> = ({ type = 'image', src }) => {
  return (
    <BaseBackground>
      {type === 'video' ? (
        <BackgroundVideo
          data-testid="background-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </BackgroundVideo>
      ) : (
        <BackgroundImage data-testid="background-image" src={src} alt="background" loading="lazy" />
      )}
    </BaseBackground>
  );
};

export default Background;
