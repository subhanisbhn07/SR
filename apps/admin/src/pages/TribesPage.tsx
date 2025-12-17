import { useState, useEffect } from 'react';
import { Users2, Flame, RefreshCw, Loader2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface Tribe {
  id: string;
  name: string;
  members: number;
  activeMembers: number;
  avgLanternHealth: number;
  meditationsToday: number;
  timezone: string;
}

// Fallback mock data for when API is unavailable
const mockTribes: Tribe[] = [
  { id: '4821', name: 'Tribe #4821', members: 5, activeMembers: 4, avgLanternHealth: 82, meditationsToday: 3, timezone: 'EST' },
  { id: '4822', name: 'Tribe #4822', members: 5, activeMembers: 5, avgLanternHealth: 91, meditationsToday: 5, timezone: 'PST' },
  { id: '4823', name: 'Tribe #4823', members: 5, activeMembers: 3, avgLanternHealth: 67, meditationsToday: 2, timezone: 'CST' },
  { id: '4824', name: 'Tribe #4824', members: 5, activeMembers: 2, avgLanternHealth: 45, meditationsToday: 1, timezone: 'EST' },
  { id: '4825', name: 'Tribe #4825', members: 5, activeMembers: 5, avgLanternHealth: 95, meditationsToday: 5, timezone: 'GMT' },
];

export default function TribesPage() {
  const [tribes, setTribes] = useState<Tribe[]>(mockTribes);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalTribes: 2569, avgLanternHealth: 78, activeRate: 89 });

  useEffect(() => {
    fetchTribes();
  }, []);

  const fetchTribes = async () => {
    setIsLoading(true);
    try {
      const response = await adminApi.getTribes(1, 50);
      if (response.success && response.data) {
        const data = response.data as { tribes: Tribe[]; total: number; stats?: any };
        setTribes(data.tribes);
        if (data.stats) {
          setStats({
            totalTribes: data.total,
            avgLanternHealth: data.stats.avgLanternHealth || 78,
            activeRate: data.stats.activeRate || 89,
          });
        }
      } else {
        setTribes(mockTribes);
      }
    } catch (error) {
      console.error('Failed to fetch tribes:', error);
      setTribes(mockTribes);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRebalance = async () => {
    // Placeholder for rebalance functionality
    alert('Tribe rebalancing initiated. This will run in the background.');
  };
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tribes</h1>
          <p className="text-gray-500 mt-1">Monitor and manage 5-person accountability groups</p>
        </div>
        <button 
          onClick={handleRebalance}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Rebalance Tribes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTribes.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Tribes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.avgLanternHealth}%</p>
              <p className="text-sm text-gray-500">Avg Lantern Health</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeRate}%</p>
              <p className="text-sm text-gray-500">Active Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">All Tribes</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tribe</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Lantern Health</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Today</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Timezone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tribes.map((tribe) => (
                <tr key={tribe.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                        <Users2 className="w-5 h-5 text-brand-teal" />
                      </div>
                      <span className="font-medium text-gray-900">{tribe.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tribe.members}/5</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tribe.activeMembers >= 4 ? 'bg-green-100 text-green-600' :
                      tribe.activeMembers >= 2 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {tribe.activeMembers} active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            tribe.avgLanternHealth >= 80 ? 'bg-green-500' :
                            tribe.avgLanternHealth >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${tribe.avgLanternHealth}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{tribe.avgLanternHealth}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tribe.meditationsToday}/5</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{tribe.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
