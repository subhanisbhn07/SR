import { Users, Sparkles, Flame, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Today', value: '3,241', change: '+8%', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Signs Logged', value: '45,892', change: '+23%', icon: Sparkles, color: 'bg-purple-500' },
  { label: 'Avg Lantern Health', value: '78%', change: '+5%', icon: Flame, color: 'bg-orange-500' },
];

const recentActivity = [
  { user: 'Sarah M.', action: 'Completed Day 30 meditation', time: '2 min ago' },
  { user: 'John D.', action: 'Logged a Thundered sign', time: '5 min ago' },
  { user: 'Emily R.', action: 'Joined Tribe #4821', time: '12 min ago' },
  { user: 'Michael K.', action: 'Upgraded to Seeker Annual', time: '18 min ago' },
  { user: 'Lisa T.', action: 'Generated Universe Receipt', time: '25 min ago' },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with SignRoad.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Users className="w-6 h-6 text-brand-teal mb-2" />
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-500">View and edit user accounts</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Sparkles className="w-6 h-6 text-brand-teal mb-2" />
              <p className="font-medium text-gray-900">Edit Signs</p>
              <p className="text-sm text-gray-500">Manage the 100 signs</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Flame className="w-6 h-6 text-brand-teal mb-2" />
              <p className="font-medium text-gray-900">Content CMS</p>
              <p className="text-sm text-gray-500">Edit daily content</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <TrendingUp className="w-6 h-6 text-brand-teal mb-2" />
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-500">Track platform metrics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
