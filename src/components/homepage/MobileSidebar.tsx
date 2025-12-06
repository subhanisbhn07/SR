import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, BookOpen, Heart, PenTool, User, Building2, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LanternIcon } from '../ui/LanternIcon';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onShowForTeams?: () => void;
  onShowB2B?: () => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'mood', label: 'Mood', icon: Heart },
  { id: 'journal', label: 'Journal', icon: PenTool },
  { id: 'profile', label: 'Profile', icon: User },
];

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  activeTab = 'home',
  onTabChange,
  onShowForTeams,
  onShowB2B,
}) => {
  const { user, logout } = useAuthStore();

  const handleNavClick = (tabId: string) => {
    onTabChange?.(tabId);
    onClose();
  };

  const handleEnterpriseClick = (type: 'teams' | 'b2b') => {
    onClose();
    if (type === 'teams') {
      onShowForTeams?.();
    } else {
      onShowB2B?.();
    }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-white dark:bg-neutral-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">SignRoad</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-accent-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-accent-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{user.name}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <LanternIcon health={user.lanternHealth} size="sm" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{user.lanternHealth}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-100 dark:bg-accent-500/20">
                    <span className="text-sm">✨</span>
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400">{user.sparks}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="px-3 mb-2">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-3">Navigation</p>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                      isActive
                        ? 'bg-accent-100 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 border-r-2 border-accent-500 dark:border-accent-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* Enterprise Section */}
              <div className="mt-6 px-3 mb-2">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-3">Enterprise</p>
              </div>
              <button
                onClick={() => handleEnterpriseClick('teams')}
                className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <Building2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="font-medium">For Teams</span>
                <span className="ml-auto text-xs text-neutral-500">Pricing</span>
              </button>
              <button
                onClick={() => handleEnterpriseClick('b2b')}
                className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <Building2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <span className="font-medium">Enterprise Sales</span>
                <span className="ml-auto text-xs text-emerald-500 dark:text-emerald-400">Book a Call</span>
              </button>

              {/* Settings Section */}
              <div className="mt-6 px-3 mb-2">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-3">More</p>
              </div>
              <button
                onClick={onClose}
                className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
              <button
                onClick={onClose}
                className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Help & Support</span>
              </button>
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
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
