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
import { CourseSection } from '../components/homepage/CourseSection';
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
import { ManifestedWinsFeed } from '../components/homepage/ManifestedWinsFeed';
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
  const { theme } = useThemeStore();
  
  return (
    <div className={`mb-6 rounded-2xl border ${
      theme === 'dark' ? 'border-neutral-700 bg-neutral-800/50' : 'border-neutral-200 bg-white'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left ${
          theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        <span className="font-semibold text-lg">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neutral-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-500" />
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

const featuredCourses = [
  {
    id: 1,
    title: "The Confidence Reset",
    subtitle: "Rebuild your belief in 15 mins",
    duration: "15 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 2,
    title: "Morning Manifestation",
    subtitle: "Start your day with intention",
    duration: "12 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 3,
    title: "Deep Sleep Journey",
    subtitle: "Release the day and rest deeply",
    duration: "25 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 4,
    title: "Stress Release",
    subtitle: "Let go of tension and find calm",
    duration: "18 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 5,
    title: "Gratitude Practice",
    subtitle: "Cultivate appreciation daily",
    duration: "10 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const topRatedCourses = [
  {
    id: 6,
    title: "Anxiety to Peace",
    subtitle: "Transform worry into wisdom",
    duration: "18 min",
    rating: 4.8,
    students: 12,
    isPremium: false,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Most Loved"
  },
  {
    id: 7,
    title: "Abundance Mindset",
    subtitle: "Shift from scarcity to prosperity",
    duration: "20 min",
    rating: 4.9,
    students: 8,
    isPremium: true,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 8,
    title: "Self-Love Journey",
    subtitle: "Embrace your authentic self",
    duration: "22 min",
    rating: 4.7,
    students: 15,
    isPremium: false,
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 9,
    title: "Focus & Clarity",
    subtitle: "Sharpen your mental edge",
    duration: "15 min",
    rating: 4.9,
    students: 20,
    isPremium: true,
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 10,
    title: "Evening Unwind",
    subtitle: "Release the day's stress",
    duration: "20 min",
    rating: 4.8,
    students: 18,
    isPremium: false,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const editorsPicks = [
  {
    id: 11,
    title: "Inner Child Healing",
    subtitle: "Reconnect with your authentic self",
    duration: "22 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Why we love this"
  },
  {
    id: 12,
    title: "Forgiveness Practice",
    subtitle: "Release resentment and find peace",
    duration: "18 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 13,
    title: "Manifestation Mastery",
    subtitle: "Unlock your creative power",
    duration: "25 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 14,
    title: "Chakra Balancing",
    subtitle: "Align your energy centers",
    duration: "30 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 15,
    title: "Breath of Life",
    subtitle: "Powerful breathing techniques",
    duration: "12 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

export const Homepage: React.FC = () => {
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const { theme } = useThemeStore();
  const { isCardVisible } = useCardVisibility();

  const handleIntentSelect = (intent: string) => {
    // Navigate to courses with the selected intent filter
    setActiveBottomTab('courses');
  };

  const renderContent = () => {
    switch (activeBottomTab) {
      case 'courses':
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
                SECTION 1: MUST-SEE (Above the Fold)
                Core engagement: Today's action, progress, community
                ============================================ */}
            <section className="mb-8">
              {/* Today Card - HERO of the page, visually dominant */}
              {isCardVisible('todayCard') && <TodayCard />}
              
              {/* Desktop: 2-column layout for Sparks + Tribe */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {isCardVisible('sparksRewards') && <SparksRewards />}
                {isCardVisible('tribesCard') && <TribesCard />}
              </div>
              
              {/* Latest Win - Social proof & celebration */}
              {isCardVisible('latestWin') && <UniverseReceipt />}
            </section>

            {/* Visual separator between Must-see and Nice-to-see */}
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8" />

            {/* ============================================
                SECTION 2: NICE-TO-SEE (Engagement & Discovery)
                Secondary content that drives deeper engagement
                ============================================ */}
            <section className="mb-8">
              {/* Manifested Wins Feed - Community inspiration */}
              {isCardVisible('manifestedWins') && <ManifestedWinsFeed />}
              
              {/* Personal Greeting - Contextual motivation */}
              {isCardVisible('personalGreeting') && <PersonalGreeting />}
              
              {/* Explore by Intention - Discovery navigation */}
              {isCardVisible('exploreByIntention') && (
                <div className="mb-6">
                  <IntentBasedNav onIntentSelect={handleIntentSelect} />
                  <CategoryGrid onCategorySelect={handleIntentSelect} />
                </div>
              )}
              
              {/* Course Sections - Limited to 3-4 cards with View All */}
              {isCardVisible('startYourJourney') && (
                <div className="mb-8 p-5 rounded-2xl bg-emerald-50 dark:bg-neutral-800/50 border-l-4 border-emerald-500 dark:border-emerald-600">
                  <CourseSection 
                    title="Start Your Journey" 
                    subtitle="Curated paths for your manifestation road"
                    courses={featuredCourses.slice(0, 4)}
                    onCourseSelect={() => setActiveBottomTab('courses')}
                    onViewMore={() => setActiveBottomTab('courses')}
                  />
                </div>
              )}
              
              {isCardVisible('whatOthersLove') && (
                <CourseSection 
                  title="What Others Love" 
                  subtitle="Top-rated by the SignRoad community"
                  courses={topRatedCourses.slice(0, 3)}
                  onCourseSelect={() => setActiveBottomTab('courses')}
                  onViewMore={() => setActiveBottomTab('courses')}
                />
              )}
            </section>

            {/* Visual separator before Deep-explore */}
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8" />

            {/* ============================================
                SECTION 3: DEEP-EXPLORE (Collapsible on Mobile)
                Lower-priority content for engaged users
                ============================================ */}
            <section className="mb-8">
              {/* Hero Carousel - Moved to deep-explore, less critical */}
              {isCardVisible('heroCarousel') && (
                <div className="hidden md:block mb-6">
                  <HeroCarousel onStartNow={() => setActiveBottomTab('courses')} />
                </div>
              )}
              
              {/* Editor's Picks - Collapsible on mobile */}
              {isCardVisible('editorsPicks') && (
                <div className="md:hidden">
                  <CollapsibleSection title="Editor's Picks" defaultOpen={false}>
                    <CourseSection 
                      title="" 
                      courses={editorsPicks.slice(0, 3)}
                      gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                      onCourseSelect={() => setActiveBottomTab('courses')}
                      onViewMore={() => setActiveBottomTab('courses')}
                      compact
                    />
                  </CollapsibleSection>
                </div>
              )}
              {isCardVisible('editorsPicks') && (
                <div className="hidden md:block">
                  <CourseSection 
                    title="Editor's Picks" 
                    subtitle="Hand-selected journeys for transformation"
                    courses={editorsPicks.slice(0, 4)}
                    gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    onCourseSelect={() => setActiveBottomTab('courses')}
                    onViewMore={() => setActiveBottomTab('courses')}
                  />
                </div>
              )}
              
              {/* User Stories - Collapsible on mobile */}
              {isCardVisible('userStories') && (
                <div className="md:hidden">
                  <CollapsibleSection title="Success Stories" defaultOpen={false}>
                    <UserStories compact />
                  </CollapsibleSection>
                </div>
              )}
              {isCardVisible('userStories') && (
                <div className="hidden md:block">
                  <UserStories />
                </div>
              )}
              
              {/* Blog Section - Collapsible on mobile */}
              {isCardVisible('blogSection') && (
                <div className="md:hidden">
                  <CollapsibleSection title="Insights & Reflections" defaultOpen={false}>
                    <BlogSection compact />
                  </CollapsibleSection>
                </div>
              )}
              {isCardVisible('blogSection') && (
                <div className="hidden md:block">
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
    <div className="min-h-screen overflow-x-hidden bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <DarkModeHeader activeTab={activeBottomTab} onTabChange={setActiveBottomTab} />
      
      <main className="pb-20 overflow-x-hidden">
        {renderContent()}
      </main>

      <MoodCheckIn />
      <BottomNavigation 
        activeTab={activeBottomTab} 
        onTabChange={setActiveBottomTab} 
      />
    </div>
  );
};
