import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Trash2, Edit2, X, Save } from 'lucide-react';
import { useManifestationStore } from '../features/manifestation/store/manifestationStore';
import { format } from 'date-fns';
import { useToast } from '../shared/hooks/useToast';

export const TravelersLog = () => {
  const { journalEntries, signLogs, deleteJournalEntry, updateJournalEntry } = useManifestationStore();
  const toast = useToast();
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const sortedEntries = [...journalEntries].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const sortedSigns = [...signLogs].sort(
    (a, b) => b.loggedAt.getTime() - a.loggedAt.getTime()
  );

  const handleStartEdit = (entryId: string, currentContent: string) => {
    setEditingEntry(entryId);
    setEditContent(currentContent);
  };

  const handleSaveEdit = () => {
    if (editingEntry && editContent.trim()) {
      updateJournalEntry(editingEntry, editContent);
      setEditingEntry(null);
      setEditContent('');
      toast.success('Journal entry updated!');
    }
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setEditContent('');
  };

  const handleDelete = (entryId: string) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      deleteJournalEntry(entryId);
      toast.success('Journal entry deleted!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Traveler's Log</h1>
          <p className="text-xl text-neutral-400">
            Your journey of signs and reflections
          </p>
        </motion.div>

        {/* Journal Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-500" />
            Journal Entries
          </h2>

          {sortedEntries.length === 0 ? (
            <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-700 text-center">
              <p className="text-neutral-400">No journal entries yet. Start writing your reflections!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700 hover:border-neutral-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {entry.prompt}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(entry.createdAt, 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(entry.id, entry.content)}
                        className="p-2 hover:bg-primary-500/20 rounded-lg transition-colors group"
                        title="Edit entry"
                      >
                        <Edit2 className="w-5 h-5 text-neutral-500 group-hover:text-primary-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                        title="Delete entry"
                      >
                        <Trash2 className="w-5 h-5 text-neutral-500 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Sign Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Signs Found
          </h2>

          {sortedSigns.length === 0 ? (
            <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-700 text-center">
              <p className="text-neutral-400">No signs logged yet. Start your journey!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {sortedSigns.map((sign, index) => (
                <motion.div
                  key={sign.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700 hover:border-primary-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-primary-400 font-medium mb-1">
                        Day {sign.stepNumber}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {sign.signName}
                      </h3>
                    </div>
                    <div className="text-2xl">
                      {sign.found ? '✅' : '⏳'}
                    </div>
                  </div>
                  
                  {sign.note && (
                    <p className="text-sm text-neutral-400 mb-3">
                      {sign.note}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="w-3 h-3" />
                    <span>{format(sign.loggedAt, 'MMM d, yyyy')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-neutral-900 rounded-2xl p-6 border border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Edit Journal Entry</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 resize-none mb-4"
                rows={10}
                placeholder="Write your thoughts here..."
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSaveEdit}
                  disabled={!editContent.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
