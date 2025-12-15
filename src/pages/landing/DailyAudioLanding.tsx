import React from 'react';
import { FeatureLandingPage } from './FeatureLandingPage';

interface DailyAudioLandingProps {
  onGetStarted: () => void;
}

export const DailyAudioLanding: React.FC<DailyAudioLandingProps> = ({ onGetStarted }) => {
  return <FeatureLandingPage affinityType="daily-audio" onGetStarted={onGetStarted} />;
};
