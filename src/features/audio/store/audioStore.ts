import { create } from 'zustand';

export interface AudioTrack {
  id: string;
  name: string;
  url: string;
  duration: number;
  category: 'meditation' | 'ambience' | 'music';
}

interface AudioState {
  // Playback state
  isPlaying: boolean;
  currentTrack: AudioTrack | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  
  // Background ambience
  ambienceTrack: AudioTrack | null;
  ambienceVolume: number;
  isAmbiencePlaying: boolean;
  
  // Audio element refs (managed externally)
  audioElement: HTMLAudioElement | null;
  ambienceElement: HTMLAudioElement | null;
  
  // Actions
  setAudioElement: (element: HTMLAudioElement | null) => void;
  setAmbienceElement: (element: HTMLAudioElement | null) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setTrack: (track: AudioTrack) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  
  // Ambience controls
  playAmbience: (track: AudioTrack) => void;
  pauseAmbience: () => void;
  stopAmbience: () => void;
  setAmbienceVolume: (volume: number) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  isPlaying: false,
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
  
  ambienceTrack: null,
  ambienceVolume: 0.3,
  isAmbiencePlaying: false,
  
  audioElement: null,
  ambienceElement: null,
  
  // Actions
  setAudioElement: (element) => set({ audioElement: element }),
  
  setAmbienceElement: (element) => set({ ambienceElement: element }),
  
  play: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.play().catch(console.error);
      set({ isPlaying: true });
    }
  },
  
  pause: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      set({ isPlaying: false });
    }
  },
  
  stop: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      set({ isPlaying: false, currentTime: 0 });
    }
  },
  
  setTrack: (track) => {
    const { audioElement, volume, isMuted } = get();
    if (audioElement) {
      audioElement.src = track.url;
      audioElement.volume = isMuted ? 0 : volume;
      audioElement.load();
    }
    set({ currentTrack: track, currentTime: 0, duration: track.duration });
  },
  
  setCurrentTime: (time) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = time;
    }
    set({ currentTime: time });
  },
  
  setDuration: (duration) => set({ duration }),
  
  setVolume: (volume) => {
    const { audioElement, isMuted } = get();
    if (audioElement && !isMuted) {
      audioElement.volume = volume;
    }
    set({ volume });
  },
  
  toggleMute: () => {
    const { audioElement, isMuted, volume } = get();
    const newMuted = !isMuted;
    if (audioElement) {
      audioElement.volume = newMuted ? 0 : volume;
    }
    set({ isMuted: newMuted });
  },
  
  // Ambience controls
  playAmbience: (track) => {
    const { ambienceElement, ambienceVolume } = get();
    if (ambienceElement) {
      ambienceElement.src = track.url;
      ambienceElement.volume = ambienceVolume;
      ambienceElement.loop = true;
      ambienceElement.load();
      ambienceElement.play().catch(console.error);
    }
    set({ ambienceTrack: track, isAmbiencePlaying: true });
  },
  
  pauseAmbience: () => {
    const { ambienceElement } = get();
    if (ambienceElement) {
      ambienceElement.pause();
    }
    set({ isAmbiencePlaying: false });
  },
  
  stopAmbience: () => {
    const { ambienceElement } = get();
    if (ambienceElement) {
      ambienceElement.pause();
      ambienceElement.currentTime = 0;
    }
    set({ ambienceTrack: null, isAmbiencePlaying: false });
  },
  
  setAmbienceVolume: (volume) => {
    const { ambienceElement } = get();
    if (ambienceElement) {
      ambienceElement.volume = volume;
    }
    set({ ambienceVolume: volume });
  },
}));
