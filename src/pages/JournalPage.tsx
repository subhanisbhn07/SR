import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Calendar, Sparkles, ChevronRight, Plus } from 'lucide-react';
import { useJournalStore, MOOD_OPTIONS } from '../store/journalStore';

export const JournalPage: React.FC = () => {
  const { 
    createEntry, 
    getRecentEntries, 
    getTodaysPrompt, 
    hasJournaledToday,
    getJournalStats,
    draftContent,
    draftMood,
    setDraft
  } = useJournalStore();
  
  const [entrySaved, setEntrySaved] = useState(false);
  const [sparksEarned, setSparksEarned] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(draftMood);
  const [journalText, setJournalText] = useState(draftContent);
  
  const todayPrompt = getTodaysPrompt();
  const recentEntries = getRecentEntries(5);
  const stats = getJournalStats();
  const alreadyJournaledToday = hasJournaledToday();

  const handleTextChange = (text: string) => {
    setJournalText(text);
    setDraft(text, selectedMood);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setDraft(journalText, mood);
  };

  const handleSaveEntry = () => {
    if (journalText.trim()) {
      const result = createEntry(journalText, selectedMood || undefined, todayPrompt);
      setSparksEarned(result.sparksEarned);
      setEntrySaved(true);
      setJournalText('');
      setSelectedMood(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Journal</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Reflect on your journey</p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white dark:bg-surface-card-dark rounded-2xl p-4 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-sm dark:shadow-none mb-6"
      >
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-500">{stats.totalEntries}</p>
            <p className="text-xs text-neutral-500">Total Entries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-500">{stats.streak}</p>
            <p className="text-xs text-neutral-500">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gold-500">{stats.totalSparks}</p>
            <p className="text-xs text-neutral-500">Sparks Earned</p>
          </div>
        </div>
      </motion.div>

      {!entrySaved ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-card-dark rounded-2xl p-5 sm:p-6 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-sm dark:shadow-none mb-6"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Today's Reflection</h2>
              </div>
              {alreadyJournaledToday && (
                <span className="text-xs bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full">
                  Already journaled today
                </span>
              )}
            </div>
            <p className="text-primary-600 dark:text-primary-400 text-sm mb-4 italic">"{todayPrompt}"</p>
            
            {/* Mood selector */}
            <div className="mb-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">How are you feeling?</p>
              <div className="flex flex-wrap gap-2">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedMood === mood.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {mood.emoji} {mood.label}
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={journalText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Start writing..."
              className="w-full h-40 bg-neutral-50 dark:bg-neutral-900/50 border border-surface-border dark:border-neutral-700/50 rounded-xl p-4 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 resize-none focus:outline-none focus:border-primary-500/50"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveEntry}
                disabled={!journalText.trim()}
                className={`px-6 py-3 font-medium rounded-xl transition-colors ${
                  journalText.trim()
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                Save Entry (+10 Sparks)
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-primary-500/20 to-teal-500/20 rounded-2xl p-6 border border-primary-500/30 mb-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary-500 dark:text-primary-400" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Entry Saved!</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">+{sparksEarned} Sparks earned for journaling</p>
          <button
            onClick={() => setEntrySaved(false)}
            className="mt-4 px-4 py-2 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
          >
            Write another entry
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-surface-card-dark rounded-2xl p-5 sm:p-6 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-sm dark:shadow-none"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Past Entries</h2>
          <button className="text-primary-600 dark:text-primary-400 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {recentEntries.length === 0 ? (
          <div className="text-center py-8">
            <PenTool className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">No journal entries yet</p>
            <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1">Start writing to see your entries here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-surface-border dark:border-neutral-700/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">{formatDate(entry.createdAt)}</span>
                  </div>
                  <span className="text-lg">{entry.moodEmoji || '📝'}</span>
                </div>
                <p className="text-neutral-900 dark:text-white text-sm line-clamp-2">{entry.content}</p>
                {entry.prompt && (
                  <p className="text-xs text-primary-500 dark:text-primary-400 mt-2 italic">Prompt: "{entry.prompt}"</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors z-40"
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};
