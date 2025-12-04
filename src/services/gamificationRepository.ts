import { 
  LanternState, 
  SparkTransaction, 
  SparkBalance, 
  SignChallenge, 
  SignCompletion,
  Tribe,
  TribeMember,
  Manifestation 
} from '../shared/types/gamification';
import { storage } from './storage';
import { httpClient } from './httpClient';

const LANTERN_KEY = 'lantern_state';
const SPARKS_KEY = 'sparks_balance';
const SIGNS_KEY = 'sign_completions';
const TRIBE_KEY = 'tribe';
const MANIFESTATIONS_KEY = 'manifestations';

export type SparkReason = 'session_complete' | 'sign_found' | 'streak_bonus' | 'achievement' | 'tribe_bonus';

export interface GamificationRepository {
  getLanternState(): LanternState;
  updateLanternHealth(delta: number): LanternState;
  dimLantern(): LanternState;
  rekindleLantern(): LanternState;
  
  getSparksBalance(): SparkBalance;
  earnSparks(amount: number, reason: SparkReason, description: string): SparkBalance;
  
  getDailySignChallenge(day: number): SignChallenge | null;
  completeSign(signId: string, userNote?: string): void;
  getSignCompletions(): SignCompletion[];
  
  getTribe(): Tribe | null;
  joinTribe(tribeId: string): Promise<Tribe>;
  leaveTribe(): void;
  getTribeMembers(tribeId: string): Promise<TribeMember[]>;
  
  getManifestations(): Manifestation[];
  addManifestation(manifestation: Omit<Manifestation, 'id' | 'createdAt'>): Manifestation;
  markManifested(manifestationId: string): void;
}

const DEFAULT_LANTERN: LanternState = {
  health: 100,
  lastUpdated: new Date(),
  streakDays: 0,
  brightestStreak: 0,
};

const DEFAULT_SPARKS: SparkBalance = {
  total: 0,
  transactions: [],
};

const SIGN_CHALLENGES: SignChallenge[] = [
  { id: 'sign_1', day: 1, title: 'The White Feather', description: 'Look for a white feather today', hint: 'Check near trees or parks', sparksReward: 10, isFree: true },
  { id: 'sign_2', day: 2, title: 'Repeating Numbers', description: 'Notice any repeating numbers (11:11, 222, etc.)', sparksReward: 15, isFree: true },
  { id: 'sign_3', day: 3, title: 'Unexpected Kindness', description: 'Notice an act of unexpected kindness', sparksReward: 20, isFree: true },
  { id: 'sign_4', day: 4, title: 'A Song Message', description: 'Pay attention to lyrics that speak to you', sparksReward: 15, isFree: true },
  { id: 'sign_5', day: 5, title: 'Animal Messenger', description: 'Notice an animal that catches your attention', sparksReward: 25, isFree: true },
  { id: 'sign_6', day: 6, title: 'Overheard Wisdom', description: 'Listen for a phrase from a stranger that resonates', sparksReward: 20, isFree: true },
  { id: 'sign_7', day: 7, title: 'The Open Door', description: 'Notice an unexpected opportunity presenting itself', sparksReward: 30, isFree: true },
  { id: 'sign_8', day: 8, title: 'Rainbow Sighting', description: 'Look for a rainbow or rainbow-like colors', sparksReward: 25, isFree: false },
];

export const localGamificationRepository: GamificationRepository = {
  getLanternState(): LanternState {
    return storage.get<LanternState>(LANTERN_KEY) || { ...DEFAULT_LANTERN };
  },

  updateLanternHealth(delta: number): LanternState {
    const current = this.getLanternState();
    const newHealth = Math.max(0, Math.min(100, current.health + delta));
    const updated: LanternState = {
      ...current,
      health: newHealth,
      lastUpdated: new Date(),
      streakDays: delta > 0 ? current.streakDays + 1 : current.streakDays,
      brightestStreak: Math.max(current.brightestStreak, current.streakDays + 1),
    };
    storage.set(LANTERN_KEY, updated);
    return updated;
  },

  dimLantern(): LanternState {
    const current = this.getLanternState();
    const dimAmount = Math.min(20, current.health * 0.1);
    return this.updateLanternHealth(-dimAmount);
  },

  rekindleLantern(): LanternState {
    const current = this.getLanternState();
    const updated: LanternState = {
      ...current,
      health: 50,
      lastUpdated: new Date(),
      streakDays: 0,
    };
    storage.set(LANTERN_KEY, updated);
    return updated;
  },

  getSparksBalance(): SparkBalance {
    return storage.get<SparkBalance>(SPARKS_KEY) || { ...DEFAULT_SPARKS };
  },

  earnSparks(amount: number, reason: SparkReason, description: string): SparkBalance {
    const current = this.getSparksBalance();
    const transaction: SparkTransaction = {
      id: `spark_${Date.now()}`,
      amount,
      reason,
      description,
      createdAt: new Date(),
    };
    const updated: SparkBalance = {
      total: current.total + amount,
      transactions: [transaction, ...current.transactions],
    };
    storage.set(SPARKS_KEY, updated);
    return updated;
  },

  getDailySignChallenge(day: number): SignChallenge | null {
    return SIGN_CHALLENGES.find(s => s.day === day) || null;
  },

  completeSign(signId: string, userNote?: string): void {
    const completions = this.getSignCompletions();
    completions.push({
      signId,
      completedAt: new Date(),
      userNote,
    });
    storage.set(SIGNS_KEY, completions);
    
    const sign = SIGN_CHALLENGES.find(s => s.id === signId);
    if (sign) {
      this.earnSparks(sign.sparksReward, 'sign_found', `Completed: ${sign.title}`);
    }
  },

  getSignCompletions(): SignCompletion[] {
    return storage.get<SignCompletion[]>(SIGNS_KEY) || [];
  },

  getTribe(): Tribe | null {
    return storage.get<Tribe>(TRIBE_KEY);
  },

  async joinTribe(tribeId: string): Promise<Tribe> {
    const mockTribe: Tribe = {
      id: tribeId,
      name: 'Seekers Circle',
      memberIds: ['user_1', 'user_2', 'user_3'],
      createdAt: new Date(),
      totalSparksEarned: 150,
      collectiveStreak: 5,
    };
    storage.set(TRIBE_KEY, mockTribe);
    return mockTribe;
  },

  leaveTribe(): void {
    storage.remove(TRIBE_KEY);
  },

  async getTribeMembers(tribeId: string): Promise<TribeMember[]> {
    void tribeId;
    return [
      { id: 'user_1', name: 'Alex', lanternHealth: 85, currentStreak: 7, role: 'leader' },
      { id: 'user_2', name: 'Jordan', lanternHealth: 72, currentStreak: 3, role: 'member' },
      { id: 'user_3', name: 'Sam', lanternHealth: 90, currentStreak: 12, role: 'member' },
    ];
  },

  getManifestations(): Manifestation[] {
    return storage.get<Manifestation[]>(MANIFESTATIONS_KEY) || [];
  },

  addManifestation(manifestation: Omit<Manifestation, 'id' | 'createdAt'>): Manifestation {
    const manifestations = this.getManifestations();
    const newManifestation: Manifestation = {
      ...manifestation,
      id: `manifest_${Date.now()}`,
      createdAt: new Date(),
    };
    manifestations.unshift(newManifestation);
    storage.set(MANIFESTATIONS_KEY, manifestations);
    return newManifestation;
  },

  markManifested(manifestationId: string): void {
    const manifestations = this.getManifestations();
    const updated = manifestations.map(m =>
      m.id === manifestationId ? { ...m, manifestedAt: new Date() } : m
    );
    storage.set(MANIFESTATIONS_KEY, updated);
  },
};

export const apiGamificationRepository: GamificationRepository = {
  getLanternState(): LanternState {
    return localGamificationRepository.getLanternState();
  },

  updateLanternHealth(delta: number): LanternState {
    const updated = localGamificationRepository.updateLanternHealth(delta);
    httpClient.put('/gamification/lantern', { health: updated.health });
    return updated;
  },

  dimLantern(): LanternState {
    return localGamificationRepository.dimLantern();
  },

  rekindleLantern(): LanternState {
    const updated = localGamificationRepository.rekindleLantern();
    httpClient.post('/gamification/lantern/rekindle');
    return updated;
  },

  getSparksBalance(): SparkBalance {
    return localGamificationRepository.getSparksBalance();
  },

  earnSparks(amount: number, reason: SparkReason, description: string): SparkBalance {
    const updated = localGamificationRepository.earnSparks(amount, reason, description);
    httpClient.post('/gamification/sparks/earn', { amount, reason, description });
    return updated;
  },

  getDailySignChallenge(day: number): SignChallenge | null {
    return localGamificationRepository.getDailySignChallenge(day);
  },

  completeSign(signId: string, userNote?: string): void {
    localGamificationRepository.completeSign(signId, userNote);
    httpClient.post('/gamification/signs/complete', { signId, userNote });
  },

  getSignCompletions(): SignCompletion[] {
    return localGamificationRepository.getSignCompletions();
  },

  getTribe(): Tribe | null {
    return localGamificationRepository.getTribe();
  },

  async joinTribe(tribeId: string): Promise<Tribe> {
    const response = await httpClient.post<Tribe>(`/gamification/tribes/${tribeId}/join`);
    if (response.success && response.data) {
      storage.set(TRIBE_KEY, response.data);
      return response.data;
    }
    return localGamificationRepository.joinTribe(tribeId);
  },

  leaveTribe(): void {
    const tribe = this.getTribe();
    if (tribe) {
      httpClient.post(`/gamification/tribes/${tribe.id}/leave`);
    }
    localGamificationRepository.leaveTribe();
  },

  async getTribeMembers(tribeId: string): Promise<TribeMember[]> {
    const response = await httpClient.get<TribeMember[]>(`/gamification/tribes/${tribeId}/members`);
    if (response.success && response.data) {
      return response.data;
    }
    return localGamificationRepository.getTribeMembers(tribeId);
  },

  getManifestations(): Manifestation[] {
    return localGamificationRepository.getManifestations();
  },

  addManifestation(manifestation: Omit<Manifestation, 'id' | 'createdAt'>): Manifestation {
    const created = localGamificationRepository.addManifestation(manifestation);
    httpClient.post('/gamification/manifestations', created);
    return created;
  },

  markManifested(manifestationId: string): void {
    localGamificationRepository.markManifested(manifestationId);
    httpClient.put(`/gamification/manifestations/${manifestationId}/manifested`);
  },
};

const USE_API = false;
export const gamificationRepository: GamificationRepository = USE_API ? apiGamificationRepository : localGamificationRepository;
