import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Sparkles, Building2, ChevronDown, Home, BookOpen, Heart, PenTool, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { LanternIcon } from '../ui/LanternIcon';
import { ThemeToggle } from '../ui/ThemeToggle';
import { ForTeamsLanding } from '../enterprise/ForTeamsLanding';
import { B2BLanding } from '../enterprise/B2BLanding';
import { MobileSidebar } from './MobileSidebar';

interface DarkModeHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const desktopNavItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'mood', label: 'Mood', icon: Heart },
  { id: 'journal', label: 'Journal', icon: PenTool },
];

export const DarkModeHeader: React.FC<DarkModeHeaderProps> = ({ activeTab = 'home', onTabChange }) => {
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const [showForTeams, setShowForTeams] = useState(false);
  const [showB2B, setShowB2B] = useState(false);
  const [showEnterpriseMenu, setShowEnterpriseMenu] = useState(false);
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
            {/* Enterprise Dropdown - Desktop only */}
            <div className="relative">
              <button
                onClick={() => setShowEnterpriseMenu(!showEnterpriseMenu)}
                onBlur={() => setTimeout(() => setShowEnterpriseMenu(false), 150)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                <Building2 className="w-3.5 h-3.5 text-neumo-text-secondary" />
                <span className="text-xs font-medium text-neumo-text-secondary">Enterprise</span>
                <ChevronDown className={`w-3 h-3 text-neumo-text-secondary transition-transform ${showEnterpriseMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showEnterpriseMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-neumo-bg rounded-neumo shadow-neumo-lg overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setShowForTeams(true);
                      setShowEnterpriseMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-neumo-text hover:bg-neumo-border transition-colors flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-neumo-text-secondary" />
                    For Teams
                    <span className="text-xs text-neumo-text-muted ml-auto">Pricing</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowB2B(true);
                      setShowEnterpriseMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-neumo-text hover:bg-neumo-border transition-colors flex items-center gap-2 border-t border-neumo-border"
                  >
                    <Building2 className="w-4 h-4 text-neumo-text-secondary" />
                    Enterprise Sales
                    <span className="text-xs text-neumo-text-secondary ml-auto">Book a Call</span>
                  </button>
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
        onShowForTeams={() => setShowForTeams(true)}
        onShowB2B={() => setShowB2B(true)}
      />

      {/* For Teams Modal */}
      <AnimatePresence>
        {showForTeams && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <ForTeamsLanding isModal onClose={() => setShowForTeams(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* B2B Landing Modal */}
      <AnimatePresence>
        {showB2B && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <B2BLanding isModal onClose={() => setShowB2B(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
