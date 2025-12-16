import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Sparkles, ChevronDown, Home, Headphones, Heart, PenTool, Menu, Compass } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { LanternIcon } from '../ui/LanternIcon';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MobileSidebar } from './MobileSidebar';

interface DarkModeHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const desktopNavItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'daily-audio', label: 'Daily Audio', icon: Headphones },
  { id: 'mood', label: 'Mood', icon: Heart },
  { id: 'journal', label: 'Journal', icon: PenTool },
];

// Landing page routes for dropdown navigation
const landingPageRoutes = [
  { path: '/universe-receipts', label: 'Universe Receipts', description: 'Proof when it manifests' },
  { path: '/daily-message', label: 'Daily Message', description: 'Grounded daily guidance' },
  { path: '/daily-audio', label: 'Daily Audio', description: '10-minute sessions' },
  { path: '/sleep-orb', label: 'Sleep Orb', description: '12 soundscapes for rest' },
];

export const DarkModeHeader: React.FC<DarkModeHeaderProps> = ({ activeTab = 'home', onTabChange }) => {
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      {/* Neumorphic Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-neumo-bg shadow-neumo-sm"
      >
        <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-neumo-bg rounded-neumo flex items-center justify-center shadow-neumo-sm">
                        <span className="text-neumo-text font-bold text-lg">S</span>
                      </div>
                      <h1 className="text-xl font-bold text-neumo-text">SignRoad</h1>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <nav className="hidden md:flex items-center space-x-2">
                      {desktopNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => onTabChange?.(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-neumo transition-all duration-150 ${
                              isActive
                                ? 'bg-neumo-bg shadow-neumo-inset text-neumo-text'
                                : 'bg-neumo-bg shadow-neumo-sm text-neumo-text-secondary hover:shadow-neumo-inset'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                    </nav>

                    {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
                onBlur={() => setTimeout(() => setShowFeaturesMenu(false), 150)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-neumo-text-secondary" />
                <span className="text-xs font-medium text-neumo-text-secondary">Explore</span>
                <ChevronDown className={`w-3 h-3 text-neumo-text-secondary transition-transform ${showFeaturesMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showFeaturesMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-neumo-bg rounded-neumo shadow-neumo-lg overflow-hidden z-50">
                  {landingPageRoutes.map((route, index) => (
                    <a
                      key={route.path}
                      href={route.path}
                      className={`w-full px-4 py-3 text-left text-sm text-neumo-text hover:bg-neumo-border transition-colors flex items-center justify-between ${
                        index > 0 ? 'border-t border-neumo-border' : ''
                      }`}
                    >
                      <span className="font-medium">{route.label}</span>
                      <span className="text-xs text-neumo-text-muted">{route.description}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {user && (
              <>
                <div className="flex items-center gap-1 px-2 py-1 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm">
                  <LanternIcon health={user.lanternHealth} size="sm" />
                  <span className="text-xs font-medium text-neumo-text-secondary">{user.lanternHealth}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm">
                  <Sparkles className="w-4 h-4 text-neumo-text-secondary" />
                  <span className="text-xs font-medium text-neumo-text-secondary">{user.sparks}</span>
                </div>
              </>
            )}

            <button className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all relative">
              <Bell className="w-5 h-5 text-neumo-text-secondary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neumo-accent rounded-full"></div>
            </button>
            
            <button className="w-8 h-8 rounded-full overflow-hidden shadow-neumo-sm">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-neumo-bg flex items-center justify-center">
                  <User className="w-4 h-4 text-neumo-text-secondary" />
                </div>
              )}
            </button>
          </div>

          {/* Right Side - Mobile */}
          <div className="flex md:hidden items-center space-x-2">
            {user && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm">
                <LanternIcon health={user.lanternHealth} size="sm" />
                <span className="text-xs font-medium text-neumo-text-secondary">{user.lanternHealth}</span>
              </div>
            )}
            
            <button className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all relative">
              <Bell className="w-5 h-5 text-neumo-text-secondary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neumo-accent rounded-full"></div>
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
            >
              <Menu className="w-5 h-5 text-neumo-text-secondary" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={showMobileSidebar}
        onClose={() => setShowMobileSidebar(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        landingPageRoutes={landingPageRoutes}
      />
    </>
  );
};
