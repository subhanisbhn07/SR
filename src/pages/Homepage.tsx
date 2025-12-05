import React, { useState } from 'react';
import {
  DarkModeHeader,
  HeroCarousel,
  PersonalGreeting,
  IntentBasedNav,
  CategoryGrid,
  CourseSection,
  UserStories,
  BlogSection,
  NewsletterSignup,
  MoodCheckIn,
  BottomNavigation,
  TodayCard,
  SparksRewards,
  TribesCard,
  UniverseReceipt,
  ManifestedWinsFeed,
} from '../features/homepage';
import { InstallPromptBanner } from '../components/InstallPromptBanner';
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
  }
];

const topRatedCourses = [
  {
    id: 4,
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
    id: 5,
    title: "Abundance Mindset",
    subtitle: "Shift from scarcity to prosperity",
    duration: "20 min",
    rating: 4.9,
    students: 8,
    isPremium: true,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const editorsPicks = [
  {
    id: 6,
    title: "Inner Child Healing",
    subtitle: "Reconnect with your authentic self",
    duration: "22 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Why we love this"
  }
];

export const Homepage: React.FC = () => {
  const [activeBottomTab, setActiveBottomTab] = useState('home');

  const handleIntentSelect = (intent: string) => {
    // Navigate to courses with the selected intent filter
    console.log('Selected intent:', intent); setActiveBottomTab('courses');
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
          <div className="px-4 py-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
            <HeroCarousel onStartNow={() => setActiveBottomTab('courses')} />
            
            {/* Responsive grid for Today + Sparks */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <TodayCard />
              <SparksRewards />
            </div>
            
            {/* Responsive grid for Tribes + Universe Receipt */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-6 mt-4 md:mt-6">
              <TribesCard />
              <UniverseReceipt />
            </div>
            
            <ManifestedWinsFeed />
            <PersonalGreeting />
            <IntentBasedNav onIntentSelect={handleIntentSelect} />
            <CategoryGrid />
            
            {/* Course sections with responsive grid */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <CourseSection 
                title="Start Your Journey" 
                courses={featuredCourses}
              />
              
              <CourseSection 
                title="What Others Love" 
                courses={topRatedCourses}
              />
              
              <CourseSection 
                title="Editor's Picks" 
                courses={editorsPicks}
                gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              />
            </div>
            
            {/* Responsive grid for Stories + Blog */}
            <div className="grid gap-6 lg:grid-cols-2 mt-6 md:mt-8">
              <UserStories />
              <BlogSection />
            </div>
            
            <NewsletterSignup />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <InstallPromptBanner />
      <DarkModeHeader activeTab={activeBottomTab} onTabChange={setActiveBottomTab} />
      
      <main className="pb-20 md:pb-8 pt-14">
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
