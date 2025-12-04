import { create } from 'zustand';
import { 
  LanternState, 
  SparkBalance, 
  SignChallenge, 
  SignCompletion,
  Tribe,
  TribeMember,
  Manifestation 
} from '../../../shared/types/gamification';
import { gamificationRepository, SparkReason } from '../../../services/gamificationRepository';

interface GamificationState {
  lantern: LanternState;
  sparks: SparkBalance;
  currentSign: SignChallenge | null;
  signCompletions: SignCompletion[];
  tribe: Tribe | null;
  tribeMembers: TribeMember[];
  manifestations: Manifestation[];
  currentDay: number;
  
  refreshLantern: () => void;
  updateLanternHealth: (delta: number) => void;
  dimLantern: () => void;
  rekindleLantern: () => void;
  
  earnSparks: (amount: number, reason: SparkReason, description: string) => void;
  
  loadDailySign: () => void;
  completeSign: (userNote?: string) => void;
  
  joinTribe: (tribeId: string) => Promise<void>;
  leaveTribe: () => void;
  loadTribeMembers: () => Promise<void>;
  
  addManifestation: (intention: string, category: Manifestation['category'], isPublic: boolean) => void;
  markManifested: (manifestationId: string) => void;
}

export const useGamificationStore = create<GamificationState>((set, get) => ({
  lantern: gamificationRepository.getLanternState(),
  sparks: gamificationRepository.getSparksBalance(),
  currentSign: null,
  signCompletions: gamificationRepository.getSignCompletions(),
  tribe: gamificationRepository.getTribe(),
  tribeMembers: [],
  manifestations: gamificationRepository.getManifestations(),
  currentDay: 1,
  
  refreshLantern: () => {
    const lantern = gamificationRepository.getLanternState();
    set({ lantern });
  },
  
  updateLanternHealth: (delta) => {
    const lantern = gamificationRepository.updateLanternHealth(delta);
    set({ lantern });
  },
  
  dimLantern: () => {
    const lantern = gamificationRepository.dimLantern();
    set({ lantern });
  },
  
  rekindleLantern: () => {
    const lantern = gamificationRepository.rekindleLantern();
    set({ lantern });
  },
  
  earnSparks: (amount, reason, description) => {
    const sparks = gamificationRepository.earnSparks(amount, reason, description);
    set({ sparks });
  },
  
  loadDailySign: () => {
    const { currentDay } = get();
    const sign = gamificationRepository.getDailySignChallenge(currentDay);
    set({ currentSign: sign });
  },
  
  completeSign: (userNote) => {
    const { currentSign, currentDay } = get();
    if (currentSign) {
      gamificationRepository.completeSign(currentSign.id, userNote);
      const signCompletions = gamificationRepository.getSignCompletions();
      const sparks = gamificationRepository.getSparksBalance();
      set({ 
        signCompletions, 
        sparks,
        currentDay: currentDay + 1,
        currentSign: null,
      });
    }
  },
  
  joinTribe: async (tribeId) => {
    const tribe = await gamificationRepository.joinTribe(tribeId);
    set({ tribe });
    await get().loadTribeMembers();
  },
  
  leaveTribe: () => {
    gamificationRepository.leaveTribe();
    set({ tribe: null, tribeMembers: [] });
  },
  
  loadTribeMembers: async () => {
    const { tribe } = get();
    if (tribe) {
      const tribeMembers = await gamificationRepository.getTribeMembers(tribe.id);
      set({ tribeMembers });
    }
  },
  
  addManifestation: (intention, category, isPublic) => {
    const manifestation = gamificationRepository.addManifestation({
      userId: 'current_user',
      intention,
      category,
      isPublic,
    });
    set(state => ({
      manifestations: [manifestation, ...state.manifestations],
    }));
  },
  
  markManifested: (manifestationId) => {
    gamificationRepository.markManifested(manifestationId);
    set(state => ({
      manifestations: state.manifestations.map(m =>
        m.id === manifestationId ? { ...m, manifestedAt: new Date() } : m
      ),
    }));
  },
}));
