import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  currentDay: number;
  subscriptionTier: string;
  lanternBrightness: number;
  lastActiveAt?: string;
}

// Fallback mock data for when API is unavailable
const mockUsers = [
  { id: '1', fullName: 'Sarah Mitchell', email: 'sarah@example.com', currentDay: 45, subscriptionTier: 'annual', lanternBrightness: 92, lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: '2', fullName: 'John Davis', email: 'john@example.com', currentDay: 23, subscriptionTier: 'free', lanternBrightness: 78, lastActiveAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
  { id: '3', fullName: 'Emily Roberts', email: 'emily@example.com', currentDay: 89, subscriptionTier: 'lifetime', lanternBrightness: 100, lastActiveAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
  { id: '4', fullName: 'Michael Kim', email: 'michael@example.com', currentDay: 12, subscriptionTier: 'monthly', lanternBrightness: 65, lastActiveAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', fullName: 'Lisa Thompson', email: 'lisa@example.com', currentDay: 156, subscriptionTier: 'annual', lanternBrightness: 88, lastActiveAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
];

function formatLastActive(dateString?: string): string {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function formatSubscription(tier: string): string {
  const tierMap: Record<string, string> = {
    'free': 'Free Trial',
    'monthly': 'Seeker Monthly',
    'annual': 'Seeker Annual',
    'lifetime': 'Master Lifetime',
    'student': 'Student',
  };
  return tierMap[tier] || tier;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(mockUsers.length);

  useEffect(() => {
    fetchUsers();
  }, [page, searchQuery]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await adminApi.getUsers(page, 20, searchQuery || undefined);
      if (response.success && response.data) {
        const data = response.data as { users: User[]; total: number };
        setUsers(data.users);
        setTotalUsers(data.total);
      } else {
        // Use mock data as fallback
        setUsers(mockUsers);
        setTotalUsers(mockUsers.length);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers(mockUsers);
      setTotalUsers(mockUsers.length);
    } finally {
      setIsLoading(false);
    }
  };

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

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
          </div>
        ) : (
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Day {user.currentDay}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.subscriptionTier === 'free' 
                        ? 'bg-gray-100 text-gray-600'
                        : user.subscriptionTier === 'lifetime'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {formatSubscription(user.subscriptionTier)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-teal rounded-full"
                          style={{ width: `${user.lanternBrightness}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{user.lanternBrightness}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatLastActive(user.lastActiveAt)}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, totalUsers)} of {totalUsers.toLocaleString()} users</p>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={page * 20 >= totalUsers}
              onClick={() => setPage(p => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
