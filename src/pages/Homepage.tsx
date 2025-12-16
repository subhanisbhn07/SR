import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useCardVisibility } from '../hooks/useCardVisibility';
import { DarkModeHeader } from '../components/homepage/DarkModeHeader';
import { HeroCarousel } from '../components/homepage/HeroCarousel';
import { PersonalGreeting } from '../components/homepage/PersonalGreeting';
import { IntentBasedNav } from '../components/homepage/IntentBasedNav';
import { CategoryGrid } from '../components/homepage/CategoryGrid';
import { UserStories } from '../components/homepage/UserStories';
import { BlogSection } from '../components/homepage/BlogSection';
import { NewsletterSignup } from '../components/homepage/NewsletterSignup';
import { Footer } from '../components/homepage/Footer';
import { MoodCheckIn } from '../components/homepage/MoodCheckIn';
import { BottomNavigation } from '../components/homepage/BottomNavigation';
import { TodayCard } from '../components/homepage/TodayCard';
import { SparksRewards } from '../components/homepage/SparksRewards';
import { TribesCard } from '../components/homepage/TribesCard';
import { UniverseReceipt } from '../components/homepage/UniverseReceipt';
import { ReferralCard } from '../components/homepage/ReferralCard';
import { DailyMessageCard } from '../components/homepage/DailyMessageCard';
import { HeroPromise } from '../components/homepage/HeroPromise';
import { OnboardingWizard } from '../components/onboarding/OnboardingWizard';
import { DayBasedNudge } from '../components/onboarding/DayBasedNudge';
import { CoursesPage } from './CoursesPage';
import { MoodPage } from './MoodPage';
import { JournalPage } from './JournalPage';
import { ProfilePage } from './ProfilePage';

// Collapsible Section Component for Deep-Explore content
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-6 rounded-neumo-lg bg-neumo-bg shadow-neumo">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left text-neumo-text"
      >
        <span className="font-semibold text-lg">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neumo-text-secondary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neumo-text-secondary" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export const Homepage: React.FC = () => {
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { theme } = useThemeStore();
  const { isCardVisible } = useCardVisibility();

  const handleIntentSelect = (intent: string) => {
    // Navigate to daily audio with the selected intent filter
    setActiveBottomTab('daily-audio');
  };

  const renderContent = () => {
    switch (activeBottomTab) {
      case 'daily-audio':
        return <CoursesPage />;
      case 'mood':
        return <MoodPage />;
      case 'journal':
        return <JournalPage />;
      case 'profile':
        return <ProfilePage />;
      case 'home':
      default:
        return (
          <div className="px-4 py-6 max-w-lg md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto">
            
            {/* ============================================
                SECTION 0: HERO PROMISE (First Impression)
                Core value prop: Manifestation with receipts
                ============================================ */}
            <HeroPromise onGetStarted={() => setShowOnboarding(true)} />
            
            {/* Day-Based Nudge - Contextual messaging based on user's step */}
            <DayBasedNudge onAction={() => setActiveBottomTab('daily-audio')} />
            
            {/* ============================================
                SECTION 1: MUST-SEE (Above the Fold)
                Core engagement: Today's action, progress, community
                3-Layer Neumorphism: Section wrapper (bg-neumo-surface) → Cards (bg-neumo-bg)
                ============================================ */}
            <section className="mb-8 p-5 rounded-neumo-lg bg-neumo-surface shadow-neumo-sm">
              {/* Today Card - HERO of the page, visually dominant */}
              {isCardVisible('todayCard') && <TodayCard />}
              
              {/* Daily Message with Barnum effect - personalized feel */}
              <DailyMessageCard />
              
              {/* Desktop: 2-column layout for Sparks + Tribe */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {isCardVisible('sparksRewards') && <SparksRewards />}
                {isCardVisible('tribesCard') && <TribesCard />}
              </div>
              
              {/* Latest Win - Social proof & celebration */}
              {isCardVisible('latestWin') && <UniverseReceipt />}
              
              {/* Referral Card - Appears after user engagement threshold */}
              <ReferralCard />
            </section>

            {/* Visual separator between Must-see and Nice-to-see */}
            <div className="h-px bg-gradient-to-r from-transparent via-neumo-border to-transparent my-8" />

            {/* ============================================
                SECTION 2: NICE-TO-SEE (Engagement & Discovery)
                Secondary content that drives deeper engagement
                ============================================ */}
            <section className="mb-8">
              {/* Personal Greeting - Contextual motivation */}
              {isCardVisible('personalGreeting') && <PersonalGreeting />}
              
              {/* Explore by Intention - Discovery navigation (no show more/less) */}
              {isCardVisible('exploreByIntention') && (
                <div className="mb-6 p-5 rounded-neumo-lg bg-neumo-surface shadow-neumo">
                  <IntentBasedNav onIntentSelect={handleIntentSelect} />
                  <CategoryGrid onCategorySelect={handleIntentSelect} showAll={true} />
                </div>
              )}
            </section>

            {/* Visual separator before Deep-explore */}
            <div className="h-px bg-gradient-to-r from-transparent via-neumo-border to-transparent my-8" />

            {/* ============================================
                SECTION 3: DEEP-EXPLORE (Collapsible on Mobile)
                Lower-priority content for engaged users
                ============================================ */}
            <section className="mb-8">
              {/* Hero Carousel - Moved to deep-explore, less critical */}
              {isCardVisible('heroCarousel') && (
                <div className="hidden md:block mb-6">
                  <HeroCarousel onStartNow={() => setActiveBottomTab('daily-audio')} />
                </div>
              )}
              
              {/* User Stories - with proper neumorphism styling (section wrapper) */}
              {isCardVisible('userStories') && (
                <div className="md:hidden">
                  <CollapsibleSection title="Success Stories" defaultOpen={true}>
                    <UserStories />
                  </CollapsibleSection>
                </div>
              )}
              {isCardVisible('userStories') && (
                <div className="hidden md:block p-5 rounded-neumo-lg bg-neumo-surface shadow-neumo-sm mb-6">
                  <UserStories />
                </div>
              )}
              
              {/* Blog Section - Collapsible on mobile, with neumorphism wrapper on desktop */}
              {isCardVisible('blogSection') && (
                <div className="md:hidden">
                  <CollapsibleSection title="Insights & Reflections" defaultOpen={true}>
                    <BlogSection />
                  </CollapsibleSection>
                </div>
              )}
              {isCardVisible('blogSection') && (
                <div className="hidden md:block p-5 rounded-neumo-lg bg-neumo-surface shadow-neumo-sm mb-6">
                  <BlogSection />
                </div>
              )}
              
              {/* Newsletter - Always visible but compact on mobile */}
              {isCardVisible('newsletterSignup') && <NewsletterSignup />}
            </section>

            <Footer onNavigate={setActiveBottomTab} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-neumo-bg text-neumo-text">
      <DarkModeHeader activeTab={activeBottomTab} onTabChange={setActiveBottomTab} />
      
      <main className="pb-20 overflow-x-hidden">
        {renderContent()}
      </main>

      <MoodCheckIn />
      <BottomNavigation 
        activeTab={activeBottomTab} 
        onTabChange={setActiveBottomTab} 
      />
      
      {/* Onboarding Wizard - Triggered by "Start Your 7-Step Free Trial" CTA */}
      <OnboardingWizard
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => {
          setShowOnboarding(false);
          // Navigate to daily audio after onboarding
          setActiveBottomTab('daily-audio');
        }}
      />
    </div>
  );
};
