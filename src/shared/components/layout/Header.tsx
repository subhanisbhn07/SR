import { motion } from 'framer-motion';
import { User, Settings, BookOpen, ShoppingBag, Globe, Trophy } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useJourneyStore } from '../../../features/journey/store/journeyStore';
import { LanternWidget } from '../../../features/gamification/components/LanternWidget';
import { SparksCounter } from '../../../features/gamification/components/SparksCounter';
import { StreakDisplay } from '../../../features/gamification/components/StreakDisplay';

interface HeaderProps {
  onLogClick?: () => void;
  onShopClick?: () => void;
  onFeedClick?: () => void;
  onHallOfFameClick?: () => void;
}

export const Header = ({ onLogClick, onShopClick, onFeedClick, onHallOfFameClick }: HeaderProps) => {
  const { user, logout } = useAuthStore();
  const { userProgress } = useJourneyStore();
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-800 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SignRoad</h1>
              <p className="text-xs text-neutral-400">Day {userProgress.currentStep}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="hidden md:block">
                  <StreakDisplay />
                </div>

                <LanternWidget />
                
                <SparksCounter />

                {onHallOfFameClick && userProgress.completedSteps.length >= 365 && (
                  <button
                    onClick={onHallOfFameClick}
                    className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    title="Hall of Fame"
                  >
                    <Trophy className="w-5 h-5 text-accent-500 hover:text-accent-400 transition-colors" />
                  </button>
                )}

                {onFeedClick && (
                  <button
                    onClick={onFeedClick}
                    className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    title="Global Feed"
                  >
                    <Globe className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                )}

                {onShopClick && (
                  <button
                    onClick={onShopClick}
                    className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    title="Cosmetics Shop"
                  >
                    <ShoppingBag className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                )}

                {onLogClick && (
                  <button
                    onClick={onLogClick}
                    className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    title="Traveler's Log"
                  >
                    <BookOpen className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                )}
                
                <div className="relative group">
                  <button className="w-9 h-9 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                    <User className="w-5 h-5 text-primary-400" />
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 rounded-xl shadow-lg border border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-neutral-700 mb-2">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-neutral-400">{user.email}</p>
                      </div>
                      <button className="w-full text-left px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-700 rounded-lg flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
