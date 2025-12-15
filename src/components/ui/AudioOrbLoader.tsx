interface AudioOrbLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  isPlaying?: boolean;
}

export function AudioOrbLoader({ size = 'md', isPlaying = true }: AudioOrbLoaderProps) {
  const sizeClass = size === 'sm' ? 'sr-audio-orb-sm' : size === 'lg' ? 'sr-audio-orb-lg' : '';
  
  return (
    <div className={`sr-audio-orb-container ${sizeClass}`}>
      <div className="sr-audio-orb-inner" />
      <div 
        className="sr-audio-orb-spinner"
        style={{
          animationPlayState: isPlaying ? 'running' : 'paused'
        }}
      />
    </div>
  );
}

export default AudioOrbLoader;
