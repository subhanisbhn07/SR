import { LifePath } from '../types';

export interface CourseConfig {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  rating?: number;
  students?: number;
  isPremium: boolean;
  image: string;
  badge?: string;
}

const DEFAULT_FIRST_ROW_SESSIONS: CourseConfig[] = [
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

const SALARIED_FIRST_ROW_SESSIONS: CourseConfig[] = [
  {
    id: 101,
    title: "Quick Reset",
    subtitle: "5 minutes to clear work stress",
    duration: "5 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Popular"
  },
  {
    id: 102,
    title: "Anxiety to Calm",
    subtitle: "Transform worry into peace",
    duration: "12 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 103,
    title: "End-of-Day Release",
    subtitle: "Leave work at work",
    duration: "15 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const STUDENT_FIRST_ROW_SESSIONS: CourseConfig[] = [
  {
    id: 201,
    title: "Exam Anxiety Relief",
    subtitle: "Calm your nerves before tests",
    duration: "8 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Student Favorite"
  },
  {
    id: 202,
    title: "Focus Before Study",
    subtitle: "Sharpen your concentration",
    duration: "10 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 203,
    title: "Confidence for Interviews",
    subtitle: "Show up as your best self",
    duration: "12 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const ENTREPRENEUR_FIRST_ROW_SESSIONS: CourseConfig[] = [
  {
    id: 301,
    title: "Grounding Before Decisions",
    subtitle: "Clarity comes from stillness",
    duration: "8 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Founder Pick"
  },
  {
    id: 302,
    title: "Founder Anxiety Reset",
    subtitle: "When the weight feels heavy",
    duration: "12 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 303,
    title: "Sleep When Your Mind Won't Stop",
    subtitle: "Rest is part of the strategy",
    duration: "20 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const PARENT_FIRST_ROW_SESSIONS: CourseConfig[] = [
  {
    id: 401,
    title: "Micro-Moment Reset",
    subtitle: "2 minutes of calm in the chaos",
    duration: "2 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Quick Relief"
  },
  {
    id: 402,
    title: "Patience Refill",
    subtitle: "Restore your reserves",
    duration: "8 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 403,
    title: "Sleep When Baby Sleeps",
    subtitle: "Quick rest for tired caregivers",
    duration: "10 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const CAREER_TRANSITION_FIRST_ROW_SESSIONS: CourseConfig[] = [
  {
    id: 501,
    title: "Clarity on Next Steps",
    subtitle: "Trust the path unfolding",
    duration: "15 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "New Chapter"
  },
  {
    id: 502,
    title: "Release What's Not Working",
    subtitle: "Make space for what's meant for you",
    duration: "12 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 503,
    title: "Confidence Reset",
    subtitle: "You have more to offer than you know",
    duration: "10 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

const RETIRED_FIRST_ROW_SESSIONS: CourseConfig[] = [
  {
    id: 601,
    title: "Morning Gratitude",
    subtitle: "Start each day with appreciation",
    duration: "10 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=200",
    badge: "Daily Practice"
  },
  {
    id: 602,
    title: "Deep Sleep Journey",
    subtitle: "Restorative rest for body and mind",
    duration: "25 min",
    isPremium: false,
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: 603,
    title: "Legacy Reflection",
    subtitle: "Honor the wisdom you've gathered",
    duration: "20 min",
    isPremium: true,
    image: "https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

export const FIRST_ROW_SESSION_VARIANTS: Record<LifePath, CourseConfig[]> = {
  salaried: SALARIED_FIRST_ROW_SESSIONS,
  student: STUDENT_FIRST_ROW_SESSIONS,
  entrepreneur: ENTREPRENEUR_FIRST_ROW_SESSIONS,
  parent: PARENT_FIRST_ROW_SESSIONS,
  career_transition: CAREER_TRANSITION_FIRST_ROW_SESSIONS,
  retired: RETIRED_FIRST_ROW_SESSIONS,
};

export const getFirstRowSessionsForLifePath = (lifePath: LifePath | undefined): CourseConfig[] => {
  if (!lifePath) {
    return DEFAULT_FIRST_ROW_SESSIONS;
  }
  return FIRST_ROW_SESSION_VARIANTS[lifePath] || DEFAULT_FIRST_ROW_SESSIONS;
};

export const SECTION_TITLES: Record<LifePath, string> = {
  salaried: "For Your Workday",
  student: "For Your Studies",
  entrepreneur: "For Your Journey",
  parent: "For Busy Parents",
  career_transition: "For Your Next Chapter",
  retired: "For This Season",
};

export const getSectionTitleForLifePath = (lifePath: LifePath | undefined): string => {
  if (!lifePath) {
    return "Start Your Journey";
  }
  return SECTION_TITLES[lifePath] || "Start Your Journey";
};
