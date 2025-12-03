import React from 'react';
import { motion } from 'framer-motion';
import { Map, BookOpen, Flame, User } from 'lucide-react';

export type JourneyTab = 'road' | 'journal' | 'campfire' | 'profile';

interface JourneyBottomNavProps {
  activeTab: JourneyTab;
  onTabChange: (tab: JourneyTab) => void;
  tribeNotification?: boolean;
}

const tabs: { id: JourneyTab; label: string; icon: React.ReactNode }[] = [
  { id: 'road', label: 'Road', icon: <Map className="w-6 h-6" /> },
  { id: 'journal', label: 'Journal', icon: <BookOpen className="w-6 h-6" /> },
  { id: 'campfire', label: 'Campfire', icon: <Flame className="w-6 h-6" /> },
  { id: 'profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
];

export const JourneyBottomNav: React.FC<JourneyBottomNavProps> = ({
  activeTab,
  onTabChange,
  tribeNotification,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const hasNotification = tab.id === 'campfire' && tribeNotification;

            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center py-2 px-4 rounded-xl transition-colors ${
                  isActive ? 'text-amber-400' : 'text-white/50 hover:text-white/70'
                }`}
              >
                <div className="relative">
                  {tab.icon}
                  {hasNotification && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
                    />
                  )}
                </div>
                <span className="text-xs mt-1">{tab.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-amber-500/10 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-gray-900" />
    </nav>
  );
};
