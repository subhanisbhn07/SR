import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Calendar, Sun, Moon, ArrowLeft, Monitor, Tablet, Smartphone, LayoutGrid, RotateCcw, Database, Key, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useConfigStore, CardVisibilitySettings } from '../store/configStore';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';
import { saveSupabaseConfig, getSupabaseConfigValues, clearSupabaseConfig, isSupabaseConfigured, getSupabase } from '../lib/supabase';

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

  // Supabase configuration state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [showAnonKey, setShowAnonKey] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<'unconfigured' | 'configured' | 'testing' | 'connected' | 'error'>('unconfigured');
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  // Load existing Supabase config on mount
  useEffect(() => {
    const config = getSupabaseConfigValues();
    if (config.url) setSupabaseUrl(config.url);
    if (config.anonKey) setSupabaseAnonKey(config.anonKey);
    if (isSupabaseConfigured()) {
      setSupabaseStatus('configured');
    }
  }, []);

  const handleSaveSupabaseConfig = async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setSupabaseError('Both URL and Anon Key are required');
      return;
    }

    setSupabaseStatus('testing');
    setSupabaseError(null);

    try {
      // Save config first
      saveSupabaseConfig(supabaseUrl, supabaseAnonKey);
      
      // Test connection
      const supabase = getSupabase();
      if (supabase) {
        const { error } = await supabase.from('users').select('count').limit(1);
        if (error && !error.message.includes('does not exist')) {
          // Table might not exist yet, but connection works
          if (error.message.includes('Invalid API key') || error.message.includes('Invalid URL')) {
            throw new Error(error.message);
          }
        }
        setSupabaseStatus('connected');
      } else {
        setSupabaseStatus('configured');
      }
    } catch (err) {
      setSupabaseError(err instanceof Error ? err.message : 'Connection failed');
      setSupabaseStatus('error');
    }
  };

  const handleClearSupabaseConfig = () => {
    clearSupabaseConfig();
    setSupabaseUrl('');
    setSupabaseAnonKey('');
    setSupabaseStatus('unconfigured');
    setSupabaseError(null);
  };

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

        {/* Supabase Configuration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`rounded-2xl p-6 mt-6 ${
            theme === 'dark' 
              ? 'bg-neutral-800 border border-neutral-700' 
              : 'bg-white border border-neutral-200 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
            }`}>
              <Database className={`w-6 h-6 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Backend Configuration
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Connect to Supabase for user authentication and data persistence
              </p>
            </div>
            <div className="flex items-center gap-2">
              {supabaseStatus === 'connected' && (
                <span className="flex items-center gap-1 text-emerald-500 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Connected
                </span>
              )}
              {supabaseStatus === 'configured' && (
                <span className="flex items-center gap-1 text-yellow-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Configured
                </span>
              )}
              {supabaseStatus === 'error' && (
                <span className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Error
                </span>
              )}
              {supabaseStatus === 'testing' && (
                <span className="flex items-center gap-1 text-blue-500 text-sm animate-pulse">
                  Testing...
                </span>
              )}
            </div>
          </div>

          {supabaseStatus === 'unconfigured' && (
            <div className={`p-4 rounded-xl mb-6 ${
              theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                <strong>Getting Started:</strong> Create a free Supabase project at{' '}
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
                  supabase.com
                </a>
                , then enter your project URL and anon key below.
              </p>
            </div>
          )}

          {supabaseError && (
            <div className={`p-4 rounded-xl mb-6 ${
              theme === 'dark' ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                <strong>Error:</strong> {supabaseError}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                <Database className="w-4 h-4" />
                Supabase URL
              </label>
              <input
                type="url"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  theme === 'dark'
                    ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-emerald-500'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-emerald-500'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
              />
            </div>

            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                <Key className="w-4 h-4" />
                Anon Key (Public)
              </label>
              <div className="relative">
                <input
                  type={showAnonKey ? 'text' : 'password'}
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-emerald-500'
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-emerald-500'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                />
                <button
                  type="button"
                  onClick={() => setShowAnonKey(!showAnonKey)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${
                    theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {showAnonKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                This is the public anon key, safe to use in browser apps
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveSupabaseConfig}
                disabled={supabaseStatus === 'testing'}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  supabaseStatus === 'testing'
                    ? 'bg-neutral-400 text-white cursor-not-allowed'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                {supabaseStatus === 'testing' ? 'Testing Connection...' : 'Save & Test Connection'}
              </button>
              {(supabaseStatus === 'configured' || supabaseStatus === 'connected' || supabaseStatus === 'error') && (
                <button
                  onClick={handleClearSupabaseConfig}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    theme === 'dark'
                      ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {supabaseStatus === 'connected' && (
            <div className={`mt-6 p-4 rounded-xl ${
              theme === 'dark' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                <strong>Next Steps:</strong> Run the database migration SQL in your Supabase SQL Editor to create the required tables. 
                You can find the schema in <code className="px-1 py-0.5 rounded bg-black/10">src/types/database.ts</code>.
              </p>
            </div>
          )}
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
