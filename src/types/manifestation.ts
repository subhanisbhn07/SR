export interface Goal {
  id: string;
  text: string;
  category: 'wealth' | 'love' | 'health' | 'career' | 'personal' | 'other';
  createdAt: Date;
}

export interface SignLog {
  id: string;
  stepNumber: number;
  signName: string;
  found: boolean;
  note?: string;
  photoUrl?: string;
  loggedAt: Date;
}

export interface JournalEntry {
  id: string;
  stepNumber: number;
  content: string;
  prompt: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface Manifestation {
  id: string;
  userId: string;
  content: string;
  isPublic: boolean;
  type: 'synchronicity' | 'win';
  createdAt: Date;
}
