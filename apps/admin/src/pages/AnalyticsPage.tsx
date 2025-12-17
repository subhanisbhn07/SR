import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Flame, Sparkles, Loader2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}

interface TopSign {
  name: string;
  emoji: string;
  count: number;
}

interface RetentionPoint {
  day: string;
  rate: number;
}

// Fallback mock data for when API is unavailable
const mockMetrics: Metric[] = [
  { label: 'Monthly Active Users', value: '8,432', change: '+12.5%', trend: 'up', icon: Users },
  { label: 'Monthly Revenue', value: '$47,892', change: '+8.3%', trend: 'up', icon: DollarSign },
  { label: 'Trial Conversion', value: '18.7%', change: '-2.1%', trend: 'down', icon: TrendingUp },
  { label: 'Avg Session Length', value: '6.2 min', change: '+15%', trend: 'up', icon: Flame },
];

const mockTopSigns: TopSign[] = [
  { name: '11:11', emoji: '🕚', count: 12453 },
  { name: 'White Feather', emoji: '🪶', count: 8432 },
  { name: 'Butterfly', emoji: '🦋', count: 6721 },
  { name: 'Rainbow', emoji: '🌈', count: 3241 },
  { name: '222', emoji: '2️⃣', count: 2891 },
];

const mockRetentionData: RetentionPoint[] = [
  { day: 'Day 1', rate: 100 },
  { day: 'Day 7', rate: 68 },
  { day: 'Day 14', rate: 52 },
  { day: 'Day 30', rate: 41 },
  { day: 'Day 60', rate: 35 },
  { day: 'Day 90', rate: 31 },
];

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<Metric[]>(mockMetrics);
  const [topSigns, setTopSigns] = useState<TopSign[]>(mockTopSigns);
  const [retentionData, setRetentionData] = useState<RetentionPoint[]>(mockRetentionData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const response = await adminApi.getAnalytics('month');
      if (response.success && response.data) {
        const data = response.data as any;
        if (data.metrics) {
          setMetrics(data.metrics.map((m: any) => ({
            ...m,
            icon: m.icon === 'Users' ? Users : 
                  m.icon === 'DollarSign' ? DollarSign :
                  m.icon === 'TrendingUp' ? TrendingUp : Flame,
          })));
        }
        if (data.topSigns) {
          setTopSigns(data.topSigns);
        }
        if (data.retention) {
          setRetentionData(data.retention);
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Keep mock data as fallback
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Track platform performance and user engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-brand-teal" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-gray-500 text-sm">{metric.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Retention</h2>
          <div className="space-y-4">
            {retentionData.map((data) => (
              <div key={data.day} className="flex items-center gap-4">
                <span className="w-16 text-sm text-gray-500">{data.day}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-brand-teal rounded-lg flex items-center justify-end pr-3"
                    style={{ width: `${data.rate}%` }}
                  >
                    <span className="text-xs font-medium text-white">{data.rate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Signs This Month</h2>
          <div className="space-y-4">
            {topSigns.map((sign, index) => (
              <div key={sign.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500">
                    {index + 1}
                  </span>
                  <span className="text-2xl">{sign.emoji}</span>
                  <span className="font-medium text-gray-900">{sign.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span className="text-gray-600">{sign.count.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
