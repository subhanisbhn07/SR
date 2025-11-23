import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Check, Lock, X } from 'lucide-react';
import { cosmeticsData } from '../data/cosmeticsData';
import { useCosmeticsStore } from '../store/cosmeticsStore';
import { useAuthStore } from '../../../store/authStore';
import { CosmeticCategory } from '../types/cosmetics';

export const CosmeticsShop = () => {
  const { userCosmetics, purchaseItem, equipItem, unequipItem, hasItem } = useCosmeticsStore();
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<CosmeticCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const userSparks = user?.sparks || 0;
  const isSubscribed = user?.mode === 'enterprise';

  const categories: Array<{ id: CosmeticCategory | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'avatar', label: 'Avatar', icon: '👤' },
    { id: 'lantern', label: 'Lantern', icon: '🔥' },
    { id: 'badge', label: 'Badge', icon: '🏆' },
    { id: 'frame', label: 'Frame', icon: '🖼️' },
  ];

  const filteredItems = cosmeticsData.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-neutral-400 border-neutral-600';
      case 'rare': return 'text-blue-400 border-blue-600';
      case 'epic': return 'text-purple-400 border-purple-600';
      case 'legendary': return 'text-accent-400 border-accent-600';
      default: return 'text-neutral-400 border-neutral-600';
    }
  };

  const handlePurchase = (itemId: string, sparkCost: number) => {
    if (userSparks >= sparkCost) {
      const success = purchaseItem(itemId);
      if (success) {
        setSelectedItem(null);
      }
    }
  };

  const handleEquip = (itemId: string, category: CosmeticCategory) => {
    equipItem(itemId, category);
    setSelectedItem(null);
  };

  const selectedItemData = selectedItem ? cosmeticsData.find(i => i.id === selectedItem) : null;
  const isEquipped = selectedItemData && userCosmetics[`equipped${selectedItemData.category.charAt(0).toUpperCase() + selectedItemData.category.slice(1)}` as keyof typeof userCosmetics] === selectedItem;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-accent-500" />
              <h1 className="text-3xl font-bold text-white">Cosmetics Shop</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent-500/20 rounded-lg border border-accent-500/30">
              <Sparkles className="w-5 h-5 text-accent-500" />
              <span className="text-xl font-bold text-white">{userSparks}</span>
              <span className="text-sm text-neutral-400">Sparks</span>
            </div>
          </div>
          <p className="text-neutral-400">
            Customize your journey with unique cosmetics. Earn Sparks by completing meditations and logging signs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap
                ${selectedCategory === category.id
                  ? 'bg-accent-500 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }
              `}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const owned = hasItem(item.id);
            const canAfford = userSparks >= item.sparkPrice;

            return (
              <motion.button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className={`
                  relative p-4 rounded-xl border-2 transition-all text-left
                  ${getRarityColor(item.rarity)}
                  bg-neutral-800/50 hover:bg-neutral-800
                `}
              >
                {/* Premium Badge */}
                {item.isPremium && !isSubscribed && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-accent-500/20 text-accent-400 text-xs font-medium rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Premium
                  </div>
                )}

                {/* Owned Badge */}
                {owned && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Owned
                  </div>
                )}

                {/* Item Preview */}
                <div className="w-full h-32 mb-3 rounded-lg bg-neutral-900/50 flex items-center justify-center">
                  <div className="text-4xl">{item.category === 'avatar' ? '👤' : item.category === 'lantern' ? '🔥' : item.category === 'badge' ? '🏆' : '🖼️'}</div>
                </div>

                {/* Item Info */}
                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-neutral-400 mb-3 line-clamp-2">{item.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-accent-500" />
                    <span className={`font-bold ${canAfford || owned ? 'text-white' : 'text-red-400'}`}>
                      {item.sparkPrice}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRarityColor(item.rarity)} bg-opacity-20`}>
                    {item.rarity}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400">No items in this category</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && selectedItemData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-md w-full bg-neutral-900 rounded-2xl p-6 border-2 ${getRarityColor(selectedItemData.rarity)}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>

              {/* Item Preview */}
              <div className="w-full h-48 mb-4 rounded-lg bg-neutral-800 flex items-center justify-center">
                <div className="text-6xl">
                  {selectedItemData.category === 'avatar' ? '👤' : selectedItemData.category === 'lantern' ? '🔥' : selectedItemData.category === 'badge' ? '🏆' : '🖼️'}
                </div>
              </div>

              {/* Item Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-white">{selectedItemData.name}</h2>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getRarityColor(selectedItemData.rarity)} bg-opacity-20`}>
                    {selectedItemData.rarity}
                  </span>
                </div>
                <p className="text-neutral-300 mb-4">{selectedItemData.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-accent-500" />
                  <span className="text-xl font-bold text-white">{selectedItemData.sparkPrice}</span>
                  <span className="text-sm text-neutral-400">Sparks</span>
                </div>
              </div>

              {/* Actions */}
              {hasItem(selectedItemData.id) ? (
                <div className="space-y-2">
                  {isEquipped ? (
                    <button
                      onClick={() => unequipItem(selectedItemData.category)}
                      className="w-full px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Unequip
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEquip(selectedItemData.id, selectedItemData.category)}
                      className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Equip
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {selectedItemData.isPremium && !isSubscribed ? (
                    <div className="p-4 bg-accent-500/10 border border-accent-500/30 rounded-lg text-center">
                      <Lock className="w-8 h-8 text-accent-500 mx-auto mb-2" />
                      <p className="text-sm text-accent-400">
                        Become a Seeker to unlock premium cosmetics
                      </p>
                    </div>
                  ) : userSparks >= selectedItemData.sparkPrice ? (
                    <button
                      onClick={() => handlePurchase(selectedItemData.id, selectedItemData.sparkPrice)}
                      className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Purchase
                    </button>
                  ) : (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                      <p className="text-sm text-red-400">
                        Not enough Sparks. Need {selectedItemData.sparkPrice - userSparks} more.
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
