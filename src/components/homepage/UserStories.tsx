import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    quote: "This app made me sleep again",
    story: "After months of insomnia, SignRoad's sleep meditations helped me find peace at night.",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    quote: "I manifested my dream job",
    story: "The abundance meditations shifted my mindset and opened doors I never imagined.",
    gradient: "from-green-500/10 to-teal-500/10"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    quote: "My anxiety is finally manageable",
    story: "Daily practice with SignRoad gave me tools to handle stress with grace and confidence.",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    quote: "Found my inner peace",
    story: "SignRoad helped me reconnect with myself after years of feeling lost and disconnected.",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    quote: "Healed my relationship",
    story: "The forgiveness meditations helped me let go of resentment and rebuild trust.",
    gradient: "from-rose-500/10 to-pink-500/10"
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={compact ? "mb-4" : "mb-12"}
    >
      {!compact && (
        <div className="text-center mb-8">
          <p className="text-accent-500 dark:text-accent-400 text-lg mb-2">"This app made me sleep again."</p>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">How SignRoad Changed My Life</h2>
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
            className="p-4 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-surface-border-strong dark:border-surface-border-dark-strong cursor-pointer group transition-all duration-300 hover:shadow-lg shadow-sm"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={story.avatar}
                alt={story.name}
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full object-cover mb-3"
              />
              
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{story.name}</h3>
              <p className="text-accent-500 dark:text-accent-400 font-medium text-xs mb-2">"{story.quote}"</p>
              <p className="text-neutral-600 dark:text-neutral-300 text-xs mb-3 line-clamp-2">{story.story}</p>
              
              <button className="flex items-center space-x-1 text-accent-500 dark:text-accent-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors duration-200 group">
                <span className="text-xs font-medium">Read Story</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
