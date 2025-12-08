import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X, Clock, BookOpen } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  snippet: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "7 Micro-Habits That Rewire Limiting Beliefs",
    snippet: "Small daily actions that create profound shifts in your mindset and reality.",
    content: `Have you ever felt stuck in patterns that don't serve you? The good news is that small, consistent actions can create massive change over time.

**1. Morning Gratitude Practice**
Before checking your phone, list three things you're grateful for. This simple habit rewires your brain to focus on abundance rather than lack.

**2. The Two-Minute Visualization**
Spend just two minutes each morning visualizing your ideal day. See yourself succeeding, feeling confident, and attracting what you desire.

**3. Affirmation Anchoring**
Attach affirmations to existing habits. Every time you brush your teeth, repeat: "I am worthy of all good things."

**4. The Abundance Journal**
At night, write down three ways abundance showed up in your day - a smile from a stranger, a sale at your favorite store, or an unexpected opportunity.

**5. Limiting Belief Flip**
When you catch a limiting thought, immediately flip it. "I can't" becomes "How can I?"

**6. The 5-Second Rule**
When hesitation strikes, count 5-4-3-2-1 and take action. This interrupts the fear pattern.

**7. Evening Intention Setting**
Before sleep, set one clear intention for tomorrow. Your subconscious will work on it overnight.

Start with just one micro-habit this week. Small steps lead to quantum leaps.`,
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "A Letter to the Version of Me That Gave Up",
    snippet: "A heartfelt reflection on resilience, growth, and the power of never giving up on yourself.",
    content: `Dear Past Me,

I know you're tired. I know the weight of disappointment feels unbearable, and the gap between where you are and where you want to be seems impossible to bridge.

But I'm writing to you from the other side.

**The truth about rock bottom**
It wasn't the end. It was the foundation upon which you would build something beautiful. Every tear, every moment of doubt, every time you wanted to quit - they were all part of your becoming.

**What you couldn't see then**
The universe wasn't ignoring your prayers. It was redirecting you. That job you didn't get? It led you somewhere better. That person who left? They made room for someone who would stay.

**The strength you didn't know you had**
You survived every bad day. You woke up every morning even when you didn't want to. That's not weakness - that's extraordinary resilience.

**What I want you to know**
You are exactly where you need to be. Trust the timing of your life. The signs are everywhere, guiding you home.

Keep going. Your future self is cheering you on.

With love,
The You Who Made It`,
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 12, 2024",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Science Behind Manifestation: What Really Works",
    snippet: "Evidence-based insights into how visualization and intention setting create real change.",
    content: `Is manifestation just wishful thinking, or is there science behind it? The research might surprise you.

**The Reticular Activating System (RAS)**
Your brain has a filter called the RAS that decides what information to bring to your attention. When you set clear intentions, you're programming this filter to notice opportunities aligned with your goals.

**Neuroplasticity and Visualization**
Studies show that visualizing an action activates the same neural pathways as actually performing it. Olympic athletes have used this for decades - and you can too.

**The Placebo Effect of Belief**
Research demonstrates that belief itself can create physiological changes. Your expectations shape your reality more than you might think.

**Practical Application**
1. Be specific about what you want
2. Visualize with emotion and sensory detail
3. Take aligned action - manifestation isn't passive
4. Trust the process while remaining flexible

**What Doesn't Work**
Manifesting without action, ignoring practical steps, or using it to avoid responsibility. Manifestation is a partnership between intention and effort.

The universe responds to clarity, consistency, and committed action.`,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 10, 2024",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Morning Rituals of Highly Successful Manifestors",
    snippet: "Discover the daily practices that set the foundation for attracting abundance.",
    content: `The first hour of your day sets the tone for everything that follows. Here's how successful manifestors start their mornings.

**5:30 AM - Wake Without Alarm (When Possible)**
Many report that waking naturally allows them to start in a relaxed state rather than fight-or-flight mode.

**5:35 AM - Gratitude Before Device**
Before touching your phone, think of three specific things you're grateful for. This primes your brain for positivity.

**5:45 AM - Movement**
Whether it's yoga, walking, or stretching, moving your body awakens your energy and clears stagnant emotions.

**6:00 AM - Meditation & Visualization**
15-20 minutes of quiet visualization. See your goals as already achieved. Feel the emotions of success.

**6:20 AM - Journaling**
Write your intentions for the day. Some write as if their manifestations have already happened.

**6:40 AM - Affirmations**
Speak your truth out loud. "I am magnetic to abundance. I attract opportunities effortlessly."

**7:00 AM - Fuel Your Body**
Nourish yourself with foods that give you energy, not drain it.

Start with one practice and build from there. Consistency beats intensity.`,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 8, 2024",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "How to Trust the Universe When Nothing Makes Sense",
    snippet: "Finding faith in the journey even when the path seems unclear and uncertain.",
    content: `Sometimes the universe's plan feels like chaos. Here's how to maintain trust when life doesn't make sense.

**Recognize the Pattern**
Look back at your life. How many times did something that seemed terrible lead to something better? That pattern didn't stop - you just can't see the next chapter yet.

**Surrender the Timeline**
Your dreams are coming, but perhaps not on your schedule. The universe has a way of delivering at the perfect moment - which is rarely when we think we're ready.

**Find the Lesson**
Instead of asking "Why is this happening to me?" try "What is this teaching me?" Every challenge carries a gift if we're willing to look.

**Trust the Signs**
Pay attention to synchronicities, repeated numbers, or unexpected encounters. The universe communicates constantly - we just need to listen.

**Practice Patience**
Trees don't rush their growth. Babies don't hurry their development. Why do we expect our dreams to manifest instantly?

**Daily Reminders**
- "Everything is working out for my highest good"
- "I trust the timing of my life"
- "What's meant for me cannot miss me"

Uncertainty is uncomfortable, but it's also where transformation happens.`,
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 5, 2024",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "The Power of Gratitude in Manifestation",
    snippet: "Why appreciation is the secret ingredient to attracting more of what you want.",
    content: `Gratitude isn't just a nice feeling - it's a manifestation accelerator. Here's the science and practice of grateful living.

**The Frequency of Gratitude**
Everything is energy, including your thoughts. Gratitude vibrates at a high frequency, attracting more things to be grateful for. It's the law of attraction in action.

**Rewiring Your Brain**
Studies show that regular gratitude practice literally changes your brain. It increases dopamine and serotonin, the same neurotransmitters targeted by antidepressants.

**The Gratitude-Manifestation Connection**
When you're grateful for what you have, you're telling the universe "more of this, please." You're embodying the energy of already having what you desire.

**Practical Gratitude Practices**

*Morning Gratitude*
Before your feet hit the floor, name three things you're grateful for.

*Gratitude Journal*
Every night, write five specific things from your day. Not just "my family" but "the way my daughter laughed at dinner."

*Gratitude Letters*
Write letters to people who've impacted your life. You don't even have to send them.

*Gratitude Walks*
Walk slowly and notice everything you're grateful for - the trees, the air, your ability to walk.

Start where you are. Gratitude transforms what you have into more than enough.`,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 3, 2024",
    readTime: "5 min read"
  }
];

interface BlogSectionProps {
  compact?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ compact = false }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Show fewer blogs in compact mode
  const displayBlogs = compact ? blogs.slice(0, 3) : blogs;

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-neutral-900 dark:text-white text-lg mt-6 mb-3">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <p key={index} className="font-medium text-teal-600 dark:text-teal-400 mt-4 mb-2">
            {line.replace(/\*/g, '')}
          </p>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <>
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
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBlog(blog)}
              className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 shadow-sm"
            >
              <div className="flex flex-col">
                <div
                  className="w-full aspect-video rounded-xl bg-cover bg-center mb-3 group-hover:scale-[1.02] transition-transform duration-300"
                  style={{ backgroundImage: `url(${blog.image})` }}
                />

                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200 line-clamp-2">
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

                  <div className="flex items-center gap-1 text-xs text-teal-500 dark:text-teal-400 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div
                className="w-full h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${selectedBlog.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white mb-2">{selectedBlog.title}</h2>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedBlog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {formatContent(selectedBlog.content)}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <BookOpen className="w-4 h-4" />
                    <span>From SignRoad Insights</span>
                  </div>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Close
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
