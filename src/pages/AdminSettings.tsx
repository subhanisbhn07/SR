import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Calendar, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useConfigStore } from '../store/configStore';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';

export const AdminSettings: React.FC = () => {
  const { freeTrialDays, setFreeTrialDays } = useConfigStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  const trialOptions = [7, 14, 21, 30];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 mb-6 ${
            theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
          } transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 ${
            theme === 'dark' 
              ? 'bg-neutral-800 border border-neutral-700' 
              : 'bg-white border border-neutral-200 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-accent-500/20' : 'bg-accent-100'
            }`}>
              <Settings className={`w-6 h-6 ${theme === 'dark' ? 'text-accent-400' : 'text-accent-600'}`} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Admin Settings
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Configure app settings (local only)
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl mb-6 ${
            theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
              Note: These settings are stored locally on this device only. They will not sync across devices or users.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                <Calendar className="w-4 h-4" />
                Free Trial Days
              </label>
              <div className="grid grid-cols-4 gap-2">
                {trialOptions.map((days) => (
                  <button
                    key={days}
                    onClick={() => setFreeTrialDays(days)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      freeTrialDays === days
                        ? 'bg-accent-500 text-white'
                        : theme === 'dark'
                          ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Currently set to {freeTrialDays} free days for new users
              </p>
            </div>

            <div className={`border-t ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'} pt-6`}>
              <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    theme === 'light'
                      ? 'bg-accent-500 text-white'
                      : theme === 'dark'
                        ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    theme === 'dark' && freeTrialDays !== 7
                      ? 'bg-accent-500 text-white'
                      : theme === 'dark'
                        ? freeTrialDays === 7 
                          ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                          : 'bg-accent-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  } ${theme === 'dark' ? 'bg-accent-500 text-white' : ''}`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <p className={`text-center text-xs mt-6 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
          SignRoad Admin Panel v1.0 (Prototype)
        </p>
      </div>
    </div>
  );
};
