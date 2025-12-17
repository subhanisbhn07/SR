import React from 'react';
import { FeatureLandingPage } from './FeatureLandingPage';

interface UniverseReceiptsLandingProps {
  onGetStarted: () => void;
}

export const UniverseReceiptsLanding: React.FC<UniverseReceiptsLandingProps> = ({ onGetStarted }) => {
  return <FeatureLandingPage affinityType="universe-receipts" onGetStarted={onGetStarted} />;
};
