import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Sparkles, Building2, ChevronDown, Home, BookOpen, Heart, PenTool } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LanternIcon } from '../ui/LanternIcon';
import { ForTeamsLanding } from '../enterprise/ForTeamsLanding';
import { B2BLanding } from '../enterprise/B2BLanding';

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
  const [showForTeams, setShowForTeams] = useState(false);
  const [showB2B, setShowB2B] = useState(false);
  const [showEnterpriseMenu, setShowEnterpriseMenu] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-700/50"
      >
        <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <h1 className="text-xl font-bold text-neutral-100">SignRoad</h1>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <nav className="hidden md:flex items-center space-x-1">
                      {desktopNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => onTabChange?.(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-accent-500/20 text-accent-400'
                                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                    </nav>

                    {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Enterprise Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowEnterpriseMenu(!showEnterpriseMenu)}
                onBlur={() => setTimeout(() => setShowEnterpriseMenu(false), 150)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-medium text-blue-400">Enterprise</span>
                <ChevronDown className={`w-3 h-3 text-blue-400 transition-transform ${showEnterpriseMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showEnterpriseMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setShowForTeams(true);
                      setShowEnterpriseMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-neutral-200 hover:bg-neutral-700 transition-colors flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-blue-400" />
                    For Teams
                    <span className="text-xs text-neutral-500 ml-auto">Pricing</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowB2B(true);
                      setShowEnterpriseMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-neutral-200 hover:bg-neutral-700 transition-colors flex items-center gap-2 border-t border-neutral-700"
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    Enterprise Sales
                    <span className="text-xs text-emerald-400 ml-auto">Book a Call</span>
                  </button>
                </div>
              )}
            </div>

            {user && (
              <>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-800/50">
                  <LanternIcon health={user.lanternHealth} size="sm" />
                  <span className="text-xs font-medium text-neutral-300">{user.lanternHealth}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-500/20">
                  <Sparkles className="w-4 h-4 text-accent-400" />
                  <span className="text-xs font-medium text-accent-400">{user.sparks}</span>
                </div>
              </>
            )}

            <button className="p-2 rounded-lg hover:bg-neutral-800 transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-neutral-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"></div>
            </button>
            
            <button className="w-8 h-8 rounded-full overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-accent-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent-600" />
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.header>

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
