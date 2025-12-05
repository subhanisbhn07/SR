import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Lock, Play } from 'lucide-react';

const courses = [
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
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <div className="px-4 py-6">
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
                ? 'bg-accent-500 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-800/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-accent-500 dark:text-accent-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-white truncate">{course.title}</h3>
                  {course.isPremium && (
                    <Lock className="w-4 h-4 text-accent-500 dark:text-accent-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{course.subtitle}</p>
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
                    {course.rating}
                  </span>
                  <span>{(course.students / 1000).toFixed(1)}k students</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-500/20 flex items-center justify-center flex-shrink-0 hover:bg-accent-200 dark:hover:bg-accent-500/30 transition-colors">
                <Play className="w-5 h-5 text-accent-500 dark:text-accent-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
