import React from 'react';
import { FeatureLandingPage } from './FeatureLandingPage';

interface DailyMessageLandingProps {
  onGetStarted: () => void;
}

export const DailyMessageLanding: React.FC<DailyMessageLandingProps> = ({ onGetStarted }) => {
  return <FeatureLandingPage affinityType="daily-message" onGetStarted={onGetStarted} />;
};
