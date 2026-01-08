import { ReactNode } from 'react';

interface NeumoCardProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBlob?: boolean;
  blobColor?: 'teal' | 'purple' | 'gold';
}

export function NeumoCard({
  children,
  className = '',
  size = 'md',
  showBlob = true,
  blobColor = 'teal'
}: NeumoCardProps) {
  const sizeClass = size === 'sm' ? 'sr-neumo-card-sm' : size === 'lg' ? 'sr-neumo-card-lg' : '';

  return (
    <div className={`sr-neumo-card ${sizeClass} ${className}`}>
      {showBlob && (
        <div 
          className="sr-neumo-card-blob"
          style={{
            background: blobColor === 'teal' 
              ? 'radial-gradient(circle at center, #0E7A77 0%, #17A7A2 50%, transparent 70%)'
              : blobColor === 'purple'
              ? 'radial-gradient(circle at center, #8B5CF6 0%, #A78BFA 50%, transparent 70%)'
              : 'radial-gradient(circle at center, #F59E0B 0%, #FBBF24 50%, transparent 70%)'
          }}
          aria-hidden="true"
        />
      )}
      <div className="sr-neumo-card-inner">
        {children}
      </div>
    </div>
  );
}

export default NeumoCard;
