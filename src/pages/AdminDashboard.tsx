import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Users, LayoutDashboard, Home, Sparkles, 
  ArrowLeft, Menu, X, Calendar, Sun, Moon, Monitor, 
  Tablet, Smartphone, LayoutGrid, RotateCcw, Eye, EyeOff,
  Search, Filter, MoreVertical, Edit, Trash2, UserPlus,
  TrendingUp, Activity, Clock, Zap
} from 'lucide-react';
import { useConfigStore, CardVisibilitySettings } from '../store/configStore';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';

type AdminSection = 'overview' | 'users' | 'homepage' | 'features' | 'settings';

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

const mockUsers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', subscription: 'premium', road: 'Sleep', streak: 21, sparks: 450, lastActive: '2 hours ago', status: 'active' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', subscription: 'free', road: 'Abundance', streak: 7, sparks: 120, lastActive: '1 day ago', status: 'active' },
  { id: 3, name: 'Elena Rodriguez', email: 'elena@example.com', subscription: 'premium', road: 'Anxiety', streak: 45, sparks: 890, lastActive: '5 mins ago', status: 'active' },
  { id: 4, name: 'James Wilson', email: 'james@example.com', subscription: 'free', road: 'Relationships', streak: 3, sparks: 45, lastActive: '3 days ago', status: 'inactive' },
  { id: 5, name: 'Lisa Park', email: 'lisa@example.com', subscription: 'premium', road: 'Productivity', streak: 60, sparks: 1200, lastActive: '1 hour ago', status: 'active' },
];

const mockFeatures = [
  { id: 'voice_ui', name: 'Voice UI', description: 'Audio meditation player with orb visualization', enabled: true, category: 'core' },
  { id: 'tribes', name: 'Tribes', description: '5-person accountability groups', enabled: true, category: 'social' },
  { id: 'universe_receipt', name: 'Universe Receipt', description: 'Shareable manifestation probability cards', enabled: true, category: 'viral' },
  { id: 'sign_challenges', name: 'Sign Challenges', description: 'Daily sign spotting challenges', enabled: true, category: 'core' },
  { id: 'dark_mode', name: 'Dark Mode', description: 'Moon mode theme toggle', enabled: true, category: 'ui' },
  { id: 'newsletter', name: 'Newsletter Signup', description: 'Email subscription for The Inner Signal', enabled: true, category: 'marketing' },
  { id: 'b2b_landing', name: 'B2B Landing Page', description: 'Enterprise sales landing page', enabled: true, category: 'enterprise' },
  { id: 'admin_panel', name: 'Admin Panel', description: 'Admin dashboard for platform management', enabled: true, category: 'admin' },
];

export const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { freeTrialDays, setFreeTrialDays, cardVisibility, setCardVisibility, resetCardVisibility } = useConfigStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  const trialOptions = [7, 14, 21, 30];

  const sidebarItems = [
    { id: 'overview' as AdminSection, label: 'Overview', icon: LayoutDashboard },
    { id: 'users' as AdminSection, label: 'User Management', icon: Users },
    { id: 'homepage' as AdminSection, label: 'Homepage', icon: Home },
    { id: 'features' as AdminSection, label: 'Features', icon: Sparkles },
    { id: 'settings' as AdminSection, label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Users', value: '12,847', change: '+12%', icon: Users, color: 'bg-emerald-500' },
    { label: 'Active Today', value: '3,421', change: '+8%', icon: Activity, color: 'bg-teal-500' },
    { label: 'Avg. Streak', value: '14 days', change: '+3%', icon: TrendingUp, color: 'bg-gold-500' },
    { label: 'Premium Users', value: '2,156', change: '+18%', icon: Zap, color: 'bg-purple-500' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
          Dashboard Overview
        </h2>
        <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Welcome to SignRoad Admin Panel. Monitor your platform metrics and manage content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-emerald-500 text-sm font-medium">{stat.change}</span>
            </div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{stat.value}</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New user signup', user: 'emma@example.com', time: '2 mins ago' },
              { action: 'Premium upgrade', user: 'john@example.com', time: '15 mins ago' },
              { action: 'Manifestation logged', user: 'sarah@example.com', time: '1 hour ago' },
              { action: 'Tribe created', user: 'marcus@example.com', time: '2 hours ago' },
            ].map((activity, i) => (
              <div key={i} className={`flex items-center justify-between py-2 ${i !== 3 ? 'border-b' : ''} ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-100'}`}>
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>{activity.action}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{activity.user}</p>
                </div>
                <span className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add User', icon: UserPlus, action: () => setActiveSection('users') },
              { label: 'Edit Homepage', icon: Home, action: () => setActiveSection('homepage') },
              { label: 'Toggle Features', icon: Sparkles, action: () => setActiveSection('features') },
              { label: 'Settings', icon: Settings, action: () => setActiveSection('settings') },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                  theme === 'dark' 
                    ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200' 
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            User Management
          </h2>
          <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Manage users, subscriptions, and account settings
          </p>
        </div>
        <button className="px-4 py-2 bg-accent-500 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-accent-600 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200'}`}>
          <Search className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm ${theme === 'dark' ? 'text-white placeholder-neutral-500' : 'text-neutral-900 placeholder-neutral-400'}`}
          />
        </div>
        <button className={`px-4 py-2 rounded-xl flex items-center gap-2 ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700 text-neutral-300' : 'bg-white border border-neutral-200 text-neutral-600'}`}>
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}>
        <table className="w-full">
          <thead className={`${theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-50'}`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>User</th>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Subscription</th>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Road</th>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Streak</th>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Sparks</th>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Status</th>
              <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {mockUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
              <tr key={user.id} className={`${theme === 'dark' ? 'hover:bg-neutral-700/30' : 'hover:bg-neutral-50'} transition-colors`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white text-sm font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{user.name}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.subscription === 'premium' 
                      ? 'bg-gold-100 text-gold-700 dark:bg-gold-500/20 dark:text-gold-400' 
                      : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                  }`}>
                    {user.subscription}
                  </span>
                </td>
                <td className={`px-4 py-4 text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>{user.road}</td>
                <td className={`px-4 py-4 text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>{user.streak} days</td>
                <td className={`px-4 py-4 text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>{user.sparks}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                      : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className={`p-1.5 rounded-lg ${theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-colors`}>
                      <Edit className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
                    </button>
                    <button className={`p-1.5 rounded-lg ${theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-colors`}>
                      <Trash2 className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
          <strong>Note:</strong> This is a mock user management interface. In production, this would connect to your backend database for real user data management.
        </p>
      </div>
    </div>
  );

  const renderHomepage = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
          Homepage Management
        </h2>
        <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Control which cards appear on the homepage for each device type
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-6 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <span className="text-sm">Desktop</span>
          </div>
          <div className="flex items-center gap-2">
            <Tablet className="w-4 h-4" />
            <span className="text-sm">Tablet</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm">Mobile</span>
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

      <div className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {(Object.keys(cardVisibility) as Array<keyof CardVisibilitySettings>).map((cardId) => (
            <div
              key={cardId}
              className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'hover:bg-neutral-700/30' : 'hover:bg-neutral-50'} transition-colors`}
            >
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>
                {cardDisplayNames[cardId]}
              </span>
              <div className="flex items-center gap-2">
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
      </div>
    </div>
  );

  const renderFeatures = () => {
    const [features, setFeatures] = useState(mockFeatures);
    
    const toggleFeature = (id: string) => {
      setFeatures(features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    };

    const categories = [...new Set(features.map(f => f.category))];

    return (
      <div className="space-y-6">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            Feature Management
          </h2>
          <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Enable or disable platform features
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}>
            <div className={`px-4 py-3 ${theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-50'}`}>
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {category}
              </h3>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {features.filter(f => f.category === category).map((feature) => (
                <div
                  key={feature.id}
                  className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'hover:bg-neutral-700/30' : 'hover:bg-neutral-50'} transition-colors`}
                >
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>
                      {feature.name}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      {feature.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      feature.enabled ? 'bg-emerald-500' : theme === 'dark' ? 'bg-neutral-600' : 'bg-neutral-300'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      feature.enabled ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
            <strong>Note:</strong> Feature toggles are stored locally. In production, these would be managed via feature flags in your backend.
          </p>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
          Platform Settings
        </h2>
        <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Configure global platform settings
        </p>
      </div>

      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200 shadow-sm'}`}>
        <div className="space-y-6">
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
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
            <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              Admin Theme
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
      </div>

      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
          <strong>Note:</strong> Settings are stored locally on this device only. They will not sync across devices or users.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'homepage': return renderHomepage();
      case 'features': return renderFeatures();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 ${theme === 'dark' ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-white border-b border-neutral-200'}`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'}`}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Admin Panel</span>
          <button
            onClick={() => navigate('/')}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${theme === 'dark' ? 'bg-neutral-800 border-r border-neutral-700' : 'bg-white border-r border-neutral-200'}`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>SignRoad</h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-accent-500 text-white'
                    : theme === 'dark'
                      ? 'text-neutral-400 hover:bg-neutral-700 hover:text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'text-neutral-400 hover:bg-neutral-700 hover:text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to App
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen pt-16 lg:pt-0`}>
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
