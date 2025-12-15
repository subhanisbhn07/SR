interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message }: PageLoaderProps) {
  return (
    <div className="sr-page-loader">
      <div className="flex flex-col items-center gap-6">
        <div className="sr-page-loader-wrapper">
          <div className="sr-page-loader-circle" />
          <div className="sr-page-loader-circle" />
          <div className="sr-page-loader-circle" />
          <div className="sr-page-loader-shadow" />
          <div className="sr-page-loader-shadow" />
          <div className="sr-page-loader-shadow" />
        </div>
        {message && (
          <p className="text-neumo-text-secondary text-sm font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageLoader;
