import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "I stopped feeling like a failure every time I missed a day",
    story: "I'd tried Calm, Headspace, every meditation app out there. The pattern was always the same: I'd build a 30-day streak, miss one day, watch it reset to zero, and feel so ashamed I'd quit entirely.",
    fullStory: "I'd tried Calm, Headspace, every meditation app out there. The pattern was always the same: I'd build a 30-day streak, miss one day, watch it reset to zero, and feel so ashamed I'd quit entirely.\n\nSignRoad's Lantern changed everything. When I missed my first day, I braced for the guilt. Instead, my Lantern just dimmed a little. The app said: 'Your flame is still here. Want to rekindle it in 3 minutes?'\n\nI cried. For the first time, an app wasn't punishing me for being human. My Lantern is at 89% now, and I've been on the road for 67 days. Not because I'm perfect, but because I'm allowed to be imperfect.",
    differentiator: "lantern",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "The white feather that changed my career",
    story: "Day 3 on SignRoad, my sign was 'look for a white feather.' I laughed it off as silly. Then I saw one stuck to my car windshield that morning, right before a job interview I almost skipped.",
    fullStory: "Day 3 on SignRoad, my sign was 'look for a white feather.' I laughed it off as silly. Then I saw one stuck to my car windshield that morning, right before a job interview I almost skipped.\n\nI took it as a sign to go. I got the job. Coincidence? Maybe. But something shifted in me that day. I started paying attention to the world around me, looking for signs instead of scrolling through my phone.\n\nOver 21 days, I logged 18 signs. Each one felt like the universe winking at me. When I got the offer letter, I created my first Universe Receipt: 'Dream job manifested. 21 days. 18 signs. Beat 91.7% odds.'\n\nMy friends thought I was crazy until they saw the receipt. Now three of them are on the road with me.",
    differentiator: "signs",
    gradient: "from-green-500/10 to-teal-500/10"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "My tribe carried me through the hardest month of my life",
    story: "When my mother was diagnosed, I almost abandoned my road. But my tribe of 5 strangers-turned-friends kept showing up for me, checking in daily, keeping my Lantern lit when I couldn't.",
    fullStory: "When my mother was diagnosed with cancer, I almost abandoned my road. I couldn't focus on manifestation when my world was falling apart.\n\nBut my tribe of 5 strangers-turned-friends kept showing up for me. Sarah sent me a voice note every morning. James logged signs 'on my behalf' to keep my spirits up. When I finally logged back in after a week, my Lantern had dimmed to 34%, but it was still there.\n\nMy tribe had been sending me light the whole time. I could see their names in my notifications: 'Elena's tribe is thinking of her.'\n\nI'm on day 89 now. My mother is in remission. And those 5 strangers? They're coming to her recovery party next month. SignRoad didn't just give me a meditation app. It gave me a family.",
    differentiator: "tribes",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "I finally have proof that this stuff works",
    story: "I was a skeptic. 'Manifestation is just wishful thinking,' I'd say. Then SignRoad gave me a Universe Receipt showing I'd beaten 94.8% odds. Hard to argue with math.",
    fullStory: "I was a skeptic. 'Manifestation is just wishful thinking,' I'd say. My wife dragged me onto SignRoad, and I rolled my eyes through the first week.\n\nBut I kept logging signs. I kept doing the micro-sessions. And when I finally paid off my student loans after 45 days on the road, SignRoad generated something I didn't expect: a Universe Receipt.\n\n'James manifested: Debt freedom. 45 days. 32 signs logged. 24 sessions completed. Probability beaten: 94.8%.'\n\nI stared at that receipt for ten minutes. It wasn't magic. It was math. The app had tracked everything: my consistency, my engagement, the statistical likelihood of my outcome. And I had beaten the odds.\n\nI shared that receipt everywhere. Now I'm the guy who won't shut up about SignRoad. My wife just smiles.",
    differentiator: "receipt",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Other apps made me feel broken. This one made me feel human.",
    story: "Every meditation app I tried felt like homework. Miss a day? Failure. Skip a session? Lazy. SignRoad was the first app that met me where I was, not where I 'should' be.",
    fullStory: "Every meditation app I tried felt like homework. Miss a day? Failure. Skip a session? Lazy. The gamification felt like manipulation, not motivation.\n\nSignRoad was different from day one. When I earned my first Sparks, I noticed something: there was no option to buy more with real money. The app explicitly said: 'Sparks are earned only. Your progress can't be purchased.'\n\nThat small detail changed everything. I wasn't competing with people who could pay to win. My 500 Sparks meant 500 moments of genuine effort. My Golden Aura avatar upgrade? I earned it.\n\nAnd when my Lantern dimmed after a rough week, the app didn't shame me. It said: 'Your flame is still here. It always will be.'\n\nFor the first time, a wellness app felt like it was actually on my side.",
    differentiator: "lantern",
    gradient: "from-rose-500/10 to-pink-500/10"
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "The red door that led to my business",
    story: "My sign on day 7 was 'look for a red door.' I found one at a coffee shop I'd never noticed. Inside, I met my future business partner. 60 days later, we launched our company.",
    fullStory: "My sign on day 7 was 'look for a red door.' I almost ignored it, but something made me pay attention that day.\n\nI found one at a coffee shop I'd walked past a hundred times but never entered. Inside, I sat next to a woman working on a business plan eerily similar to an idea I'd been sitting on for years. We started talking. By the end of the coffee, we'd exchanged numbers.\n\n60 days later, we launched our company together. The Universe Receipt I generated that day is framed on our office wall: 'David manifested: Business partnership. 60 days. 48 signs. Beat 96.5% odds.'\n\nPeople ask if I really believe the red door was a 'sign from the universe.' I tell them: it doesn't matter what I believe. What matters is that I was paying attention. SignRoad taught me to look up from my phone and notice the world. The red door was always there. I just finally saw it.",
    differentiator: "signs",
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
      
      <div className={`grid ${compact ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
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
              <p className="text-neumo-text-secondary text-xs mb-3 line-clamp-3">{story.story}</p>
              
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
                {(activeStory.fullStory || activeStory.story).split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neumo-text leading-relaxed">{paragraph}</p>
                ))}
                
                <div className="pt-4 border-t border-neumo-border">
                  <p className="text-sm text-neumo-text-secondary mb-3">
                    Ready to start your own transformation journey?
                  </p>
                  <button
                    onClick={() => setActiveStory(null)}
                    className="w-full px-4 py-3 bg-brand-teal text-white rounded-neumo font-medium shadow-teal-glow hover:bg-brand-teal-dark transition-all"
                  >
                    Start Your Free Road
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
