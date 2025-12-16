import React from 'react';
import { motion } from 'framer-motion';
import { Home, Headphones, Heart, PenTool, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'daily-audio', label: 'Daily Audio', icon: Headphones },
  { id: 'mood', label: 'Mood', icon: Heart },
  { id: 'journal', label: 'Journal', icon: PenTool },
  { id: 'profile', label: 'Profile', icon: User }
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-neumo-bg shadow-neumo z-30 md:hidden"
        >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center py-2 px-3 rounded-neumo transition-all duration-200 ${
                isActive 
                  ? 'bg-neumo-bg shadow-neumo-inset text-neumo-text' 
                  : 'text-neumo-text-secondary hover:text-neumo-text'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-neumo-text' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-neumo-accent rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
