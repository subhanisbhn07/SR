import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: "7 Micro-Habits That Rewire Limiting Beliefs",
    snippet: "Small daily actions that create profound shifts in your mindset and reality.",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "A Letter to the Version of Me That Gave Up",
    snippet: "A heartfelt reflection on resilience, growth, and the power of never giving up on yourself.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 12, 2024",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Science Behind Manifestation: What Really Works",
    snippet: "Evidence-based insights into how visualization and intention setting create real change.",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 10, 2024",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Morning Rituals of Highly Successful Manifestors",
    snippet: "Discover the daily practices that set the foundation for attracting abundance.",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 8, 2024",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "How to Trust the Universe When Nothing Makes Sense",
    snippet: "Finding faith in the journey even when the path seems unclear and uncertain.",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 5, 2024",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "The Power of Gratitude in Manifestation",
    snippet: "Why appreciation is the secret ingredient to attracting more of what you want.",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 3, 2024",
    readTime: "5 min read"
  }
];

interface BlogSectionProps {
  compact?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ compact = false }) => {
  // Show fewer blogs in compact mode
  const displayBlogs = compact ? blogs.slice(0, 3) : blogs;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={compact ? "mb-4" : "mb-12"}
    >
      {!compact && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Insights & Reflections</h2>
      )}
      
      <div className={`grid ${compact ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-3 gap-4'}`}>
        {displayBlogs.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer group transition-all duration-300 hover:shadow-lg shadow-sm"
          >
            <div className="flex flex-col">
              <div
                className="w-full aspect-video rounded-xl bg-cover bg-center mb-3"
                style={{ backgroundImage: `url(${blog.image})` }}
              />
              
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-accent-500 dark:group-hover:text-accent-400 transition-colors duration-200 line-clamp-2">
                {blog.title}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-300 text-xs mb-3 line-clamp-2">
                {blog.snippet}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                
                <ArrowRight className="w-4 h-4 text-accent-500 dark:text-accent-400 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};
