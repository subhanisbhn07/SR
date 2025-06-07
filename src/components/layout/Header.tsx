import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, mode, switchMode, logout } = useAuthStore();
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg border-b border-neutral-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-neutral-100 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <h1 className="text-xl font-bold text-neutral-900">SignRoad</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  <Button
                    variant={mode === 'consumer' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => switchMode('consumer')}
                  >
                    Personal
                  </Button>
                  <Button
                    variant={mode === 'enterprise' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => switchMode('enterprise')}
                  >
                    Enterprise
                  </Button>
                </div>
                
                <button className="p-2 rounded-lg hover:bg-neutral-100 relative">
                  <Bell className="w-5 h-5 text-neutral-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></div>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                    <p className="text-xs text-neutral-500">{user.streak} day streak 🔥</p>
                  </div>
                  
                  <div className="relative group">
                    <button className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </button>
                    
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-2">
                        <button className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-lg"
                        >
                          Sign out
                        </button>
                      </div>
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