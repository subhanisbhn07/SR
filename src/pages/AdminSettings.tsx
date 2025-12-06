import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Calendar, Sun, Moon, ArrowLeft, Monitor, Tablet, Smartphone, LayoutGrid, RotateCcw } from 'lucide-react';
import { useConfigStore, CardVisibilitySettings, CardVisibility } from '../store/configStore';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';

// Card display names for the admin panel
const cardDisplayNames: Record<keyof CardVisibilitySettings, string> = {
  heroCarousel: 'Hero Carousel',
  todayCard: 'Today Card',
  sparksRewards: 'Sparks & Rewards',
  tribesCard: 'Your Tribe',
  latestWin: 'Latest Win',
  manifestedWins: 'Manifested Wins Feed',
  personalGreeting: 'Personal Greeting',
  exploreByIntention: 'Explore by Intention',
  startYourJourney: 'Start Your Journey',
  whatOthersLove: 'What Others Love',
  editorsPicks: "Editor's Picks",
  userStories: 'User Stories',
  blogSection: 'Blog Section',
  newsletterSignup: 'Newsletter Signup',
};

export const AdminSettings: React.FC = () => {
  const { freeTrialDays, setFreeTrialDays, cardVisibility, setCardVisibility, resetCardVisibility } = useConfigStore();
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
                      ? 'bg-emerald-500 text-white'
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
                    theme === 'dark'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card Visibility Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-6 mt-6 ${
            theme === 'dark' 
              ? 'bg-neutral-800 border border-neutral-700' 
              : 'bg-white border border-neutral-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
              }`}>
                <LayoutGrid className={`w-6 h-6 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Homepage Card Visibility
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Control which cards appear on each device
                </p>
              </div>
            </div>
            <button
              onClick={resetCardVisibility}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
          </div>

          {/* Device Legend */}
          <div className={`flex items-center gap-6 mb-4 pb-4 border-b ${
            theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'
          }`}>
            <div className="flex items-center gap-2">
              <Monitor className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Desktop</span>
            </div>
            <div className="flex items-center gap-2">
              <Tablet className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Tablet</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Mobile</span>
            </div>
          </div>

          {/* Card Visibility Grid */}
          <div className="space-y-3">
            {(Object.keys(cardVisibility) as Array<keyof CardVisibilitySettings>).map((cardId) => (
              <div
                key={cardId}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-50'
                }`}
              >
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {cardDisplayNames[cardId]}
                </span>
                <div className="flex items-center gap-2">
                  {/* Desktop Toggle */}
                  <button
                    onClick={() => setCardVisibility(cardId, 'desktop', !cardVisibility[cardId].desktop)}
                    className={`p-2 rounded-lg transition-colors ${
                      cardVisibility[cardId].desktop
                        ? 'bg-emerald-500 text-white'
                        : theme === 'dark'
                          ? 'bg-neutral-600 text-neutral-400'
                          : 'bg-neutral-200 text-neutral-400'
                    }`}
                    title={`Desktop: ${cardVisibility[cardId].desktop ? 'Visible' : 'Hidden'}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  {/* Tablet Toggle */}
                  <button
                    onClick={() => setCardVisibility(cardId, 'tablet', !cardVisibility[cardId].tablet)}
                    className={`p-2 rounded-lg transition-colors ${
                      cardVisibility[cardId].tablet
                        ? 'bg-teal-500 text-white'
                        : theme === 'dark'
                          ? 'bg-neutral-600 text-neutral-400'
                          : 'bg-neutral-200 text-neutral-400'
                    }`}
                    title={`Tablet: ${cardVisibility[cardId].tablet ? 'Visible' : 'Hidden'}`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  {/* Mobile Toggle */}
                  <button
                    onClick={() => setCardVisibility(cardId, 'mobile', !cardVisibility[cardId].mobile)}
                    className={`p-2 rounded-lg transition-colors ${
                      cardVisibility[cardId].mobile
                        ? 'bg-gold-500 text-neutral-900'
                        : theme === 'dark'
                          ? 'bg-neutral-600 text-neutral-400'
                          : 'bg-neutral-200 text-neutral-400'
                    }`}
                    title={`Mobile: ${cardVisibility[cardId].mobile ? 'Visible' : 'Hidden'}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-4 p-3 rounded-xl ${
            theme === 'dark' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'
          }`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
              <strong>Tip:</strong> Click the device icons to toggle visibility. Green = Desktop, Teal = Tablet, Gold = Mobile.
            </p>
          </div>
        </motion.div>

        <p className={`text-center text-xs mt-6 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
          SignRoad Admin Panel v2.0 (Prototype)
        </p>
      </div>
    </div>
  );
};
