import React from 'react';
import { FeatureLandingPage } from './FeatureLandingPage';

interface SleepOrbLandingProps {
  onGetStarted: () => void;
}

export const SleepOrbLanding: React.FC<SleepOrbLandingProps> = ({ onGetStarted }) => {
  return <FeatureLandingPage affinityType="sleep-orb" onGetStarted={onGetStarted} />;
};
