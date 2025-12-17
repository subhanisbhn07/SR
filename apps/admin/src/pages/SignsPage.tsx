import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface Sign {
  id: string;
  name: string;
  emoji: string;
  category: string;
  rarity: string;
  unlockDay: number;
  timesFound?: number;
}

// Fallback mock data for when API is unavailable
const mockSigns: Sign[] = [
  { id: '1', name: 'White Feather', emoji: '🪶', category: 'nature', rarity: 'whispered', unlockDay: 1, timesFound: 8432 },
  { id: '2', name: 'Rainbow', emoji: '🌈', category: 'nature', rarity: 'spoken', unlockDay: 4, timesFound: 3241 },
  { id: '3', name: 'Four-Leaf Clover', emoji: '🍀', category: 'nature', rarity: 'shouted', unlockDay: 7, timesFound: 892 },
  { id: '4', name: 'Shooting Star', emoji: '🌠', category: 'nature', rarity: 'thundered', unlockDay: 10, timesFound: 234 },
  { id: '5', name: '11:11', emoji: '🕚', category: 'numbers', rarity: 'whispered', unlockDay: 1, timesFound: 12453 },
  { id: '6', name: 'Butterfly', emoji: '🦋', category: 'animals', rarity: 'whispered', unlockDay: 1, timesFound: 6721 },
  { id: '7', name: 'Northern Lights', emoji: '🌌', category: 'nature', rarity: 'cosmos_aligned', unlockDay: 21, timesFound: 12 },
];

const rarityColors: Record<string, string> = {
  'whispered': 'bg-gray-100 text-gray-600',
  'spoken': 'bg-blue-100 text-blue-600',
  'shouted': 'bg-purple-100 text-purple-600',
  'thundered': 'bg-orange-100 text-orange-600',
  'cosmos_aligned': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
};

function formatRarity(rarity: string): string {
  const rarityMap: Record<string, string> = {
    'whispered': 'Whispered',
    'spoken': 'Spoken',
    'shouted': 'Shouted',
    'thundered': 'Thundered',
    'cosmos_aligned': 'Cosmos-Aligned',
  };
  return rarityMap[rarity] || rarity;
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function SignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [signs, setSigns] = useState<Sign[]>(mockSigns);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSigns, setTotalSigns] = useState(mockSigns.length);

  useEffect(() => {
    fetchSigns();
  }, []);

  const fetchSigns = async () => {
    setIsLoading(true);
    try {
      const response = await adminApi.getSigns(1, 100);
      if (response.success && response.data) {
        const data = response.data as { signs: Sign[]; total: number };
        setSigns(data.signs);
        setTotalSigns(data.total);
      } else {
        setSigns(mockSigns);
        setTotalSigns(mockSigns.length);
      }
    } catch (error) {
      console.error('Failed to fetch signs:', error);
      setSigns(mockSigns);
      setTotalSigns(mockSigns.length);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSigns = signs.filter(sign => 
    sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sign.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Signs</h1>
          <p className="text-gray-500 mt-1">Manage the {totalSigns.toLocaleString()} signs in the SignRoad database</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-opacity-90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Sign</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search signs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredSigns.map((sign) => (
              <div key={sign.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{sign.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{sign.name}</h3>
                      <p className="text-sm text-gray-500">{formatCategory(sign.category)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${rarityColors[sign.rarity] || 'bg-gray-100 text-gray-600'}`}>
                    {formatRarity(sign.rarity)}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{(sign.timesFound || 0).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">times found</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Unlocks on Day {sign.unlockDay}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
