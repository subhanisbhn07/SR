import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock, ChevronRight } from 'lucide-react';
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
  subtitle?: string;
  courses: Course[];
  onCourseSelect?: (courseId: number) => void;
  onViewMore?: () => void;
  compact?: boolean;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  subtitle,
  courses,
  onCourseSelect,
  onViewMore,
  compact = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={compact ? "mb-4" : "mb-12"}
    >
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-neumo-text">{title}</h2>
          {subtitle && (
            <p className="text-sm text-neumo-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
      )}
      
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {courses.map((course, index) => (
                                <motion.button
                                  key={course.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.05 * index }}
                                  whileHover={{ scale: 1.03, y: -4 }}
                                  onClick={() => onCourseSelect?.(course.id)}
                                  className="p-3 md:p-4 rounded-neumo bg-neumo-surface border border-neumo-border cursor-pointer group transition-all duration-300 shadow-neumo-sm hover:shadow-neumo-inset-sm text-left w-full"
                                >
                  <div className="relative mb-3">
                    <div
                      className="w-full aspect-square rounded-neumo bg-cover bg-center shadow-neumo-inset-sm"
                      style={{ backgroundImage: `url(${course.image})` }}
                    />
                    <div className="absolute inset-0 bg-neumo-text/40 rounded-neumo flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    <h3 className="text-sm md:text-base font-semibold text-neumo-text mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-neumo-text-secondary text-xs mb-2 line-clamp-2">{course.subtitle}</p>
              
                    <div className="flex items-center justify-between text-xs text-neumo-text-muted">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                
                      {course.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-neumo-text-secondary fill-current" />
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-neumo-surface shadow-neumo-sm hover:shadow-neumo-inset-sm active:shadow-neumo-inset-sm text-neumo-text-secondary hover:text-neumo-text font-medium rounded-neumo transition-all duration-200"
              >
                View More
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
  );
};
