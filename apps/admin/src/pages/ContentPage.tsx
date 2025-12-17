import { useState } from 'react';
import { FileText, Play, Edit2, Check, X } from 'lucide-react';

const mockContent = [
  { day: 1, title: 'Beginning Your Journey', phase: 'Awakening', duration: '5:00', published: true },
  { day: 2, title: 'Finding Your Breath', phase: 'Awakening', duration: '5:30', published: true },
  { day: 3, title: 'Opening to Signs', phase: 'Awakening', duration: '6:00', published: true },
  { day: 4, title: 'Joining Your Tribe', phase: 'Awakening', duration: '5:15', published: true },
  { day: 5, title: 'The Power of Intention', phase: 'Awakening', duration: '6:30', published: true },
  { day: 6, title: 'Deepening Awareness', phase: 'Awakening', duration: '5:45', published: false },
  { day: 7, title: 'Week One Reflection', phase: 'Awakening', duration: '8:00', published: false },
];

const phases = ['Awakening', 'Deepening', 'Transformation', 'Mastery', 'Embodiment', 'Transcendence'];

export default function ContentPage() {
  const [selectedPhase, setSelectedPhase] = useState('all');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-500 mt-1">Manage the 365-day meditation journey content</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedPhase('all')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedPhase === 'all'
              ? 'bg-brand-teal text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Phases
        </button>
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => setSelectedPhase(phase)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedPhase === phase
                ? 'bg-brand-teal text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {phase}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockContent.map((content) => (
              <tr key={content.day} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brand-teal" />
                    </div>
                    <span className="font-medium text-gray-900">Day {content.day}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">{content.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                    {content.phase}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{content.duration}</td>
                <td className="px-6 py-4">
                  {content.published ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Published</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400">
                      <X className="w-4 h-4" />
                      <span className="text-sm">Draft</span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
