import React, { useState } from 'react';
import { useCardVisibility } from '../hooks/useCardVisibility';
import { DarkModeHeader } from '../components/homepage/DarkModeHeader';
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
import { SectionCard } from '../components/ui/SectionCard';
import { CoursesPage } from './CoursesPage';
import { MoodPage } from './MoodPage';
import { JournalPage } from './JournalPage';
import { ProfilePage } from './ProfilePage';

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
  const { isCardVisible } = useCardVisibility();

  const handleIntentSelect = () => {
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
                UNIFIED CARD-BASED LAYOUT
                Same structure on mobile and desktop
                ============================================ */}
            
            {/* Today Card - HERO of the page */}
            {isCardVisible('todayCard') && <TodayCard />}
            
            {/* Sparks & Tribe - 2-column on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {isCardVisible('sparksRewards') && <SparksRewards />}
              {isCardVisible('tribesCard') && <TribesCard />}
            </div>
            
            {/* Latest Win - Social proof */}
            {isCardVisible('latestWin') && <UniverseReceipt />}
            
            {/* Manifested Wins Feed */}
            {isCardVisible('manifestedWins') && <ManifestedWinsFeed />}
            
            {/* Personal Greeting */}
            {isCardVisible('personalGreeting') && (
              <SectionCard>
                <PersonalGreeting />
              </SectionCard>
            )}
            
            {/* Explore by Intention */}
            {isCardVisible('exploreByIntention') && (
              <SectionCard title="Explore by Intention" subtitle="Find what resonates with you">
                <IntentBasedNav onIntentSelect={handleIntentSelect} />
                <CategoryGrid onCategorySelect={handleIntentSelect} />
              </SectionCard>
            )}
            
            {/* Start Your Journey - Course Section */}
            {isCardVisible('startYourJourney') && (
              <SectionCard 
                title="Start Your Journey" 
                subtitle="Curated paths for your manifestation road"
                onViewMore={() => setActiveBottomTab('courses')}
              >
                <CourseSection 
                  courses={featuredCourses.slice(0, 4)}
                  onCourseSelect={() => setActiveBottomTab('courses')}
                />
              </SectionCard>
            )}
            
            {/* What Others Love - Course Section */}
            {isCardVisible('whatOthersLove') && (
              <SectionCard 
                title="What Others Love" 
                subtitle="Top-rated by the SignRoad community"
                onViewMore={() => setActiveBottomTab('courses')}
              >
                <CourseSection 
                  courses={topRatedCourses.slice(0, 4)}
                  onCourseSelect={() => setActiveBottomTab('courses')}
                />
              </SectionCard>
            )}
            
            {/* Editor's Picks - Course Section */}
            {isCardVisible('editorsPicks') && (
              <SectionCard 
                title="Editor's Picks" 
                subtitle="Hand-selected journeys for transformation"
                onViewMore={() => setActiveBottomTab('courses')}
              >
                <CourseSection 
                  courses={editorsPicks.slice(0, 4)}
                  onCourseSelect={() => setActiveBottomTab('courses')}
                />
              </SectionCard>
            )}
            
            {/* User Stories */}
            {isCardVisible('userStories') && (
              <SectionCard title="Success Stories" subtitle="Real transformations from our community">
                <UserStories />
              </SectionCard>
            )}
            
            {/* Blog Section */}
            {isCardVisible('blogSection') && (
              <SectionCard title="Insights & Reflections" subtitle="Wisdom for your journey">
                <BlogSection />
              </SectionCard>
            )}
            
            {/* Newsletter */}
            {isCardVisible('newsletterSignup') && (
              <SectionCard>
                <NewsletterSignup />
              </SectionCard>
            )}

            {/* Footer - Also in card style */}
            <SectionCard>
              <Footer onNavigate={setActiveBottomTab} />
            </SectionCard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-page dark:bg-surface-page-dark text-neutral-900 dark:text-neutral-100">
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
