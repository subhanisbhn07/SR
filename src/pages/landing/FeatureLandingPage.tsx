import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Check, Eye, Target, MessageCircle, Receipt, Clock, Sparkles, Moon, Headphones } from 'lucide-react';
import { useAffinityStore, AffinityType } from '../../store/affinityStore';
import { useConfigStore } from '../../store/configStore';

// Landing page content configurations for each funnel type
const landingPageConfigs = {
  'universe-receipts': {
    hero: {
      h1: 'Finally, manifestation with receipts you can actually look at.',
      sub: "SignRoad turns your goals into shareable 'Universe Receipts' that show the days, signs, and odds you beat—so it doesn't just feel like magic, it looks like evidence.",
      cta: 'See how your first 7 receipts are born'
    },
    spotlight: {
      headline: 'Stop forgetting the wins the universe already sent.',
      bullets: [
        "Log each sign you notice—white feathers, repeating numbers, 'impossible' coincidences",
        'When a goal manifests, SignRoad auto-builds a Universe Receipt with days, signs, sessions',
        'See "odds beaten" so your logical side finally has something concrete to point to'
      ],
      story: {
        title: 'The red door that led to a new business',
        quote: 'I kept seeing red doors everywhere for 3 weeks. On day 21, I walked through one—it was the office where I signed my first client.',
        name: 'Marcus T.',
        result: 'Manifested: First $10K client'
      }
    },
    allFeatures: {
      headline: 'Receipts are the proof. The road around them does the work.',
      tiles: [
        { icon: Clock, title: 'Daily 10-minute ritual', desc: 'One audio session, one sign to find' },
        { icon: Eye, title: 'One sign to watch for', desc: 'Assigned daily based on your road' },
        { icon: MessageCircle, title: 'Daily message + audio', desc: 'Grounded guidance that lands' },
        { icon: Sparkles, title: 'Lantern that never resets', desc: 'Miss a day? Pick up where you left off' },
        { icon: Target, title: '5-person Tribe', desc: 'Accountability without judgment' }
      ]
    },
    closingCta: {
      headline: 'Start logging your next 7 signs.',
      sub: 'If nothing happens, you lose 10 minutes a day. If it works, you\'ll have receipts.',
      button: 'Start Your 7-Day Free Trial'
    }
  },
  'daily-message': {
    hero: {
      h1: 'One message a day that lands like it was written just for you.',
      sub: 'Each morning, SignRoad sends you a short, grounded message that feels eerily on-point—then backs it up with a sign to watch for and a simple action.',
      cta: "Get tomorrow's message free"
    },
    spotlight: {
      headline: 'Not fluffy affirmations. Grounded guidance + one tiny move.',
      bullets: [
        'Written to match where most people actually are—tired, hopeful, not perfect',
        'Each message pairs with a tangible sign and a micro-session so it doesn\'t stay in your head',
        'Feels personal because it speaks to real struggles, not generic positivity'
      ],
      story: {
        title: 'The message that changed everything',
        quote: 'The message said "Today, notice what you\'ve been avoiding." I finally made the call I\'d been putting off for months. Got the job.',
        name: 'Aisha K.',
        result: 'Manifested: Dream job in 18 days'
      }
    },
    allFeatures: {
      headline: 'Your daily message sits on top of a whole road.',
      tiles: [
        { icon: Receipt, title: 'Universe Receipts', desc: 'Proof when things manifest' },
        { icon: Headphones, title: 'Daily audio', desc: '10-minute guided sessions' },
        { icon: Moon, title: 'Sleep Orb', desc: '12 soundscapes for rest' },
        { icon: Target, title: 'Tribe', desc: '5-person accountability group' },
        { icon: Sparkles, title: 'Sparks', desc: 'Rewards for consistency' }
      ]
    },
    closingCta: {
      headline: 'Tell us where you are right now.',
      sub: 'SignRoad will send you the next 7 days of messages to see if they land.',
      button: 'Start Your 7-Day Free Trial'
    }
  },
  'daily-audio': {
    hero: {
      h1: 'Stop scrolling through a library. Get one 10-minute audio picked for today.',
      sub: 'No more choice paralysis. SignRoad queues one short session that fits where you are on your road—so you can press play and get on with life.',
      cta: 'Try your first 7 daily audios'
    },
    spotlight: {
      headline: 'Guided, but not needy. Powerful, but only 10 minutes.',
      bullets: [
        'One daily audio: not 500 tracks to choose from',
        'Aligned with your current sign + goal',
        'Built for real life: miss days without losing your streak or starting over'
      ],
      story: {
        title: '10 minutes that compound',
        quote: 'I tried Calm, Headspace, all of them. Too many choices. SignRoad just tells me what to listen to today. 34 days later, I landed my first client.',
        name: 'Ryan K.',
        result: 'Manifested: $10K contract'
      }
    },
    allFeatures: {
      headline: 'Each audio sits inside a living road.',
      tiles: [
        { icon: Eye, title: 'Sign to watch', desc: 'One sign assigned daily' },
        { icon: Receipt, title: 'Universe Receipts', desc: 'Proof when it manifests' },
        { icon: Sparkles, title: 'Lantern progress', desc: 'Never resets to zero' },
        { icon: Target, title: 'Tribe', desc: '5-person support group' },
        { icon: Moon, title: 'Sleep Orb', desc: 'Wind down at night' }
      ]
    },
    closingCta: {
      headline: "Listen to tonight's 10-minute session.",
      sub: "If it doesn't land, you're out 10 minutes. If it does, you've started your road.",
      button: 'Start Your 7-Day Free Trial'
    }
  },
  'sleep-orb': {
    hero: {
      h1: "An orb you tap when your mind won't switch off.",
      sub: 'Pick from 12 background soundscapes and let the Sleep Orb fade them out on a timer so you drift off without staring at a clock.',
      cta: 'Try the Sleep Orb tonight'
    },
    spotlight: {
      headline: 'Built for 3 a.m. brains, not perfect monks.',
      bullets: [
        "You don't need to 'meditate correctly.' You need your mind to unclench.",
        'Choose your sound (ocean waves, soft rain, cosmic hum…) and set your orb timer',
        "We remember your favorites so you can start in two taps when you're half asleep"
      ],
      story: {
        title: 'From 3 a.m. spirals to actual rest',
        quote: 'Instead of late-night phone spirals or replaying the day, my ritual became: tap orb, breathe, drift. First good sleep in months.',
        name: 'Emma R.',
        result: 'Better sleep in 3 nights'
      }
    },
    allFeatures: {
      headline: 'When you wake, the road is waiting for you.',
      tiles: [
        { icon: Eye, title: "Today's sign", desc: 'One sign to watch for' },
        { icon: MessageCircle, title: "Today's message", desc: 'Grounded daily guidance' },
        { icon: Receipt, title: 'Universe Receipts', desc: 'Proof when goals manifest' },
        { icon: Target, title: 'Tribes', desc: '5-person accountability' },
        { icon: Sparkles, title: 'Sparks', desc: 'Rewards for showing up' }
      ]
    },
    closingCta: {
      headline: 'Give us three nights.',
      sub: "If you don't fall asleep easier, you can walk away. If you do, your road is here when you're ready.",
      button: 'Start Your 7-Day Free Trial'
    }
  },
  'platform': {
    hero: {
      h1: 'A 1,000-step road where signs, rituals, and proof all live in one place.',
      sub: 'SignRoad gives you a daily sign to watch for, a 10-minute ritual, a lantern that never resets to zero, a tribe that checks in, and Universe Receipts when things actually manifest.',
      cta: 'Start your free road'
    },
    spotlight: {
      headline: 'Everything you need for structured manifestation.',
      bullets: [
        'Daily sign + message + audio: your 10-minute ritual',
        'Lantern progress that dims but never resets—miss a day without losing everything',
        'Universe Receipts: shareable proof when goals manifest'
      ],
      story: {
        title: 'From skeptic to believer',
        quote: 'I was skeptical at first, but after finding my third sign in one week, I knew something was different. Manifested my dream job in 18 days.',
        name: 'Jessica M.',
        result: 'Manifested: Dream job at tech startup'
      }
    },
    allFeatures: {
      headline: 'Your complete manifestation system.',
      tiles: [
        { icon: Eye, title: 'Daily signs', desc: 'One sign to watch for each day' },
        { icon: MessageCircle, title: 'Daily message', desc: 'Grounded guidance that lands' },
        { icon: Headphones, title: 'Daily audio', desc: '10-minute guided sessions' },
        { icon: Receipt, title: 'Universe Receipts', desc: 'Proof when it manifests' },
        { icon: Moon, title: 'Sleep Orb', desc: '12 soundscapes for rest' }
      ]
    },
    closingCta: {
      headline: 'Take your first 7 steps.',
      sub: 'No credit card. If nothing shifts, you lost 70 minutes. If it works, you\'ll have receipts.',
      button: 'Start Your 7-Day Free Trial'
    }
  }
};

interface FeatureLandingPageProps {
  affinityType: AffinityType;
  onGetStarted: () => void;
}

export const FeatureLandingPage: React.FC<FeatureLandingPageProps> = ({ affinityType, onGetStarted }) => {
  const { setAffinity, setUtmParams } = useAffinityStore();
  const { freeTrialDays } = useConfigStore();

  // Get config for this landing page type
  const config = landingPageConfigs[affinityType || 'platform'];

  // Set affinity and capture UTM params on mount
  useEffect(() => {
    if (affinityType) {
      setAffinity(affinityType);
    }
    
    // Capture UTM params from URL
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams(
      urlParams.get('utm_source'),
      urlParams.get('utm_medium'),
      urlParams.get('utm_campaign')
    );
  }, [affinityType, setAffinity, setUtmParams]);

  const handleGetStarted = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onGetStarted();
  };

  // Sample receipts for display
  const signReceipts = [
    { signSpotted: 'White feather on doorstep', dayOnRoad: 3, synchronicityScore: 89 },
    { signSpotted: '11:11 on the clock', dayOnRoad: 7, synchronicityScore: 94 },
  ];

  const goalReceipts = [
    { manifested: 'New job at dream company', days: 21, signs: 18, probability: 91.7 },
    { manifested: 'Found my soulmate', days: 45, signs: 32, probability: 87.3 },
  ];

  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neumo-bg/95 backdrop-blur-sm border-b border-neumo-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neumo-accent rounded-full flex items-center justify-center shadow-neumo-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-neumo-text">SignRoad</span>
          </div>
          <button
            onClick={handleGetStarted}
            className="px-4 py-2 bg-neumo-accent text-white text-sm font-medium rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
          >
            Login / Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neumo-text mb-6 leading-tight">
              {config.hero.h1}
            </h1>
            
            <p className="text-lg md:text-xl text-neumo-text-secondary mb-8 max-w-3xl mx-auto">
              {config.hero.sub}
            </p>

            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-neumo-accent text-white text-lg font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all inline-flex items-center gap-3"
            >
              {config.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-neumo-text-secondary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Spotlight Section (50%) */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neumo-text mb-8">
              {config.spotlight.headline}
            </h2>
            
            <div className="space-y-4 mb-10">
              {config.spotlight.bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-neumo-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-neumo-accent" />
                  </div>
                  <p className="text-neumo-text-secondary">{bullet}</p>
                </motion.div>
              ))}
            </div>

            {/* Story Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
            >
              <h3 className="font-semibold text-neumo-text mb-3">{config.spotlight.story.title}</h3>
              <p className="text-neumo-text-secondary italic mb-4">"{config.spotlight.story.quote}"</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neumo-text-muted">— {config.spotlight.story.name}</span>
                <span className="text-xs px-2 py-1 bg-neumo-accent/10 text-neumo-accent rounded-full">
                  {config.spotlight.story.result}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* All Features Strip (50%) */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neumo-text mb-4">
              {config.allFeatures.headline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {config.allFeatures.tiles.map((tile, index) => {
              const Icon = tile.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neumo-bg rounded-neumo-lg p-4 shadow-neumo text-center"
                >
                  <div className="w-10 h-10 bg-neumo-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-neumo-accent" />
                  </div>
                  <h3 className="font-semibold text-neumo-text text-sm mb-1">{tile.title}</h3>
                  <p className="text-xs text-neumo-text-secondary">{tile.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Receipts Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neumo-text mb-4">
              Universe Receipts: Your Proof
            </h2>
            <p className="text-neumo-text-secondary max-w-2xl mx-auto">
              Two types of shareable receipts: one for signs you spot, one for goals you manifest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sign Receipt Example */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-4 shadow-neumo"
            >
              <div 
                className="rounded-neumo overflow-hidden"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  backgroundColor: '#f8f5f0'
                }}
              >
                <div className="w-full h-3 flex items-center">
                  <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#d4cfc5' }}></div>
                </div>
                <div className="px-5 py-4">
                  <h4 className="text-center text-lg font-bold tracking-[0.2em] mb-2" style={{ color: '#4a5568' }}>
                    SIGN RECEIPT
                  </h4>
                  <div className="text-center mb-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] rounded-full" style={{ backgroundColor: '#e8e4dc', color: '#718096' }}>
                      A sign has appeared
                    </span>
                  </div>
                  <p className="text-center text-sm italic mb-4" style={{ color: '#718096' }}>
                    The cosmos has sent you a sign
                  </p>
                  <div className="text-center mb-4">
                    <p className="text-xs mb-1" style={{ color: '#a0aec0' }}>sign spotted:</p>
                    <p className="text-base font-bold" style={{ color: '#2d3748' }}>
                      "{signReceipts[0].signSpotted}"
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#718096' }}>Synchronicity score:</p>
                    <p className="text-2xl font-bold" style={{ color: '#4a5568' }}>{signReceipts[0].synchronicityScore}%</p>
                  </div>
                </div>
                <div className="w-full h-3 flex items-center">
                  <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#d4cfc5' }}></div>
                </div>
              </div>
            </motion.div>

            {/* Goal Receipt Example */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-4 shadow-neumo"
            >
              <div 
                className="rounded-neumo overflow-hidden"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  backgroundColor: '#f5f0e8'
                }}
              >
                <div className="w-full h-3 flex items-center">
                  <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#c4b8a8' }}></div>
                </div>
                <div className="px-5 py-4">
                  <h4 className="text-center text-lg font-bold tracking-[0.2em] mb-2" style={{ color: '#2d3748' }}>
                    GOAL RECEIPT
                  </h4>
                  <div className="text-center mb-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] rounded-full" style={{ backgroundColor: '#e6f4f4', color: '#0E7A77' }}>
                      A manifestation completed
                    </span>
                  </div>
                  <p className="text-center text-sm italic mb-4" style={{ color: '#4a5568' }}>
                    The cosmos has delivered
                  </p>
                  <div className="text-center mb-4">
                    <p className="text-xs mb-1" style={{ color: '#718096' }}>manifested:</p>
                    <p className="text-base font-bold" style={{ color: '#2d3748' }}>
                      "{goalReceipts[0].manifested}"
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#4a5568' }}>Probability beaten:</p>
                    <p className="text-2xl font-bold" style={{ color: '#2d3748' }}>{goalReceipts[0].probability}%</p>
                  </div>
                </div>
                <div className="w-full h-3 flex items-center">
                  <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#c4b8a8' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neumo-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-neumo-text-secondary">
              Start free for {freeTrialDays} days. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
            >
              <h3 className="text-lg font-semibold text-neumo-text mb-1">Monthly</h3>
              <p className="text-xs text-neumo-text-muted mb-4">Angel number pricing</p>
              <p className="text-4xl font-bold text-neumo-text mb-6">
                $11.11 <span className="text-lg font-normal text-neumo-text-secondary">/month</span>
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'All 1000+ sequential audio lessons',
                  '3 active signs to find',
                  'Unlimited goals & receipts',
                  'Tribe access',
                  '12 background sounds',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neumo-text-secondary">
                    <Check className="w-4 h-4 text-neumo-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 bg-neumo-bg text-neumo-text font-semibold rounded-neumo shadow-neumo hover:shadow-neumo-inset transition-all"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Annual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo border-2 border-neumo-accent relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-neumo-accent text-white text-xs font-semibold rounded-full">
                Save 33%
              </div>
              <h3 className="text-lg font-semibold text-neumo-text mb-1">Annual</h3>
              <p className="text-xs text-neumo-text-muted mb-4">That's just $7.40/month</p>
              <p className="text-4xl font-bold text-neumo-text mb-6">
                $88.88 <span className="text-lg font-normal text-neumo-text-secondary">/year</span>
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Monthly',
                  'Priority support',
                  'Premium receipt designs',
                  'Private Tribes',
                  'Early access to new features',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neumo-text-secondary">
                    <Check className="w-4 h-4 text-neumo-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 bg-neumo-accent text-white font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                Start Free Trial
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neumo-text mb-4">
              {config.closingCta.headline}
            </h2>
            <p className="text-lg text-neumo-text-secondary mb-8">
              {config.closingCta.sub}
            </p>
            <button
              onClick={handleGetStarted}
              className="px-10 py-4 bg-neumo-accent text-white text-lg font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all inline-flex items-center gap-3"
            >
              {config.closingCta.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neumo-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-neumo-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-neumo-text">SignRoad</span>
              </div>
              <p className="text-sm text-neumo-text-secondary">
                Find signs, set goals, and manifest progress with daily guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neumo-text mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neumo-text-secondary">
                <li><a href="/universe-receipts" className="hover:text-neumo-text">Universe Receipts</a></li>
                <li><a href="/daily-message" className="hover:text-neumo-text">Daily Message</a></li>
                <li><a href="/daily-audio" className="hover:text-neumo-text">Daily Audio</a></li>
                <li><a href="/sleep-orb" className="hover:text-neumo-text">Sleep Orb</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neumo-text mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neumo-text-secondary">
                <li><a href="#" className="hover:text-neumo-text">About</a></li>
                <li><a href="#" className="hover:text-neumo-text">Blog</a></li>
                <li><a href="mailto:hello@signroad.com" className="hover:text-neumo-text">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neumo-text mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neumo-text-secondary">
                <li><a href="#" className="hover:text-neumo-text">Terms</a></li>
                <li><a href="#" className="hover:text-neumo-text">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neumo-border text-center text-sm text-neumo-text-muted">
            © 2025 SignRoad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
