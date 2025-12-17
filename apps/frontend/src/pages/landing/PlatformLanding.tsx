import React from 'react';
import { FeatureLandingPage } from './FeatureLandingPage';

interface PlatformLandingProps {
  onGetStarted: () => void;
}

export const PlatformLanding: React.FC<PlatformLandingProps> = ({ onGetStarted }) => {
  return <FeatureLandingPage affinityType="platform" onGetStarted={onGetStarted} />;
};
