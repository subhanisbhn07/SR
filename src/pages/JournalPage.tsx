import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Calendar, Sparkles, ChevronRight, Plus } from 'lucide-react';

const journalPrompts = [
  "What are you grateful for today?",
  "What sign from the universe did you notice?",
  "What intention are you setting for tomorrow?",
  "What made you smile today?",
  "What challenge did you overcome?"
];

const pastEntries = [
  {
    id: 1,
    date: "Dec 3, 2024",
    preview: "Today I noticed a white feather on my walk...",
    mood: "😊"
  },
  {
    id: 2,
    date: "Dec 2, 2024",
    preview: "Feeling grateful for the small moments...",
    mood: "🙂"
  },
  {
    id: 3,
    date: "Dec 1, 2024",
    preview: "Started my manifestation journey today...",
    mood: "😊"
  }
];

export const JournalPage: React.FC = () => {
  const [journalText, setJournalText] = useState('');
  const [entrySaved, setEntrySaved] = useState(false);
  const todayPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];

  const handleSaveEntry = () => {
    if (journalText.trim()) {
      setEntrySaved(true);
    }
  };

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Journal</h1>
        <p className="text-neutral-400 text-sm">Reflect on your journey</p>
      </motion.div>

      {!entrySaved ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <PenTool className="w-5 h-5 text-accent-400" />
            <h2 className="text-lg font-semibold text-white">Today's Reflection</h2>
          </div>
          <p className="text-accent-400 text-sm mb-4 italic">"{todayPrompt}"</p>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Start writing..."
            className="w-full h-32 bg-neutral-900/50 border border-neutral-700/50 rounded-xl p-4 text-white placeholder-neutral-500 resize-none focus:outline-none focus:border-accent-500/50"
          />
          <button
            onClick={handleSaveEntry}
            disabled={!journalText.trim()}
            className={`w-full mt-4 py-3 font-medium rounded-xl transition-colors ${
              journalText.trim()
                ? 'bg-accent-500 hover:bg-accent-600 text-white'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
            }`}
          >
            Save Entry
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-2xl p-6 border border-accent-500/30 mb-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-accent-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Entry Saved!</h2>
          <p className="text-neutral-400 text-sm">+10 Sparks earned for journaling</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Past Entries</h2>
          <button className="text-accent-400 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {pastEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-400">{entry.date}</span>
                </div>
                <span className="text-lg">{entry.mood}</span>
              </div>
              <p className="text-white text-sm line-clamp-2">{entry.preview}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center shadow-lg hover:bg-accent-600 transition-colors"
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};
