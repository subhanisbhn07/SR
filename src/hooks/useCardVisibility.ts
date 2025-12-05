import { useEffect, useState } from 'react';
import { useConfigStore, CardVisibilitySettings } from '../store/configStore';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Detect current device type based on screen width
const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const useCardVisibility = () => {
  const { cardVisibility } = useConfigStore();
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if a specific card should be visible on the current device
  const isCardVisible = (cardId: keyof CardVisibilitySettings): boolean => {
    return cardVisibility[cardId][deviceType];
  };

  return {
    isCardVisible,
    deviceType,
    cardVisibility,
  };
};
