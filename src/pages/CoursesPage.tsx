import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Star, Lock, Play, X, Users, Sparkles } from 'lucide-react';
import { VoiceSessionModal } from '../components/voice/VoiceSessionModal';
import { Paywall } from '../components/subscription/Paywall';
import { useSubscriptionStore, shouldShowPaywall } from '../store/subscriptionStore';
import { useContentStore } from '../store/contentStore';
import { useAuthStore } from '../store/authStore';
import { useGamificationStore } from '../store/gamificationStore';

interface Course {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  rating: number;
  students: number;
  isPremium: boolean;
  category: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "The Confidence Reset",
    subtitle: "Rebuild your belief in 15 mins",
    duration: "15 min",
    rating: 4.8,
    students: 12000,
    isPremium: false,
    category: "Confidence"
  },
  {
    id: 2,
    title: "Morning Manifestation",
    subtitle: "Start your day with intention",
    duration: "12 min",
    rating: 4.9,
    students: 8500,
    isPremium: true,
    category: "Manifestation"
  },
  {
    id: 3,
    title: "Deep Sleep Journey",
    subtitle: "Release the day and rest deeply",
    duration: "25 min",
    rating: 4.7,
    students: 15000,
    isPremium: false,
    category: "Sleep"
  },
  {
    id: 4,
    title: "Anxiety to Peace",
    subtitle: "Transform worry into wisdom",
    duration: "18 min",
    rating: 4.8,
    students: 12000,
    isPremium: false,
    category: "Anxiety"
  },
  {
    id: 5,
    title: "Abundance Mindset",
    subtitle: "Shift from scarcity to prosperity",
    duration: "20 min",
    rating: 4.9,
    students: 8000,
    isPremium: true,
    category: "Manifestation"
  },
  {
    id: 6,
    title: "Inner Child Healing",
    subtitle: "Reconnect with your authentic self",
    duration: "22 min",
    rating: 4.9,
    students: 6500,
    isPremium: true,
    category: "Healing"
  }
];

const categories = ["All", "Manifestation", "Sleep", "Anxiety", "Confidence", "Healing"];

export const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showVoiceUI, setShowVoiceUI] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallDayNumber, setPaywallDayNumber] = useState<number | undefined>(undefined);

  // Store hooks for subscription and content
  const { checkSubscriptionStatus } = useSubscriptionStore();
  const { getRoadProgress, startRoad } = useContentStore();
  const { selectedRoad } = useAuthStore();
  const { addSparks } = useGamificationStore();
  
  const subscriptionStatus = checkSubscriptionStatus();
  const roadSlug = selectedRoad || 'manifest';
  const progress = getRoadProgress(roadSlug);
  const currentDay = progress?.currentDay || 1;

  // Initialize road progress if not started
  React.useEffect(() => {
    if (selectedRoad && !progress) {
      startRoad(selectedRoad);
    }
  }, [selectedRoad, progress, startRoad]);

  const handleStartSession = (course: Course) => {
    // Map course to a day number (for demo, use course.id as day)
    const dayNumber = course.id;
    
    // Check if user can access this content
    if (course.isPremium && shouldShowPaywall(subscriptionStatus, dayNumber)) {
      setPaywallDayNumber(dayNumber);
      setShowPaywall(true);
      setSelectedCourse(null);
      return;
    }
    
    setActiveCourse(course);
    setSelectedCourse(null);
    setShowVoiceUI(true);
  };

  const handleSessionComplete = (sparksEarned: number, dayAdvanced: boolean) => {
    if (sparksEarned > 0) {
      addSparks(sparksEarned, 'meditation');
    }
    if (dayAdvanced) {
      console.log('Day advanced! Unlocked next day.');
    }
  };

  const filteredCourses = selectedCategory === "All"
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Courses</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Explore guided sessions for your journey</p>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-card-dark rounded-2xl border border-surface-border-strong dark:border-surface-border-dark-strong p-4 sm:p-5 shadow-sm dark:shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.map((course, index) => (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCourseClick(course)}
              className="w-full text-left bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-surface-border dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-700 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white text-sm truncate">{course.title}</h3>
                    {course.isPremium && (
                      <Lock className="w-3.5 h-3.5 text-gold-500 dark:text-gold-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 line-clamp-1">{course.subtitle}</p>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gold-500 dark:text-gold-400" />
                      {course.rating}
                    </span>
                    <span>{(course.students / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Play className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>

    {/* Course Detail Modal */}
    <AnimatePresence>
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{selectedCourse.title}</h2>
                    {selectedCourse.isPremium && (
                      <span className="px-2 py-0.5 bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-xs font-medium rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{selectedCourse.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">{selectedCourse.duration}</p>
                <p className="text-xs text-neutral-500">Duration</p>
              </div>
              <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">{selectedCourse.rating}</p>
                <p className="text-xs text-neutral-500">Rating</p>
              </div>
              <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <Users className="w-5 h-5 text-teal-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">{(selectedCourse.students / 1000).toFixed(1)}k</p>
                <p className="text-xs text-neutral-500">Students</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">About this course</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                This guided session will help you {selectedCourse.subtitle.toLowerCase()}. 
                Perfect for your {selectedCourse.category.toLowerCase()} journey, this course combines 
                soothing audio guidance with powerful visualization techniques to help you manifest 
                your intentions and transform your mindset.
              </p>
            </div>

            {/* What you'll learn */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">What you'll experience</h3>
              <div className="space-y-2">
                {['Guided breathing exercises', 'Visualization techniques', 'Affirmation practice', 'Mindful reflection'].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleStartSession(selectedCourse)}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              {selectedCourse.isPremium ? 'Unlock & Start Session' : 'Start Session'}
            </button>

            {selectedCourse.isPremium && (
              <p className="text-center text-xs text-neutral-500 mt-3">
                Premium content requires an active subscription
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Voice Session Modal */}
    <VoiceSessionModal
      isOpen={showVoiceUI && !!activeCourse}
      onClose={() => setShowVoiceUI(false)}
      courseTitle={activeCourse?.title ?? ''}
      courseSubtitle={activeCourse?.subtitle}
      durationLabel={activeCourse?.duration}
      roadSlug={roadSlug}
      dayNumber={activeCourse?.id || currentDay}
      onComplete={handleSessionComplete}
    />

    {/* Paywall Modal */}
    <Paywall
      isOpen={showPaywall}
      onClose={() => setShowPaywall(false)}
      dayNumber={paywallDayNumber}
    />
    </>
  );
};
