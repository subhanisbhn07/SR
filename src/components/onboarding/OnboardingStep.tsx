import React from 'react';

interface OnboardingStepProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-3">
          {title}
        </h1>
        <p className="text-neutral-400 text-lg">
          {subtitle}
        </p>
      </div>
      
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
};
