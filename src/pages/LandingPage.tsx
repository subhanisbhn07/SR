import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Flame, Trophy, Users, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useConfigStore } from '../store/configStore';
import { Footer } from '../components/homepage/Footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { freeTrialDays } = useConfigStore();
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    onGetStarted();
  };

  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-6 shadow-teal-glow">
              <span className="text-white font-bold text-2xl">SR</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-neumo-text mb-6 leading-tight">
              The manifestation app that<br />
              <span className="text-brand-teal">sends you signs back</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neumo-text-secondary mb-4 max-w-3xl mx-auto">
              Your progress never resets. And when your dreams land,<br />
              you get a Universe Receipt.
            </p>

            <p className="text-lg text-neumo-text-muted mb-8">
              Other apps give you meditation tracks. We give you a 1,000-step road<br />
              where the universe plays back.
            </p>

            <form onSubmit={handleGetStarted} className="max-w-md mx-auto mb-6">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-neumo bg-neumo-bg shadow-neumo-inset text-neumo-text placeholder-neumo-text-muted focus:outline-none focus:shadow-neumo-inset-sm transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white font-semibold rounded-neumo transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  Start Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>

            <p className="text-sm text-neumo-text-secondary">
              <span className="font-semibold text-brand-teal">{freeTrialDays} days free</span> · No credit card required · Cancel anytime
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-neumo-text-muted">See what makes us different</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 text-neumo-text-secondary rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why SignRoad is Different Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Why SignRoad is Unlike Calm or Headspace
            </h2>
            <p className="text-lg text-neumo-text-secondary max-w-2xl mx-auto">
              We're not another meditation library. We're a manifestation journey<br />
              where the universe responds to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1: Signs from the Universe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-neumo-bg rounded-neumo-lg p-8 shadow-neumo"
            >
              <div className="w-16 h-16 bg-brand-teal rounded-neumo flex items-center justify-center mb-6 shadow-teal-glow">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neumo-text mb-3">
                Signs from the Universe,<br />Not Just Tracks
              </h3>
              <p className="text-neumo-text-secondary mb-4">
                Every day, you receive a sign challenge: "Look for a white feather." When you see it in the real world, you log it. The universe plays back.
              </p>
              <div className="bg-neumo-surface-soft rounded-neumo p-4 shadow-neumo-inset-sm">
                <p className="text-xs text-neumo-text-muted mb-2">TODAY'S SIGN</p>
                <p className="text-sm text-neumo-text font-medium">🪶 Look for a white feather</p>
              </div>
            </motion.div>

            {/* Pillar 2: Progress That Never Resets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neumo-bg rounded-neumo-lg p-8 shadow-neumo"
            >
              <div className="w-16 h-16 bg-brand-teal rounded-neumo flex items-center justify-center mb-6 shadow-teal-glow">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neumo-text mb-3">
                Progress That Never Resets,<br />Only Dims
              </h3>
              <p className="text-neumo-text-secondary mb-4">
                Your Lantern dims when you rest, but never goes out. No harsh streak resets. No shame. Just gentle encouragement to rekindle your flame.
              </p>
              <div className="bg-neumo-surface-soft rounded-neumo p-4 shadow-neumo-inset-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-neumo-text-muted">YOUR LANTERN</p>
                  <p className="text-sm text-neumo-text font-bold">82%</p>
                </div>
                <div className="h-2 bg-neumo-border rounded-full overflow-hidden">
                  <div className="h-full bg-brand-teal rounded-full" style={{ width: '82%' }} />
                </div>
                <p className="text-xs text-neumo-text-muted mt-2">✨ Sparks earned only, never purchased</p>
              </div>
            </motion.div>

            {/* Pillar 3: Receipts and Tribes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-neumo-bg rounded-neumo-lg p-8 shadow-neumo"
            >
              <div className="w-16 h-16 bg-brand-teal rounded-neumo flex items-center justify-center mb-6 shadow-teal-glow">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neumo-text mb-3">
                Receipts and Tribes<br />That Prove It Works
              </h3>
              <p className="text-neumo-text-secondary mb-4">
                When you manifest something, you get a shareable Universe Receipt showing the odds you beat. Walk the road with 5-person accountability tribes.
              </p>
              <div className="bg-neumo-surface-soft rounded-neumo p-4 shadow-neumo-inset-sm">
                <p className="text-xs text-neumo-text-muted mb-2">LATEST WIN</p>
                <p className="text-sm text-neumo-text font-medium mb-2">"Got my dream job"</p>
                <div className="flex items-center gap-3 text-xs text-neumo-text-secondary">
                  <span>21 days</span>
                  <span>18 signs</span>
                  <span className="font-semibold text-neumo-text">Beat 91.7% odds</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your 14-Day Road Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Your {freeTrialDays}-Day Road
            </h2>
            <p className="text-lg text-neumo-text-secondary max-w-2xl mx-auto">
              Experience the full journey risk-free. No credit card required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-neumo-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-neumo text-neumo-text font-bold">
                1-3
              </div>
              <h3 className="text-lg font-semibold text-neumo-text mb-2">Feel the Signs</h3>
              <p className="text-neumo-text-secondary text-sm">
                Receive your first daily sign challenges. Log them when you see them in the real world. Feel the universe respond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-neumo-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-neumo text-neumo-text font-bold">
                4-7
              </div>
              <h3 className="text-lg font-semibold text-neumo-text mb-2">See Your Lantern Glow</h3>
              <p className="text-neumo-text-secondary text-sm">
                Complete micro-sessions and watch your Lantern health grow. Earn Sparks. Experience the forgiving progress system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-neumo-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-neumo text-neumo-text font-bold">
                8-{freeTrialDays}
              </div>
              <h3 className="text-lg font-semibold text-neumo-text mb-2">Join Your Tribe</h3>
              <p className="text-neumo-text-secondary text-sm">
                Connect with your 5-person accountability group. See manifested wins from the community. Share your journey.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white text-lg font-semibold rounded-neumo transition-all inline-flex items-center gap-3"
            >
              Start Your {freeTrialDays}-Day Free Road
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-sm text-neumo-text-secondary mt-4">
              No credit card · No commitment · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Real Stories from the Road
            </h2>
            <p className="text-lg text-neumo-text-secondary">
              See how SignRoad is different from what you've tried before
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: '47,000+', label: 'Signs Logged Daily' },
              { stat: '12,000+', label: 'Active Travelers' },
              { stat: '3,200+', label: 'Manifestations Shared' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo text-center"
              >
                <p className="text-3xl font-bold text-brand-teal mb-2">{item.stat}</p>
                <p className="text-neumo-text-secondary">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Why Others Fail, Why We're Different
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Other Apps Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-neumo-surface rounded-neumo-lg p-6 shadow-neumo-inset"
            >
              <h3 className="text-lg font-semibold text-neumo-text-muted mb-4">Other Meditation Apps</h3>
              <ul className="space-y-3">
                {[
                  'Just play audio tracks at you',
                  'Harsh streak resets create shame',
                  'Casino-style gamification',
                  'No real-world engagement',
                  'No accountability or community',
                  'No proof your practice works',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-neumo-text-secondary text-sm">
                    <span className="text-neumo-text-muted mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SignRoad Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo border-2 border-brand-teal/20"
            >
              <h3 className="text-lg font-semibold text-brand-teal mb-4">SignRoad</h3>
              <ul className="space-y-3">
                {[
                  'Universe sends you signs back',
                  'Progress dims, never resets',
                  'Ethical, earned-only rewards',
                  'Daily real-world sign challenges',
                  '5-person accountability tribes',
                  'Universe Receipts prove it works',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-neumo-text text-sm">
                    <Check className="w-4 h-4 text-brand-teal mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Ready to Walk a Different Road?
            </h2>
            <p className="text-lg text-neumo-text-secondary mb-8">
              Start your {freeTrialDays}-day journey where the universe plays back.<br />
              No credit card. No risk. Just signs.
            </p>
            
            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white text-lg font-semibold rounded-neumo transition-all inline-flex items-center gap-3 mb-4"
            >
              Start Your Free Road
              <ArrowRight className="w-6 h-6" />
            </button>
            
            <p className="text-sm text-neumo-text-muted">
              Join 12,000+ travelers already on the road
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
