import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="sr-404-container min-h-screen flex flex-col items-center justify-center bg-neumo-bg p-8">
      <div className="sr-404-card text-center p-12 rounded-2xl bg-white shadow-neumo max-w-md">
        <div className="sr-404-number text-8xl font-bold text-brand-teal mb-4">404</div>
        <h1 className="sr-404-title text-2xl font-semibold text-neumo-text mb-4">Path Not Found</h1>
        <p className="sr-404-message text-neumo-text-secondary mb-8">
          The road you're looking for seems to have wandered off. 
          Let's guide you back to your journey.
        </p>
        <Link to="/" className="sr-404-btn inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl font-medium hover:bg-brand-teal-dark transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Back to SignRoad
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
