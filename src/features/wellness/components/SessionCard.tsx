import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Lock } from 'lucide-react';
import { WellnessSession } from '../../../shared/types/wellness';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';

interface SessionCardProps {
  session: WellnessSession;
  onStart: (session: WellnessSession) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onStart }) => {
  const categoryColors = {
    mindfulness: 'bg-primary-100 text-primary-800',
    productivity: 'bg-secondary-100 text-secondary-800',
    confidence: 'bg-accent-100 text-accent-800',
    anxiety: 'bg-success-100 text-success-800',
    focus: 'bg-warning-100 text-warning-800',
    leadership: 'bg-error-100 text-error-800',
  };
  
  const difficultyColors = {
    beginner: 'bg-success-100 text-success-800',
    intermediate: 'bg-warning-100 text-warning-800',
    advanced: 'bg-error-100 text-error-800',
  };
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 h-full flex flex-col" hover>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-neutral-900">{session.title}</h3>
              {session.isPremium && (
                <Lock className="w-4 h-4 text-warning-600" />
              )}
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              <Badge 
                variant="primary" 
                size="sm"
                className={categoryColors[session.category]}
              >
                {session.category}
              </Badge>
              <Badge 
                variant="secondary" 
                size="sm"
                className={difficultyColors[session.difficulty]}
              >
                {session.difficulty}
              </Badge>
            </div>
          </div>
          
          {session.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-warning-500 fill-current" />
              <span className="text-sm font-medium text-neutral-700">{session.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 flex-1">{session.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-neutral-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{session.duration} min</span>
          </div>
          
          <Button
            size="sm"
            onClick={() => onStart(session)}
            disabled={session.isPremium}
            className="flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{session.isPremium ? 'Premium' : 'Start'}</span>
          </Button>
        </div>
        
        {session.completedAt && (
          <div className="mt-3 pt-3 border-t border-neutral-200">
            <p className="text-xs text-success-600">
              ✅ Completed on {session.completedAt.toLocaleDateString()}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
