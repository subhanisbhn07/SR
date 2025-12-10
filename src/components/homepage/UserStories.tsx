import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "This app made me sleep again",
    story: "After months of insomnia, SignRoad's sleep meditations helped me find peace at night.",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "I manifested my dream job",
    story: "The abundance meditations shifted my mindset and opened doors I never imagined.",
    gradient: "from-green-500/10 to-teal-500/10"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "My anxiety is finally manageable",
    story: "Daily practice with SignRoad gave me tools to handle stress with grace and confidence.",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Found my inner peace",
    story: "SignRoad helped me reconnect with myself after years of feeling lost and disconnected.",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Healed my relationship",
    story: "The forgiveness meditations helped me let go of resentment and rebuild trust.",
    gradient: "from-rose-500/10 to-pink-500/10"
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Doubled my productivity",
    story: "Morning rituals and focus sessions transformed how I approach my work and goals.",
    gradient: "from-indigo-500/10 to-violet-500/10"
  }
];

interface UserStoriesProps {
  compact?: boolean;
}

export const UserStories: React.FC<UserStoriesProps> = ({ compact = false }) => {
  // Show fewer stories in compact mode
  const displayStories = compact ? stories.slice(0, 3) : stories;
  const [activeStory, setActiveStory] = useState<typeof stories[0] | null>(null);
  
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={compact ? "mb-4" : "mb-12"}
    >
      {!compact && (
        <div className="text-center mb-8">
          <p className="text-neumo-text-secondary text-lg mb-2">"This app made me sleep again."</p>
          <h2 className="text-2xl font-bold text-neumo-text">How SignRoad Changed My Life</h2>
        </div>
      )}
      
      <div className={`grid ${compact ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-3 gap-4'}`}>
        {displayStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setActiveStory(story)}
            className="p-4 rounded-neumo-lg bg-neumo-bg cursor-pointer group transition-all duration-300 shadow-neumo-sm hover:shadow-neumo-inset"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-16 h-16 rounded-full object-cover mb-3 shadow-neumo-sm"
              />
              
              <h3 className="text-sm font-semibold text-neumo-text mb-1">{story.name}</h3>
              <p className="text-neumo-text-secondary font-medium text-xs mb-2">"{story.quote}"</p>
              <p className="text-neumo-text-secondary text-xs mb-3 line-clamp-2">{story.story}</p>
              
              <button className="flex items-center space-x-1 text-neumo-text-secondary hover:text-neumo-text transition-colors duration-200 group">
                <span className="text-xs font-medium">Read Story</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neumo-bg rounded-neumo-lg shadow-neumo-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeStory.avatar}
                    alt={activeStory.name}
                    className="w-16 h-16 rounded-full object-cover shadow-neumo-sm"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-neumo-text">{activeStory.name}</h3>
                    <p className="text-sm text-brand-teal font-medium">"{activeStory.quote}"</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="p-2 rounded-neumo bg-neumo-surface hover:shadow-neumo-inset transition-all"
                >
                  <X className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-neumo-text leading-relaxed">{activeStory.story}</p>
                
                <div className="pt-4 border-t border-neumo-border">
                  <p className="text-sm text-neumo-text-secondary mb-3">
                    Ready to start your own transformation journey?
                  </p>
                  <button
                    onClick={() => setActiveStory(null)}
                    className="w-full px-4 py-3 bg-brand-teal text-white rounded-neumo font-medium shadow-teal-glow hover:bg-brand-teal-dark transition-all"
                  >
                    Continue Your Journey
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
