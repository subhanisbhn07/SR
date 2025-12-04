import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';

export const DarkModeHeader: React.FC = () => {
  const { user } = useAuthStore();

  return (
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

        {/* Right Side */}
        <div className="flex items-center space-x-3">
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
  );
};
