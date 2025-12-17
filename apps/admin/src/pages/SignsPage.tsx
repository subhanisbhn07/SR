import { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const mockSigns = [
  { id: '1', name: 'White Feather', emoji: '🪶', category: 'Nature', rarity: 'Whispered', unlockDay: 1, timesFound: 8432 },
  { id: '2', name: 'Rainbow', emoji: '🌈', category: 'Nature', rarity: 'Spoken', unlockDay: 4, timesFound: 3241 },
  { id: '3', name: 'Four-Leaf Clover', emoji: '🍀', category: 'Nature', rarity: 'Shouted', unlockDay: 7, timesFound: 892 },
  { id: '4', name: 'Shooting Star', emoji: '🌠', category: 'Nature', rarity: 'Thundered', unlockDay: 10, timesFound: 234 },
  { id: '5', name: '11:11', emoji: '🕚', category: 'Numbers', rarity: 'Whispered', unlockDay: 121, timesFound: 12453 },
  { id: '6', name: 'Butterfly', emoji: '🦋', category: 'Animals', rarity: 'Whispered', unlockDay: 61, timesFound: 6721 },
  { id: '7', name: 'Northern Lights', emoji: '🌌', category: 'Nature', rarity: 'Cosmos-Aligned', unlockDay: 58, timesFound: 12 },
];

const rarityColors: Record<string, string> = {
  'Whispered': 'bg-gray-100 text-gray-600',
  'Spoken': 'bg-blue-100 text-blue-600',
  'Shouted': 'bg-purple-100 text-purple-600',
  'Thundered': 'bg-orange-100 text-orange-600',
  'Cosmos-Aligned': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
};

export default function SignsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Signs</h1>
          <p className="text-gray-500 mt-1">Manage the 100 signs in the SignRoad database</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {mockSigns.map((sign) => (
            <div key={sign.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sign.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{sign.name}</h3>
                    <p className="text-sm text-gray-500">{sign.category}</p>
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
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${rarityColors[sign.rarity]}`}>
                  {sign.rarity}
                </span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{sign.timesFound.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">times found</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Unlocks on Day {sign.unlockDay}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
