import { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@example.com', day: 45, subscription: 'Seeker Annual', lanternHealth: 92, lastActive: '2 hours ago' },
  { id: '2', name: 'John Davis', email: 'john@example.com', day: 23, subscription: 'Free Trial', lanternHealth: 78, lastActive: '5 hours ago' },
  { id: '3', name: 'Emily Roberts', email: 'emily@example.com', day: 89, subscription: 'Master Lifetime', lanternHealth: 100, lastActive: '1 hour ago' },
  { id: '4', name: 'Michael Kim', email: 'michael@example.com', day: 12, subscription: 'Seeker Monthly', lanternHealth: 65, lastActive: '1 day ago' },
  { id: '5', name: 'Lisa Thompson', email: 'lisa@example.com', day: 156, subscription: 'Seeker Annual', lanternHealth: 88, lastActive: '3 hours ago' },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">Manage user accounts and subscriptions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Lantern</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">Day {user.day}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.subscription === 'Free Trial' 
                      ? 'bg-gray-100 text-gray-600'
                      : user.subscription === 'Master Lifetime'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {user.subscription}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-teal rounded-full"
                        style={{ width: `${user.lanternHealth}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{user.lanternHealth}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-5 of 12,847 users</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
