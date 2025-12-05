import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Users, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface Course {
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

interface CourseSectionProps {
  title: string;
  courses: Course[];
  gradient?: string;
  onCourseSelect?: (courseId: number) => void;
  onViewMore?: () => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({ 
  title, 
  courses, 
  gradient = "bg-neutral-800/30",
  onCourseSelect,
  onViewMore
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">{title}</h2>
      
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {courses.map((course, index) => (
                                <motion.button
                                  key={course.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.05 * index }}
                                  whileHover={{ scale: 1.03, y: -4 }}
                                  onClick={() => onCourseSelect?.(course.id)}
                                  className={`p-3 md:p-4 rounded-xl bg-white dark:${gradient} backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/30 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 text-left w-full shadow-sm dark:shadow-none`}
                                >
                  <div className="relative mb-3">
                    <div
                      className="w-full aspect-square rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${course.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      {course.isPremium ? (
                        <Badge variant="warning" size="sm">Premium</Badge>
                      ) : (
                        <Badge variant="success" size="sm">Free</Badge>
                      )}
                    </div>
                  </div>
            
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-2 line-clamp-2">{course.subtitle}</p>
              
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                
                      {course.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                    </motion.button>
                  ))}
                </div>
          
          {onViewMore && (
            <div className="mt-6 text-center">
              <button
                onClick={onViewMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium rounded-xl transition-all duration-200 border border-neutral-200 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600/50"
              >
                View More
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
  );
};
