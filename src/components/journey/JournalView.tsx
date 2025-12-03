import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Smartphone, Eye, Star } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';
import { RARITY_CONFIG, ROAD_STEPS } from '../../types/journey';

export const JournalView: React.FC = () => {
  const { user, generateReceipt, showReceipt } = useJourneyStore();

  if (!user) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleViewReceipt = (signIndex: number) => {
    const sign = user.foundSigns[signIndex];
    const receipt = generateReceipt(sign);
    showReceipt(receipt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-indigo-950 to-transparent p-4 z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-white">Traveler's Log</h1>
          <p className="text-purple-300 text-sm">
            {user.foundSigns.length} signs found on your journey
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {user.foundSigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-xl font-semibold text-white mb-2">Your Journal Awaits</h2>
            <p className="text-purple-300">
              Complete your first meditation and find your first sign to begin your log.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {user.foundSigns
              .slice()
              .reverse()
              .map((sign, index) => {
                const step = ROAD_STEPS.find((s) => s.day === sign.dayNumber);
                const rarityConfig = RARITY_CONFIG[sign.rarity];

                return (
                  <motion.div
                    key={sign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/5 rounded-2xl p-4 border ${
                      sign.rarity === 'mythic'
                        ? 'border-amber-500/50'
                        : sign.rarity === 'rare'
                        ? 'border-purple-500/50'
                        : 'border-white/10'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            sign.rarity === 'mythic'
                              ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                              : sign.rarity === 'rare'
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                              : 'bg-white/10'
                          }`}
                        >
                          <span className="text-2xl">{sign.signEmoji}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{sign.signName}</h3>
                          <p className="text-purple-300 text-sm">
                            Day {sign.dayNumber}: {step?.title}
                          </p>
                        </div>
                      </div>

                      {/* Rarity badge */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rarityConfig.stars }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              sign.rarity === 'mythic'
                                ? 'fill-amber-400 text-amber-400'
                                : sign.rarity === 'rare'
                                ? 'fill-purple-400 text-purple-400'
                                : 'fill-blue-400 text-blue-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Journal entry */}
                    {sign.journalEntry && (
                      <div className="bg-white/5 rounded-xl p-3 mb-3">
                        <p className="text-white/80 text-sm italic">"{sign.journalEntry}"</p>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-purple-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(sign.foundAt)}
                      </div>
                      {sign.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {sign.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        {sign.isDigital ? (
                          <>
                            <Smartphone className="w-3 h-3" />
                            Digital
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            Physical
                          </>
                        )}
                      </div>
                    </div>

                    {/* View receipt button for milestone signs */}
                    {[7, 10, 14, 30, 60, 90].includes(sign.dayNumber) && (
                      <button
                        onClick={() => handleViewReceipt(user.foundSigns.length - 1 - index)}
                        className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-colors"
                      >
                        View Universe Receipt
                      </button>
                    )}
                  </motion.div>
                );
              })}
          </div>
        )}

        {/* Stats summary */}
        {user.foundSigns.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <h3 className="text-white font-semibold mb-3">Journey Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-amber-400">{user.foundSigns.length}</p>
                <p className="text-xs text-purple-300">Signs Found</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">
                  {user.foundSigns.filter((s) => s.rarity === 'rare').length}
                </p>
                <p className="text-xs text-purple-300">Rare</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-400">
                  {user.foundSigns.filter((s) => s.rarity === 'mythic').length}
                </p>
                <p className="text-xs text-purple-300">Mythic</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
