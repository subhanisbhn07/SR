import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
  }
];

export const UserStories: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="text-center mb-8">
        <p className="text-accent-400 text-lg mb-2">"This app made me sleep again."</p>
        <h2 className="text-2xl font-bold text-neutral-100">How SignRoad Changed My Life</h2>
      </div>
      
      <div className="space-y-4">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${story.gradient} backdrop-blur-sm border border-neutral-700/30 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10`}
          >
            <div className="flex items-start space-x-4">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">{story.name}</h3>
                <p className="text-accent-400 font-medium mb-2">"{story.quote}"</p>
                <p className="text-neutral-300 text-sm mb-3">{story.story}</p>
                
                <button className="flex items-center space-x-2 text-accent-400 hover:text-accent-300 transition-colors duration-200 group">
                  <span className="text-sm font-medium">Read Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};