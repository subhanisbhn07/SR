import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Send } from 'lucide-react';
import { useFeedStore } from '../store/feedStore';
import { ReactionEmoji } from '../types/feed';
import { formatDistanceToNow } from 'date-fns';

export const GlobalFeed = () => {
  const { posts, addPost, addReaction } = useFeedStore();
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const reactionEmojis: ReactionEmoji[] = ['🎉', '❤️', '🔥', '✨', '🙏'];

  const handleSubmitPost = () => {
    if (newPostContent.trim()) {
      addPost(newPostContent, 1);
      setNewPostContent('');
      setShowPostModal(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Career & Success': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Love & Relationships': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Personal Growth': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Health & Wellness': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Wealth & Abundance': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
    return colors[category] || 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-bold text-white">Global Feed</h1>
          </div>
          <p className="text-neutral-400 mb-4">
            Share your manifestation wins and synchronicities with the SignRoad community
          </p>
          
          {/* Share Button */}
          <button
            onClick={() => setShowPostModal(true)}
            className="w-full px-6 py-4 bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Share Your Win
          </button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700"
            >
              {/* Post Header */}
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-12 h-12 rounded-full border-2 border-primary-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{post.userName}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getCategoryColor(post.goalCategory)}`}>
                      {post.goalCategory}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span>Day {post.stepNumber}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-neutral-200 mb-4 leading-relaxed">{post.content}</p>

              {/* Reactions */}
              <div className="flex items-center gap-2 pt-4 border-t border-neutral-700">
                {reactionEmojis.map((emoji) => {
                  const count = post.reactions[emoji] || 0;
                  return (
                    <button
                      key={emoji}
                      onClick={() => addReaction(post.id, emoji)}
                      className={`
                        flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all
                        ${count > 0
                          ? 'bg-accent-500/20 border border-accent-500/30'
                          : 'bg-neutral-700/50 hover:bg-neutral-700 border border-transparent'
                        }
                      `}
                    >
                      <span className="text-lg">{emoji}</span>
                      {count > 0 && (
                        <span className="text-sm font-medium text-white">{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPostModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg w-full bg-neutral-900 rounded-2xl p-6 border border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-bold text-white">Share Your Win</h2>
            </div>

            <p className="text-sm text-neutral-400 mb-4">
              Share your manifestation wins, synchronicities, or insights with the community
            </p>

            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="I manifested... / I found my sign... / Today I realized..."
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 resize-none mb-4"
              rows={5}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmitPost}
                disabled={!newPostContent.trim()}
                className="flex-1 px-6 py-3 bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
              <button
                onClick={() => setShowPostModal(false)}
                className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
