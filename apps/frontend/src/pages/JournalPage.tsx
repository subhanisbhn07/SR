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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-neumo-text mb-2">Journal</h1>
        <p className="text-neumo-text-secondary text-sm">Reflect on your journey</p>
      </motion.div>

      {!entrySaved ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neumo-bg rounded-neumo-lg p-5 sm:p-6 shadow-neumo mb-6"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <PenTool className="w-5 h-5 text-neumo-text-secondary" />
              <h2 className="text-lg font-semibold text-neumo-text">Today's Reflection</h2>
            </div>
            <p className="text-neumo-text-secondary text-sm mb-4 italic">"{todayPrompt}"</p>
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Start writing..."
              className="w-full h-40 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo p-4 text-neumo-text placeholder-neumo-text-muted resize-none focus:outline-none"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveEntry}
                disabled={!journalText.trim()}
                className={`px-6 py-3 font-medium rounded-neumo transition-all ${
                  journalText.trim()
                    ? 'bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text'
                    : 'bg-neumo-bg shadow-neumo-inset-sm text-neumo-text-muted cursor-not-allowed'
                }`}
              >
                Save Entry
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-neumo-bg shadow-neumo-inset-sm flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-neumo-text-secondary" />
          </div>
          <h2 className="text-lg font-semibold text-neumo-text mb-2">Entry Saved!</h2>
          <p className="text-neumo-text-secondary text-sm">+10 Sparks earned for journaling</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-neumo-bg rounded-neumo-lg p-5 sm:p-6 shadow-neumo"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neumo-text">Past Entries</h2>
          <button className="text-neumo-text-secondary text-sm font-medium flex items-center gap-1">
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
              className="bg-neumo-bg rounded-neumo p-4 shadow-neumo-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neumo-text-secondary" />
                  <span className="text-sm text-neumo-text-secondary">{entry.date}</span>
                </div>
                <span className="text-lg">{entry.mood}</span>
              </div>
              <p className="text-neumo-text text-sm line-clamp-2">{entry.preview}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-neumo-bg rounded-full flex items-center justify-center shadow-neumo hover:shadow-neumo-inset transition-all z-40"
      >
        <Plus className="w-6 h-6 text-neumo-text-secondary" />
      </motion.button>
    </div>
  );
};
