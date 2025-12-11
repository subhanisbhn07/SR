import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: "Why Your Progress Should Never Reset to Zero",
    snippet: "The psychology behind forgiving streaks, and why SignRoad's Lantern system keeps you on the road 3x longer than harsh reset apps.",
    fullContent: "Every meditation app you've tried has the same problem: miss one day, lose your streak, feel like a failure. It's a design choice rooted in casino psychology, not wellness.\n\nAt SignRoad, we built the Lantern system on a different principle: your progress should dim when you rest, not disappear. Here's why this matters for your brain and your practice.\n\nWhen a streak resets to zero, your brain experiences it as a loss. Loss aversion is one of the most powerful psychological forces, and it triggers shame, guilt, and often abandonment. You don't just lose a number, you lose your identity as 'someone who shows up.'\n\nThe Lantern works differently. When you miss a day, your flame dims a little, but it never goes out. The message isn't 'you failed,' it's 'your flame is still here, want to rekindle it?' This small shift changes everything.\n\nOur data shows that users who experience a Lantern dim are 3x more likely to return the next day compared to users on streak-reset apps. Why? Because they're not starting over. They're continuing.",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Philosophy"
  },
  {
    id: 2,
    title: "Why We'll Never Let You Buy Sparks With Real Money",
    snippet: "Our ethical stance on gamification, and why earned-only rewards create genuine transformation instead of purchased dopamine hits.",
    fullContent: "When we designed SignRoad's reward system, we made a decision that cost us potential revenue: Sparks can never be purchased with real money.\n\nThis wasn't a business decision. It was an ethical one. Here's why.\n\nMost wellness apps use gamification borrowed from mobile games: currencies, badges, streaks. But they also borrow the monetization: you can buy your way ahead. This creates two problems.\n\nFirst, it devalues the currency. When someone can purchase 1,000 Sparks, your 500 earned Sparks feel worthless. You're not competing on effort anymore, you're competing on wallet size.\n\nSecond, it hijacks your dopamine system. Purchased rewards don't create the same neural pathways as earned rewards. You get a hit, but it doesn't reinforce the behavior you're trying to build.\n\nAt SignRoad, every Spark represents a moment of genuine effort. Every avatar upgrade, every ambience unlock, every badge, you earned it. When you see someone with a Cosmic Crown, you know they walked the road to get it.\n\nThis is what ethical gamification looks like: rewards that reinforce practice, not purchases.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    category: "Ethics"
  },
  {
    id: 3,
    title: "Signs vs. 'Just Coincidences': How to Use Daily Signs Without Losing Your Critical Thinking",
    snippet: "A grounded approach to the Sign mechanic that honors both your rational mind and your sense of wonder.",
    fullContent: "When SignRoad tells you to 'look for a white feather,' you might feel skeptical. Is this just magical thinking? Are we asking you to abandon your rational mind?\n\nNot at all. Here's how to think about signs in a way that honors both your critical thinking and your sense of wonder.\n\nThe Sign mechanic isn't about believing the universe is literally sending you messages. It's about attention. When you're looking for a white feather, you're not scrolling your phone. You're present. You're noticing the world around you.\n\nThis is a well-documented psychological phenomenon called 'selective attention.' When you prime your brain to look for something, you see more of it. The feathers were always there, you just weren't looking.\n\nBut here's where it gets interesting: when you log a sign, something shifts. You feel a small moment of connection, of meaning. Whether that's 'the universe responding' or 'your brain creating pattern recognition,' the effect is the same: you feel more engaged with your life.\n\nSignRoad doesn't ask you to believe in magic. We ask you to pay attention. The magic, if there is any, is in the attention itself.",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    category: "Philosophy"
  },
  {
    id: 4,
    title: "From Meditation Tracks to Manifestation Journeys: Why SignRoad is Built Like a 1,000-Step Road",
    snippet: "The design philosophy behind our journey structure, and why a road is more powerful than a library.",
    fullContent: "Most meditation apps are libraries. You browse, you pick a track, you listen. It's passive consumption, like Netflix for your mind.\n\nSignRoad is built differently. It's not a library, it's a road. Here's why that matters.\n\nA library has no direction. You can wander forever without going anywhere. A road has a destination. Every step moves you forward.\n\nWhen you start SignRoad, you're not browsing content. You're beginning a 1,000-step journey. Each day is a step. Each sign logged, each session completed, each Spark earned, moves you further down the road.\n\nThis structure creates something libraries can't: momentum. You're not just 'using an app,' you're 'on day 47 of your road.' You're not 'doing a meditation,' you're 'completing today's step.'\n\nThe road also creates accountability. Your Tribe walks with you. Your Lantern shows your progress. Your Universe Receipts prove how far you've come.\n\nLibraries are for browsing. Roads are for transformation. We built a road.",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 8, 2024",
    readTime: "5 min read",
    category: "Design"
  },
  {
    id: 5,
    title: "The Science of Accountability: Why 5-Person Tribes Work Better Than Solo Practice",
    snippet: "Research-backed insights into group accountability, and how SignRoad's Tribe system leverages social psychology for lasting change.",
    fullContent: "You're 65% more likely to achieve a goal if you commit to someone else. You're 95% more likely if you have a specific accountability appointment with that person. This isn't motivation speak, it's research from the American Society of Training and Development.\n\nSignRoad's Tribe system is built on this science. Here's how it works.\n\nA Tribe is exactly 5 people. Not 10, not 50, not a 'community.' Five. This number is intentional. It's small enough that you know everyone's name, large enough that the group survives if one person has a rough week.\n\nEvery day, you can see who in your Tribe showed up. Not their personal details, just their Lantern health and whether they completed today's step. This creates gentle social pressure without surveillance.\n\nWhen your Lantern dims, your Tribe can send you light. When you manifest something, your Tribe celebrates with you. When you're struggling, you're not alone.\n\nSolo practice is hard. Tribe practice is sustainable. That's not philosophy, that's psychology.",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Science"
  },
  {
    id: 6,
    title: "Universe Receipts: Why Proof Matters More Than Belief",
    snippet: "How SignRoad's shareable receipts turn subjective experiences into objective evidence, and why skeptics love them.",
    fullContent: "Manifestation has a credibility problem. It sounds like wishful thinking. 'I visualized it and it happened' isn't exactly scientific evidence.\n\nThat's why we built Universe Receipts. Here's what they do and why they matter.\n\nWhen you manifest something on SignRoad, you don't just celebrate privately. You generate a receipt that shows: what you manifested, how many days it took, how many signs you logged, how many sessions you completed, and the statistical probability you beat.\n\n'Sarah manifested: Dream job. 21 days. 18 signs. 24 sessions. Beat 91.7% odds.'\n\nThis isn't magic. It's math. We track your engagement and calculate the baseline probability of your outcome based on population data. When you beat those odds, we show you by how much.\n\nSkeptics love Universe Receipts because they're not asking you to believe anything. They're showing you data. You can decide what it means.\n\nBelievers love Universe Receipts because they're shareable proof. When your friend asks 'does this stuff actually work?' you can show them a receipt instead of trying to explain.\n\nProof matters more than belief. That's why we built receipts.",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 3, 2024",
    readTime: "5 min read",
    category: "Features"
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
      id="blog-section"
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
                {(activeBlog.fullContent || activeBlog.snippet).split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neumo-text leading-relaxed">{paragraph}</p>
                ))}
                
                <div className="pt-4 border-t border-neumo-border">
                  <p className="text-sm text-neumo-text-secondary mb-3">
                    Know someone who needs to read this? Share the road with them.
                  </p>
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="w-full px-4 py-3 bg-brand-teal text-white rounded-neumo font-medium shadow-teal-glow hover:bg-brand-teal-dark transition-all"
                  >
                    Share This Insight
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
