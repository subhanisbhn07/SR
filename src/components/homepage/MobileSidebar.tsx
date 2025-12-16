import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Headphones, Heart, PenTool, User, Settings, HelpCircle, LogOut, Compass } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LanternIcon } from '../ui/LanternIcon';

interface LandingPageRoute {
  path: string;
  label: string;
  description: string;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  landingPageRoutes?: LandingPageRoute[];
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'daily-audio', label: 'Daily Audio', icon: Headphones },
  { id: 'mood', label: 'Mood', icon: Heart },
  { id: 'journal', label: 'Journal', icon: PenTool },
  { id: 'profile', label: 'Profile', icon: User },
];

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  activeTab = 'home',
  onTabChange,
  landingPageRoutes = [],
}) => {
  const { user, logout } = useAuthStore();

  const handleNavClick = (tabId: string) => {
    onTabChange?.(tabId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neumo-text/30 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-neumo-bg z-50 flex flex-col shadow-neumo-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neumo-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neumo-bg rounded-neumo flex items-center justify-center shadow-neumo-sm">
                  <span className="text-neumo-text font-bold text-lg">S</span>
                </div>
                <span className="font-semibold text-neumo-text">SignRoad</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                <X className="w-5 h-5 text-neumo-text-secondary" />
              </button>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b border-neumo-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-neumo-bg shadow-neumo-sm flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-neumo-text-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-neumo-text">{user.name}</p>
                    <p className="text-sm text-neumo-text-secondary">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm">
                    <LanternIcon health={user.lanternHealth} size="sm" />
                    <span className="text-sm font-medium text-neumo-text-secondary">{user.lanternHealth}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm">
                    <span className="text-sm">✨</span>
                    <span className="text-sm font-medium text-neumo-text-secondary">{user.sparks}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="px-3 mb-2">
                <p className="text-xs font-medium text-neumo-text-muted uppercase tracking-wider px-3">Navigation</p>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                      isActive
                        ? 'bg-neumo-bg shadow-neumo-inset text-neumo-text border-r-2 border-neumo-accent'
                        : 'text-neumo-text-secondary hover:bg-neumo-border hover:text-neumo-text'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* Explore Features Section */}
              {landingPageRoutes.length > 0 && (
                <>
                  <div className="mt-6 px-3 mb-2">
                    <p className="text-xs font-medium text-neumo-text-muted uppercase tracking-wider px-3">Explore Features</p>
                  </div>
                  {landingPageRoutes.map((route) => (
                    <a
                      key={route.path}
                      href={route.path}
                      onClick={onClose}
                      className="w-full flex items-center gap-3 px-6 py-3 text-neumo-text-secondary hover:bg-neumo-border hover:text-neumo-text transition-colors"
                    >
                      <Compass className="w-5 h-5 text-neumo-text-secondary" />
                      <span className="font-medium">{route.label}</span>
                      <span className="ml-auto text-xs text-neumo-text-muted">{route.description}</span>
                    </a>
                  ))}
                </>
              )}

              {/* Settings Section */}
              <div className="mt-6 px-3 mb-2">
                <p className="text-xs font-medium text-neumo-text-muted uppercase tracking-wider px-3">More</p>
              </div>
              <button
                onClick={onClose}
                className="w-full flex items-center gap-3 px-6 py-3 text-neumo-text-secondary hover:bg-neumo-border hover:text-neumo-text transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
              <button
                onClick={onClose}
                className="w-full flex items-center gap-3 px-6 py-3 text-neumo-text-secondary hover:bg-neumo-border hover:text-neumo-text transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Help & Support</span>
              </button>
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t border-neumo-border">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
