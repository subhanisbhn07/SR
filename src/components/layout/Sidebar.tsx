import React from 'react';
import { motion } from 'framer-motion';
import { Home, Brain, Target, TrendingUp, Users, Award, Calendar, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen = true,
  onClose,
}) => {
  const { mode } = useAuthStore();
  
  const consumerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sessions', label: 'Sessions', icon: Brain },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];
  
  const enterpriseTabs = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'team', label: 'Team Wellness', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'programs', label: 'Programs', icon: Brain },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];
  
  const tabs = mode === 'consumer' ? consumerTabs : enterpriseTabs;
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-neutral-200 z-50 lg:relative lg:top-0 lg:h-screen lg:translate-x-0"
      >
        <div className="p-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  onClose?.();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-white">
            <h3 className="font-semibold text-sm mb-1">
              {mode === 'consumer' ? 'Upgrade to Premium' : 'Enterprise Plus'}
            </h3>
            <p className="text-xs opacity-90 mb-3">
              {mode === 'consumer' 
                ? 'Unlock advanced sessions and personalized insights'
                : 'Advanced analytics and custom integrations'
              }
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};