import React from 'react';
import { useOnboardingStore } from '../../features/onboarding/store/onboardingStore';
import { OnboardingFlow } from '../../features/onboarding/components/OnboardingFlow';

interface OnboardingGateProps {
  children: React.ReactNode;
}

export const OnboardingGate: React.FC<OnboardingGateProps> = ({ children }) => {
  const { isOnboardingComplete } = useOnboardingStore();

  if (!isOnboardingComplete) {
    return <OnboardingFlow />;
  }

  return <>{children}</>;
};
