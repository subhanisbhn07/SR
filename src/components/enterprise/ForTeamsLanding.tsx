import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BarChart3, Shield, Zap, ChevronRight, X, Check, Building2 } from 'lucide-react';
import { LanternIcon } from '../ui/LanternIcon';

interface TeamPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}

const teamPlans: TeamPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$99',
    period: '/month',
    features: [
      'Up to 25 team members',
      'Basic team analytics',
      '3 pre-built roads',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$249',
    period: '/month',
    features: [
      'Up to 100 team members',
      'Advanced analytics dashboard',
      'All roads + custom roads',
      'Tribe creation tools',
      'Priority support',
      'Admin controls',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited team members',
      'White-label options',
      'SSO integration',
      'Dedicated success manager',
      'Custom road development',
      'API access',
    ],
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: 'Team Wellness Metrics',
    description: 'Track engagement, Lantern health scores, and wellness trends across your organization.',
  },
  {
    icon: Users,
    title: 'Tribe Formation',
    description: 'Create 5-person accountability groups that boost completion rates by 3x.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Design',
    description: 'Individual journeys stay private. Admins see aggregate metrics only.',
  },
  {
    icon: Zap,
    title: '7-Minute Micro-Rituals',
    description: 'Designed for busy schedules. No hour-long sessions required.',
  },
];

interface ForTeamsLandingProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const ForTeamsLanding: React.FC<ForTeamsLandingProps> = ({ onClose, isModal = false }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [selectedRoads, setSelectedRoads] = useState<string[]>([]);

  const availableRoads = [
    { id: 'stress', name: 'Stress Relief', description: 'Combat workplace burnout' },
    { id: 'focus', name: 'Deep Focus', description: 'Improve concentration' },
    { id: 'sleep', name: 'Better Sleep', description: 'Rest and recovery' },
    { id: 'confidence', name: 'Confidence Building', description: 'Leadership presence' },
    { id: 'creativity', name: 'Creative Flow', description: 'Unlock innovation' },
  ];

  const handleRoadToggle = (roadId: string) => {
    setSelectedRoads(prev => 
      prev.includes(roadId) 
        ? prev.filter(id => id !== roadId)
        : [...prev, roadId]
    );
  };

  const handleNextStep = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(prev => prev + 1);
    } else {
      // Complete onboarding
      console.log('Team onboarding complete:', { teamName, teamSize, selectedRoads });
      setShowOnboarding(false);
    }
  };

  const content = (
    <div className={`${isModal ? '' : 'min-h-screen'} bg-neutral-900 text-white`}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
        <div className="relative px-6 py-12 max-w-4xl mx-auto">
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          )}
          
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">For Teams</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Help your team beat burnout with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              7-minute micro-rituals
            </span>
          </h1>
          
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl">
            SignRoad for Teams brings the power of manifestation and mindfulness to your organization. 
            Track team wellness, create accountability tribes, and watch engagement soar.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Free Trial
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-6 py-3 bg-neutral-800 rounded-xl font-medium hover:bg-neutral-700 transition-colors"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Teams Choose SignRoad</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-neutral-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Lantern Preview */}
      <div className="px-6 py-12 bg-neutral-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your Team's Collective Lantern</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Watch your team's wellness grow together. The Team Lantern brightens as more members 
            complete their daily rituals.
          </p>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <LanternIcon health={45} size="lg" showLabel={false} />
              <p className="text-sm text-neutral-500 mt-2">Week 1</p>
            </div>
            <ChevronRight className="w-6 h-6 text-neutral-600" />
            <div className="text-center">
              <LanternIcon health={72} size="lg" showLabel={false} />
              <p className="text-sm text-neutral-500 mt-2">Week 4</p>
            </div>
            <ChevronRight className="w-6 h-6 text-neutral-600" />
            <div className="text-center">
              <LanternIcon health={95} size="lg" showLabel={false} />
              <p className="text-sm text-neutral-500 mt-2">Week 8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {teamPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-6 border ${
                plan.recommended
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30'
                  : 'bg-neutral-800/50 border-neutral-700/50'
              }`}
            >
              {plan.recommended && (
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full mb-4 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-neutral-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowOnboarding(true)}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                  plan.recommended
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-neutral-700 hover:bg-neutral-600 text-white'
                }`}
              >
                {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowOnboarding(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 border border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-1 rounded-full ${
                      step <= onboardingStep ? 'bg-blue-500' : 'bg-neutral-700'
                    }`}
                  />
                ))}
              </div>

              {onboardingStep === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Name your team</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    This will be visible to all team members.
                  </p>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g., Acme Engineering"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {onboardingStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-2">How big is your team?</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    We'll recommend the right plan for you.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['1-10', '11-50', '51-200', '200+'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setTeamSize(size)}
                        className={`px-4 py-3 rounded-xl border transition-colors ${
                          teamSize === size
                            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-600'
                        }`}
                      >
                        {size} people
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Choose starter roads</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    Select the wellness journeys your team needs most.
                  </p>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {availableRoads.map((road) => (
                      <button
                        key={road.id}
                        onClick={() => handleRoadToggle(road.id)}
                        className={`w-full px-4 py-3 rounded-xl border text-left transition-colors ${
                          selectedRoads.includes(road.id)
                            ? 'bg-blue-500/20 border-blue-500'
                            : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">{road.name}</p>
                            <p className="text-sm text-neutral-400">{road.description}</p>
                          </div>
                          {selectedRoads.includes(road.id) && (
                            <Check className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {onboardingStep > 1 && (
                  <button
                    onClick={() => setOnboardingStep(prev => prev - 1)}
                    className="flex-1 py-2.5 bg-neutral-800 rounded-xl font-medium hover:bg-neutral-700 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={
                    (onboardingStep === 1 && !teamName) ||
                    (onboardingStep === 2 && !teamSize) ||
                    (onboardingStep === 3 && selectedRoads.length === 0)
                  }
                  className="flex-1 py-2.5 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {onboardingStep === 3 ? 'Launch Team' : 'Continue'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => {
              setShowDemoModal(false);
              setDemoSubmitted(false);
              setDemoEmail('');
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 border border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              {demoSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Demo Scheduled!</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    We'll reach out to {demoEmail} within 24 hours to schedule your personalized demo.
                  </p>
                  <button
                    onClick={() => {
                      setShowDemoModal(false);
                      setDemoSubmitted(false);
                      setDemoEmail('');
                    }}
                    className="px-6 py-2.5 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                  >
                    Got It
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold">Schedule a Demo</h3>
                      <p className="text-neutral-400 text-sm">See SignRoad for Teams in action</p>
                    </div>
                    <button
                      onClick={() => setShowDemoModal(false)}
                      className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-400" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Team Analytics Dashboard</p>
                        <p className="text-xs text-neutral-400">See real-time wellness metrics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tribe Formation</p>
                        <p className="text-xs text-neutral-400">Create accountability groups</p>
                      </div>
                    </div>
                  </div>

                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 mb-4"
                  />

                  <button
                    onClick={() => {
                      if (demoEmail && demoEmail.includes('@')) {
                        setDemoSubmitted(true);
                      }
                    }}
                    disabled={!demoEmail || !demoEmail.includes('@')}
                    className="w-full py-2.5 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Request Demo
                  </button>

                  <p className="text-xs text-neutral-500 text-center mt-4">
                    We'll contact you within 24 hours to schedule your demo.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return content;
};
