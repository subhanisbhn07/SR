import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Users } from 'lucide-react';
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
}

export const CourseSection: React.FC<CourseSectionProps> = ({ 
  title, 
  courses, 
  gradient = "bg-neutral-800/30" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-neutral-100 mb-6">{title}</h2>
      
      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`p-6 rounded-2xl ${gradient} backdrop-blur-sm border border-neutral-700/30 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-neutral-100">{course.title}</h3>
                  {course.isPremium ? (
                    <Badge variant="warning" size="sm">Premium</Badge>
                  ) : (
                    <Badge variant="success" size="sm">Free</Badge>
                  )}
                  {course.badge && (
                    <Badge variant="primary" size="sm">{course.badge}</Badge>
                  )}
                </div>
                
                <p className="text-neutral-300 text-sm mb-3">{course.subtitle}</p>
                
                <div className="flex items-center space-x-4 text-xs text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  
                  {course.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  )}
                  
                  {course.students && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{course.students}k</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button size="sm" variant="ghost" className="text-accent-400 hover:text-accent-300">
                Begin
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};