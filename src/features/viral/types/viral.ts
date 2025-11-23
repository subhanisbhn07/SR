export interface UniverseReceipt {
  id: string;
  userId: string;
  signName: string;
  signDescription: string;
  dayNumber: number;
  timestamp: Date;
  location: string;
  probability: number;
  status: 'UNIVERSE CONFIRMED' | 'SYNCHRONICITY DETECTED' | 'RARE EVENT';
}

export interface SignalStrength {
  userId: string;
  dayNumber: number;
  strength: number;
  timestamp: Date;
}

export interface TwinFlameCode {
  userId: string;
  code: string;
  halfCodeImage: string;
  isMatched: boolean;
  matchedWith?: string;
  timestamp: Date;
}

export type SocialPlatform = 'instagram' | 'twitter' | 'tiktok' | 'facebook' | 'copy';
