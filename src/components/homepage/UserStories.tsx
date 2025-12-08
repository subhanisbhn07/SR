import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Quote, Calendar, Star } from 'lucide-react';

interface Story {
  id: number;
  name: string;
  avatar: string;
  quote: string;
  story: string;
  fullStory: string;
  gradient: string;
  joinedDate: string;
  daysOnRoad: number;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "This app made me sleep again",
    story: "After months of insomnia, SignRoad's sleep meditations helped me find peace at night.",
    fullStory: `For six months, sleep was my enemy. I'd lie awake until 3 AM, my mind racing with worries about work, relationships, and the future. I tried everything - melatonin, white noise, even prescription sleep aids. Nothing worked.

Then a friend mentioned SignRoad. I was skeptical - how could an app fix what doctors couldn't?

But I gave it a try. The first night, I used the "Release the Day" meditation. I didn't fall asleep instantly, but something shifted. The racing thoughts slowed. I felt my shoulders drop from my ears.

By week two, I was sleeping through the night for the first time in months. Now, 90 days into my journey, I've completed 67 sleep sessions. My Lantern health is at 92.

The universe kept sending me signs too - a butterfly landed on my window the morning after my first full night's sleep. I took it as confirmation I was on the right path.

SignRoad didn't just help me sleep. It helped me trust that I deserve rest, peace, and good things.`,
    gradient: "from-purple-500/10 to-pink-500/10",
    joinedDate: "September 2024",
    daysOnRoad: 90
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "I manifested my dream job",
    story: "The abundance meditations shifted my mindset and opened doors I never imagined.",
    fullStory: `I'd been stuck in a job I hated for five years. Every morning felt like dragging myself through mud. I knew I deserved better, but I couldn't see how to get there.

SignRoad's abundance road changed everything.

I started with the "Open to Receiving" meditation. It felt strange at first - visualizing success, feeling worthy of good things. But I committed to 7 minutes every morning.

Within three weeks, I noticed I was speaking up more in meetings. I updated my resume for the first time in years. I started networking.

Then the signs started appearing. I kept seeing 444 everywhere - on clocks, receipts, license plates. I logged each one in the app.

Six weeks into my journey, a recruiter reached out about my dream position at a company I'd admired for years. The interview felt effortless - like I was meant to be there.

I got the offer. 40% salary increase. Remote work. A team that respects me.

The universe was listening. I just had to show up and believe I was worthy.`,
    gradient: "from-green-500/10 to-teal-500/10",
    joinedDate: "July 2024",
    daysOnRoad: 142
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "My anxiety is finally manageable",
    story: "Daily practice with SignRoad gave me tools to handle stress with grace and confidence.",
    fullStory: `Anxiety had controlled my life since I was 16. Panic attacks in grocery stores. Avoiding phone calls. Canceling plans because leaving my apartment felt impossible.

I'd tried therapy (helpful, but expensive). I'd tried medication (side effects were worse than the anxiety). I needed something I could do myself, every day, that would actually help.

SignRoad's anxiety road became my lifeline.

The breathing exercises were game-changers. 4-7-8 breathing during a panic attack? Actually works. The "Ground Yourself" meditation before stressful situations? I use it before every meeting now.

But what surprised me most was the signs practice. Anxiety tells you the universe is against you. SignRoad helped me see the universe is actually sending support constantly - I just wasn't paying attention.

Now when I feel anxious, I look for a sign. Usually I find one within minutes. A song on the radio. A word on a billboard. It reminds me I'm not alone.

My anxiety isn't gone, but it's manageable. I answer my phone. I go to parties. I live my life.

That's everything.`,
    gradient: "from-blue-500/10 to-cyan-500/10",
    joinedDate: "October 2024",
    daysOnRoad: 58
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Found my inner peace",
    story: "SignRoad helped me reconnect with myself after years of feeling lost and disconnected.",
    fullStory: `After my divorce, I didn't know who I was anymore. Twenty years of marriage, and suddenly I was alone in an empty apartment, wondering what I even wanted from life.

A colleague mentioned she used SignRoad every morning. "It helps me feel centered," she said. I figured I had nothing to lose.

The first week was hard. Sitting in silence with my thoughts? Painful. But I kept showing up. 7 minutes became 15, became 20.

I chose the Inner Peace road. The meditations helped me process grief I'd been avoiding for years. Not just about the divorce - about my father's death, about career regrets, about the person I'd become.

The journal prompts cracked me open. "What would you tell your younger self?" That one made me cry for an hour.

But slowly, I started to feel like myself again. Or maybe for the first time.

I'm on day 180 now. My Lantern is at 89. I've found 47 signs. I've set 12 manifestation goals and achieved 8 of them.

Most importantly, I wake up excited for the day. I never thought I'd feel that again.`,
    gradient: "from-orange-500/10 to-amber-500/10",
    joinedDate: "June 2024",
    daysOnRoad: 180
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Healed my relationship",
    story: "The forgiveness meditations helped me let go of resentment and rebuild trust.",
    fullStory: `My husband and I were on the edge of separation. Ten years of marriage, three kids, and we could barely look at each other. The resentment had built up like a wall between us.

I didn't come to SignRoad looking for relationship help. I just needed something for my stress. But the Healing road found me.

The forgiveness meditations were the hardest things I've ever done. Forgiving myself for my part in our problems. Forgiving him for his. It wasn't instant - it took weeks of daily practice.

But something shifted. I started seeing my husband differently. Not as the enemy, but as someone who was also struggling, also hurting.

One night, after a "Release Resentment" meditation, I went downstairs and just... talked to him. Really talked. We cried. We apologized. We started over.

That was four months ago. We're not perfect - no marriage is. But we're connected again. We do morning meditations together now. We look for signs together.

Our kids have noticed. "Mom and Dad are happy again," my daughter said last week.

That's the best sign of all.`,
    gradient: "from-rose-500/10 to-pink-500/10",
    joinedDate: "August 2024",
    daysOnRoad: 112
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Doubled my productivity",
    story: "Morning rituals and focus sessions transformed how I approach my work and goals.",
    fullStory: `As a startup founder, I was burning out. Eighteen-hour days, constant firefighting, never feeling like I was doing enough. I was productive by quantity, but the quality was suffering.

A mentor suggested I try meditation. "You can't pour from an empty cup," he said. I rolled my eyes but gave SignRoad a try.

The Productivity & Focus road was exactly what I needed. Not more hustle tips - actual mental clarity practices.

I started with the morning ritual: 7 minutes of intention-setting before I check email. It felt like "wasted" time at first. But within two weeks, I noticed I was making better decisions faster.

The "Deep Focus" sessions before important work? Game-changer. I started finishing in 2 hours what used to take 6.

But the real shift was in my relationship with work. I stopped measuring success by hours worked. I started measuring by problems solved, value created, energy maintained.

Three months in, my startup hit profitability. I'm working 8-hour days now. I have hobbies again. I see my family.

Turns out, the key to productivity isn't doing more - it's being present for what matters.`,
    gradient: "from-indigo-500/10 to-violet-500/10",
    joinedDate: "May 2024",
    daysOnRoad: 210
  }
];

interface UserStoriesProps {
  compact?: boolean;
}

export const UserStories: React.FC<UserStoriesProps> = ({ compact = false }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Show fewer stories in compact mode
  const displayStories = compact ? stories.slice(0, 3) : stories;

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
            <p className="text-teal-500 dark:text-teal-400 text-lg mb-2">"This app made me sleep again."</p>
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
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStory(story)}
              className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-teal-200 dark:border-teal-700/50 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:border-teal-400 dark:hover:border-teal-500 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-teal-200 dark:ring-teal-700 group-hover:ring-teal-400 dark:group-hover:ring-teal-500 transition-all"
                />

                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{story.name}</h3>
                <p className="text-teal-500 dark:text-teal-400 font-medium text-xs mb-2">"{story.quote}"</p>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs mb-3 line-clamp-2">{story.story}</p>

                <button className="flex items-center space-x-1 text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors duration-200 group/btn">
                  <span className="text-xs font-medium">Read Story</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${selectedStory.gradient} p-6 relative`}>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-700 dark:text-white" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={selectedStory.avatar}
                    alt={selectedStory.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white/50"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{selectedStory.name}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {selectedStory.joinedDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
                        <Star className="w-4 h-4" />
                        <span>{selectedStory.daysOnRoad} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <Quote className="w-6 h-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                  <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 italic">
                    "{selectedStory.quote}"
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {selectedStory.fullStory.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    Share your story too - every journey matters.
                  </p>
                  <button
                    onClick={() => setSelectedStory(null)}
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
