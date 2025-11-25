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
import { MoodCheckIn } from '../components/homepage/MoodCheckIn';
import { BottomNavigation } from '../components/homepage/BottomNavigation';
import { TodayCard } from '../components/homepage/TodayCard';
import { SparksRewards } from '../components/homepage/SparksRewards';

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
    // Scroll to relevant section based on intent
    console.log('Selected intent:', intent);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <DarkModeHeader />
      
      <main className="pb-20">
        <div className="px-4 py-6 max-w-md mx-auto">
                    <HeroCarousel />
                    <TodayCard />
                    <SparksRewards />
                    <PersonalGreeting />
          <IntentBasedNav onIntentSelect={handleIntentSelect} />
          <CategoryGrid />
          
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
          
          <UserStories />
          <BlogSection />
          <NewsletterSignup />
        </div>
      </main>

      <MoodCheckIn />
      <BottomNavigation 
        activeTab={activeBottomTab} 
        onTabChange={setActiveBottomTab} 
      />
    </div>
  );
};
