import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Heart, PenTool, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'courses', label: 'Courses', icon: BookOpen },
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
      className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-700/50 z-30 md:hidden"
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
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-accent-400' 
                  : 'text-neutral-400 hover:text-neutral-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-accent-400' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-400 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
