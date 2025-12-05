import React, { useState } from 'react';
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
            <HeroCarousel onStartNow={() => setActiveBottomTab('courses')} />
            <TodayCard />
            <SparksRewards />
            <TribesCard />
            <UniverseReceipt />
            <ManifestedWinsFeed />
            <PersonalGreeting />
            <IntentBasedNav onIntentSelect={handleIntentSelect} />
            <CategoryGrid onCategorySelect={handleIntentSelect} />
            
            <CourseSection 
              title="Start Your Journey" 
              courses={featuredCourses}
              onCourseSelect={() => setActiveBottomTab('courses')}
              onViewMore={() => setActiveBottomTab('courses')}
            />
            
            <CourseSection 
              title="What Others Love" 
              courses={topRatedCourses}
              onCourseSelect={() => setActiveBottomTab('courses')}
              onViewMore={() => setActiveBottomTab('courses')}
            />
            
            <CourseSection 
              title="Editor's Picks" 
              courses={editorsPicks}
              gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              onCourseSelect={() => setActiveBottomTab('courses')}
              onViewMore={() => setActiveBottomTab('courses')}
            />
            
            <UserStories />
            <BlogSection />
            <NewsletterSignup />
            <Footer onNavigate={setActiveBottomTab} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 overflow-x-hidden">
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
