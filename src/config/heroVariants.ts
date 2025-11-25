import { LifePath } from '../types';

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
}

export interface HeroVariant {
  lifePath: LifePath;
  slides: HeroSlide[];
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Reclaim Your Calm",
    subtitle: "Find peace in the chaos of everyday life",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-purple-900/80 to-blue-900/80"
  },
  {
    id: 2,
    title: "Manifest Abundance Daily",
    subtitle: "Transform your mindset, transform your reality",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-orange-900/80 to-yellow-900/80"
  },
  {
    id: 3,
    title: "Heal Through Stillness",
    subtitle: "Discover the power of inner silence",
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-green-900/80 to-teal-900/80"
  },
];

const SALARIED_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "5 Minutes Before Your Shift",
    subtitle: "Find calm before the chaos begins",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-blue-900/80 to-indigo-900/80"
  },
  {
    id: 2,
    title: "Reset Between Meetings",
    subtitle: "Quick relief when work feels overwhelming",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-purple-900/80 to-blue-900/80"
  },
  {
    id: 3,
    title: "End-of-Day Release",
    subtitle: "Leave work stress at the door",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-indigo-900/80 to-purple-900/80"
  },
];

const STUDENT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Fuel for the Long Game",
    subtitle: "Build habits that carry you through exams and beyond",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-green-900/80 to-teal-900/80"
  },
  {
    id: 2,
    title: "Focus Before Study",
    subtitle: "Clear your mind, sharpen your concentration",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-blue-900/80 to-cyan-900/80"
  },
  {
    id: 3,
    title: "Confidence for What's Next",
    subtitle: "You're more prepared than you think",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-purple-900/80 to-pink-900/80"
  },
];

const ENTREPRENEUR_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Steady Fuel for Big Bets",
    subtitle: "Stay grounded while building something great",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-orange-900/80 to-amber-900/80"
  },
  {
    id: 2,
    title: "Grounding Before Decisions",
    subtitle: "Clarity comes from stillness, not stress",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-yellow-900/80 to-orange-900/80"
  },
  {
    id: 3,
    title: "Sleep When Your Mind Won't Stop",
    subtitle: "Rest is part of the strategy",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-indigo-900/80 to-purple-900/80"
  },
];

const PARENT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "2 Minutes of Calm in the Chaos",
    subtitle: "You deserve a moment too",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-pink-900/80 to-rose-900/80"
  },
  {
    id: 2,
    title: "Patience Refill",
    subtitle: "Restore your reserves when they're running low",
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-rose-900/80 to-pink-900/80"
  },
  {
    id: 3,
    title: "Sleep When Baby Sleeps",
    subtitle: "Quick rest for tired caregivers",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-purple-900/80 to-indigo-900/80"
  },
];

const CAREER_TRANSITION_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "It's Not Too Late to Change Direction",
    subtitle: "Every crossroads is an opportunity",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-teal-900/80 to-cyan-900/80"
  },
  {
    id: 2,
    title: "Clarity on Next Steps",
    subtitle: "Trust the path that's unfolding",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-cyan-900/80 to-blue-900/80"
  },
  {
    id: 3,
    title: "Release What's Not Working",
    subtitle: "Make space for what's meant for you",
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-green-900/80 to-teal-900/80"
  },
];

const RETIRED_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Meaning in the Quiet Moments",
    subtitle: "This chapter has its own gifts",
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-amber-900/80 to-orange-900/80"
  },
  {
    id: 2,
    title: "Morning Gratitude",
    subtitle: "Start each day with appreciation",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-yellow-900/80 to-amber-900/80"
  },
  {
    id: 3,
    title: "Legacy Reflection",
    subtitle: "Honor the wisdom you've gathered",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-orange-900/80 to-red-900/80"
  },
];

export const HERO_VARIANTS: Record<LifePath, HeroSlide[]> = {
  salaried: SALARIED_HERO_SLIDES,
  student: STUDENT_HERO_SLIDES,
  entrepreneur: ENTREPRENEUR_HERO_SLIDES,
  parent: PARENT_HERO_SLIDES,
  career_transition: CAREER_TRANSITION_HERO_SLIDES,
  retired: RETIRED_HERO_SLIDES,
};

export const getHeroSlidesForLifePath = (lifePath: LifePath | undefined): HeroSlide[] => {
  if (!lifePath) {
    return DEFAULT_HERO_SLIDES;
  }
  return HERO_VARIANTS[lifePath] || DEFAULT_HERO_SLIDES;
};
