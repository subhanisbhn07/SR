import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="sr-404-container">
      <div className="sr-404-card">
        <div className="sr-404-number">404</div>
        <h1 className="sr-404-title">Path Not Found</h1>
        <p className="sr-404-message">
          The road you're looking for seems to have wandered off. 
          Let's guide you back to your journey.
        </p>
        <Link to="/" className="sr-404-btn">
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
