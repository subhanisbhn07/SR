import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptState {
  isInstallable: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  promptInstall: () => Promise<void>;
  dismissPrompt: () => void;
  showIOSInstructions: boolean;
  setShowIOSInstructions: (show: boolean) => void;
}

export function useInstallPrompt(): InstallPromptState {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as { standalone?: boolean }).standalone === true;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else if (isIOS && !isStandalone) {
      setShowIOSInstructions(true);
    }
  };

  const dismissPrompt = () => {
    setIsInstallable(false);
    setShowIOSInstructions(false);
    localStorage.setItem('signroad_install_dismissed', 'true');
  };

  return {
    isInstallable: isInstallable || (isIOS && !isStandalone),
    isIOS,
    isStandalone,
    promptInstall,
    dismissPrompt,
    showIOSInstructions,
    setShowIOSInstructions,
  };
}
