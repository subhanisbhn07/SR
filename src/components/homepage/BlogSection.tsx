import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X } from 'lucide-react';

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
  const [activeBlog, setActiveBlog] = useState<typeof blogs[0] | null>(null);
  
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
                <h2 className="text-2xl font-bold text-neumo-text">Insights & Reflections</h2>
                <p className="text-neumo-text-secondary text-sm mt-1">Short reflections from the SignRoad team</p>
              </div>
            )}
      
      <div className={`grid ${compact ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
        {displayBlogs.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setActiveBlog(blog)}
            className="p-4 rounded-neumo-lg bg-neumo-bg cursor-pointer group transition-all duration-300 shadow-neumo-sm hover:shadow-neumo-inset"
          >
            <div className="flex flex-col">
              <div
                className="w-full aspect-video rounded-neumo bg-cover bg-center mb-3 shadow-neumo-inset-sm"
                style={{ backgroundImage: `url(${blog.image})` }}
              />
              
              <h3 className="text-sm font-semibold text-neumo-text mb-2 group-hover:text-neumo-text-secondary transition-colors duration-200 line-clamp-2">
                {blog.title}
              </h3>
              
                            <p className="text-neumo-text-secondary text-xs mb-3 line-clamp-3">
                              {blog.snippet}
                            </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2 text-xs text-neumo-text-muted">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                
                <ArrowRight className="w-4 h-4 text-neumo-text-secondary group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlog(null)}
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
                <h3 className="text-xl font-bold text-neumo-text pr-8">{activeBlog.title}</h3>
                <button
                  onClick={() => setActiveBlog(null)}
                  className="p-2 rounded-neumo bg-neumo-surface hover:shadow-neumo-inset transition-all flex-shrink-0"
                >
                  <X className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div
                className="w-full aspect-video rounded-neumo bg-cover bg-center mb-4 shadow-neumo-inset-sm"
                style={{ backgroundImage: `url(${activeBlog.image})` }}
              />

              <div className="flex items-center gap-3 mb-4 text-sm text-neumo-text-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{activeBlog.date}</span>
                </div>
                <span>•</span>
                <span>{activeBlog.readTime}</span>
              </div>

              <div className="space-y-4">
                <p className="text-neumo-text leading-relaxed">{activeBlog.snippet}</p>
                
                <div className="pt-4 border-t border-neumo-border">
                  <p className="text-sm text-neumo-text-secondary mb-3">
                    Continue your journey with guided meditations and daily practices.
                  </p>
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="w-full px-4 py-3 bg-brand-teal text-white rounded-neumo font-medium shadow-teal-glow hover:bg-brand-teal-dark transition-all"
                  >
                    Explore Courses
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
