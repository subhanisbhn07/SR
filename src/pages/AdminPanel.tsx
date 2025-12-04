import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockDashboardStats, generateMockAnalytics, AdminDashboardStats, AdminAnalytics } from '../types/admin';
import { COMPLETE_SIGNS, SignData, SIGN_CATEGORIES, SignCategory } from '../data/signs';
import { JOURNEY_100_DAYS, JOURNEY_PHASES, DayContent, JourneyPhase } from '../data/journey100';
import { generateMockTribe, generateMockTribeEvents, TribeData, TribeEvent, TRIBE_EVENT_TYPES } from '../types/tribes';

type AdminTab = 'dashboard' | 'content' | 'signs' | 'tribes' | 'users' | 'analytics';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [stats] = useState<AdminDashboardStats>(generateMockDashboardStats());
  const [analytics] = useState<AdminAnalytics>(generateMockAnalytics());
  const [selectedPhase, setSelectedPhase] = useState<JourneyPhase | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<SignCategory | 'all'>('all');
  const [mockTribe] = useState<TribeData>(generateMockTribe());
  const [tribeEvents] = useState<TribeEvent[]>(generateMockTribeEvents(mockTribe.id));

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'signs', label: 'Signs', icon: '✨' },
    { id: 'tribes', label: 'Tribes', icon: '🔥' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  const filteredDays = selectedPhase === 'all' 
    ? JOURNEY_100_DAYS 
    : JOURNEY_100_DAYS.filter(d => d.phase === selectedPhase);

  const filteredSigns = selectedCategory === 'all'
    ? COMPLETE_SIGNS
    : COMPLETE_SIGNS.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛤️</span>
            <h1 className="text-xl font-bold">SignRoad Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin User</span>
            <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm hover:bg-gray-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-[calc(100vh-64px)] p-4">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <DashboardView key="dashboard" stats={stats} />
            )}
            {activeTab === 'content' && (
              <ContentView 
                key="content" 
                days={filteredDays} 
                selectedPhase={selectedPhase}
                onPhaseChange={setSelectedPhase}
              />
            )}
            {activeTab === 'signs' && (
              <SignsView 
                key="signs" 
                signs={filteredSigns}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}
            {activeTab === 'tribes' && (
              <TribesView key="tribes" tribe={mockTribe} events={tribeEvents} />
            )}
            {activeTab === 'users' && (
              <UsersView key="users" />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsView key="analytics" analytics={analytics} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Dashboard View
function DashboardView({ stats }: { stats: AdminDashboardStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon="👥" />
        <StatCard title="Active Today" value={stats.activeToday.toLocaleString()} icon="🟢" />
        <StatCard title="Free Users" value={stats.freeUsers.toLocaleString()} icon="🆓" />
        <StatCard title="Paid Users" value={stats.paidUsers.toLocaleString()} icon="💎" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Revenue Today" value={`$${stats.revenueToday.toFixed(2)}`} icon="💰" />
        <StatCard title="Revenue Month" value={`$${stats.revenueMonth.toFixed(2)}`} icon="📈" />
        <StatCard title="Day 14 Completion" value={`${stats.completionRateDay14}%`} icon="✅" />
        <StatCard title="Conversion Rate" value={`${stats.freeToPaidConversion}%`} icon="🎯" />
      </div>

      {/* Top Signs */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Top Signs Today</h3>
          <div className="space-y-3">
            {stats.topSignsToday.map((sign, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-300">{sign.signName}</span>
                <span className="text-purple-400 font-medium">{sign.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Tribe Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total Tribes</span>
              <span className="text-amber-400 font-medium">{stats.tribeActivity.totalTribes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Active Today</span>
              <span className="text-green-400 font-medium">{stats.tribeActivity.activeTribestoday}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Avg Session</span>
              <span className="text-blue-400 font-medium">{stats.avgSessionDuration} min</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Content View
function ContentView({ 
  days, 
  selectedPhase, 
  onPhaseChange 
}: { 
  days: DayContent[]; 
  selectedPhase: JourneyPhase | 'all';
  onPhaseChange: (phase: JourneyPhase | 'all') => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
          + Add Day
        </button>
      </div>

      {/* Phase Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => onPhaseChange('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedPhase === 'all' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          All ({JOURNEY_100_DAYS.length})
        </button>
        {(Object.keys(JOURNEY_PHASES) as JourneyPhase[]).map(phase => (
          <button
            key={phase}
            onClick={() => onPhaseChange(phase)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPhase === phase ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {JOURNEY_PHASES[phase].name} ({JOURNEY_100_DAYS.filter(d => d.phase === phase).length})
          </button>
        ))}
      </div>

      {/* Days Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Day</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Phase</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Tier</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {days.slice(0, 20).map(day => (
              <tr key={day.day} className="hover:bg-gray-750">
                <td className="px-4 py-3 text-sm">{day.day}</td>
                <td className="px-4 py-3 text-sm font-medium">{day.title}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    day.phase === 'awakening' ? 'bg-blue-900 text-blue-300' :
                    day.phase === 'deepening' ? 'bg-purple-900 text-purple-300' :
                    'bg-amber-900 text-amber-300'
                  }`}>
                    {JOURNEY_PHASES[day.phase].name}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{day.audioDuration} min</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    day.isFree ? 'bg-green-900 text-green-300' : 'bg-amber-900 text-amber-300'
                  }`}>
                    {day.isFree ? 'Free' : 'Paid'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-purple-400 hover:text-purple-300 mr-3">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {days.length > 20 && (
          <div className="px-4 py-3 bg-gray-750 text-center text-sm text-gray-400">
            Showing 20 of {days.length} days. <button className="text-purple-400 hover:underline">Load more</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Signs View
function SignsView({ 
  signs, 
  selectedCategory, 
  onCategoryChange 
}: { 
  signs: SignData[]; 
  selectedCategory: SignCategory | 'all';
  onCategoryChange: (category: SignCategory | 'all') => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Signs Management</h2>
        <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
          + Add Sign
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            selectedCategory === 'all' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          All ({COMPLETE_SIGNS.length})
        </button>
        {(Object.keys(SIGN_CATEGORIES) as SignCategory[]).map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selectedCategory === category ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {SIGN_CATEGORIES[category].emoji} {SIGN_CATEGORIES[category].name}
          </button>
        ))}
      </div>

      {/* Signs Grid */}
      <div className="grid grid-cols-4 gap-4">
        {signs.map(sign => (
          <div key={sign.id} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{sign.emoji}</span>
              <div>
                <h3 className="font-medium">{sign.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  sign.rarity === 'common' ? 'bg-gray-700 text-gray-300' :
                  sign.rarity === 'rare' ? 'bg-purple-900 text-purple-300' :
                  'bg-amber-900 text-amber-300'
                }`}>
                  {sign.rarity}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-2">{sign.meaning}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Unlocks Day {sign.unlockDay}</span>
              <span>{sign.unlockDay <= 14 ? '🆓' : '💎'}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600">Edit</button>
              <button className="px-2 py-1 bg-red-900 rounded text-xs hover:bg-red-800">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Tribes View
function TribesView({ tribe, events }: { tribe: TribeData; events: TribeEvent[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tribe Management</h2>
        <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
          Rebalance Tribes
        </button>
      </div>

      {/* Tribe Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tribes" value="1,556" icon="🔥" />
        <StatCard title="Active Today" value="892" icon="🟢" />
        <StatCard title="Avg Members" value="7.2" icon="👥" />
        <StatCard title="Events Today" value="234" icon="📅" />
      </div>

      {/* Sample Tribe */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{tribe.name}</h3>
            <p className="text-sm text-gray-400">{tribe.members.length} members • {tribe.timezone}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-400">{tribe.campfireCompletionRate}%</div>
            <div className="text-xs text-gray-400">Campfire Rate</div>
          </div>
        </div>

        {/* Members */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {tribe.members.map(member => (
            <div key={member.id} className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">
                  {member.avatar === 'fox' ? '🦊' : 
                   member.avatar === 'owl' ? '🦉' : 
                   member.avatar === 'deer' ? '🦌' : 
                   member.avatar === 'raven' ? '🐦‍⬛' : 
                   member.avatar === 'wolf' ? '🐺' : 
                   member.avatar === 'bear' ? '🐻' : 
                   member.avatar === 'eagle' ? '🦅' : '🦋'}
                </span>
                <span className="text-sm font-medium truncate">{member.odonym}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Day {member.currentDay}</span>
                <span className={member.meditatedToday ? 'text-green-400' : 'text-gray-500'}>
                  {member.meditatedToday ? '✓' : '○'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tribe Events */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Tribe Events</h3>
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{TRIBE_EVENT_TYPES[event.eventType].emoji}</span>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-400">
                    {new Date(event.scheduledDate).toLocaleDateString()} • {event.participants.length} participants
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                event.status === 'upcoming' ? 'bg-blue-900 text-blue-300' :
                event.status === 'active' ? 'bg-green-900 text-green-300' :
                event.status === 'completed' ? 'bg-gray-600 text-gray-300' :
                'bg-red-900 text-red-300'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Users View
function UsersView() {
  const mockUsers = [
    { id: '1', email: 'seeker@example.com', username: 'Seeker_123', tier: 'seeker_annual', day: 45, sparks: 567 },
    { id: '2', email: 'wanderer@example.com', username: 'Wanderer_456', tier: 'free', day: 7, sparks: 85 },
    { id: '3', email: 'master@example.com', username: 'Master_789', tier: 'master_lifetime', day: 100, sparks: 2345 },
    { id: '4', email: 'newbie@example.com', username: 'Newbie_012', tier: 'free', day: 2, sparks: 25 },
    { id: '5', email: 'monthly@example.com', username: 'Monthly_345', tier: 'seeker_monthly', day: 28, sparks: 320 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">User</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Subscription</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Current Day</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Sparks</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {mockUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-750">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.tier === 'free' ? 'bg-gray-700 text-gray-300' :
                    user.tier === 'seeker_monthly' ? 'bg-blue-900 text-blue-300' :
                    user.tier === 'seeker_annual' ? 'bg-purple-900 text-purple-300' :
                    'bg-amber-900 text-amber-300'
                  }`}>
                    {user.tier.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">Day {user.day}</td>
                <td className="px-4 py-3 text-sm text-amber-400">✨ {user.sparks}</td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-purple-400 hover:text-purple-300 mr-3">View</button>
                  <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// Analytics View
function AnalyticsView({ analytics }: { analytics: AdminAnalytics }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>

      {/* Conversion Funnel */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
        <div className="flex items-end justify-between h-48">
          {[
            { label: 'Started Trial', value: analytics.conversion.startedTrial, pct: 100 },
            { label: 'Day 7', value: analytics.conversion.completedDay7, pct: 42 },
            { label: 'Day 14', value: analytics.conversion.reachedDay14, pct: 35 },
            { label: 'Converted', value: analytics.conversion.convertedToPaid, pct: 8.35 },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div 
                className="w-16 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                style={{ height: `${step.pct * 1.5}px` }}
              />
              <div className="mt-2 text-center">
                <div className="font-bold">{step.value.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{step.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold text-green-400">{analytics.conversion.conversionRate}%</span>
          <span className="text-gray-400 ml-2">Free to Paid Conversion</span>
        </div>
      </div>

      {/* Sign Analytics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Sign Logging Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Signs Logged</span>
              <span className="font-bold">{analytics.signs.totalSignsLogged.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Receipts Generated</span>
              <span className="font-bold">{analytics.signs.receiptsGenerated.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Receipts Shared</span>
              <span className="font-bold">{analytics.signs.receiptsShared.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Share Rate</span>
              <span className="font-bold text-green-400">{analytics.signs.shareRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Most Popular Signs</h3>
          <div className="space-y-3">
            {analytics.signs.mostPopularSigns.map((sign, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-4">{i + 1}.</span>
                  <span>{sign.signName}</span>
                </div>
                <span className="text-purple-400">{sign.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retention Cohorts */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Retention Cohorts</h3>
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left py-2">Cohort</th>
              <th className="text-center py-2">Day 1</th>
              <th className="text-center py-2">Day 7</th>
              <th className="text-center py-2">Day 14</th>
              <th className="text-center py-2">Day 30</th>
              <th className="text-center py-2">Day 60</th>
              <th className="text-center py-2">Day 90</th>
            </tr>
          </thead>
          <tbody>
            {analytics.retention.map((cohort, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="py-3 font-medium">{cohort.cohortMonth}</td>
                <td className="py-3 text-center text-green-400">{cohort.day1}%</td>
                <td className="py-3 text-center">{cohort.day7}%</td>
                <td className="py-3 text-center">{cohort.day14}%</td>
                <td className="py-3 text-center">{cohort.day30}%</td>
                <td className="py-3 text-center">{cohort.day60}%</td>
                <td className="py-3 text-center">{cohort.day90}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
