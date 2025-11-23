import { create } from 'zustand';
import { UniverseReceipt, SignalStrength, TwinFlameCode } from '../types/viral';
import { calculateSignProbability, getReceiptStatus } from '../utils/receiptGenerator';

interface ViralState {
  receipts: UniverseReceipt[];
  signalStrength: SignalStrength | null;
  twinFlameCode: TwinFlameCode | null;
  generateReceipt: (signName: string, signDescription: string, dayNumber: number, location: string) => UniverseReceipt;
  generateSignalStrength: (dayNumber: number) => SignalStrength;
  generateTwinFlameCode: () => TwinFlameCode;
  matchTwinFlame: (code: string) => boolean;
  getReceiptById: (id: string) => UniverseReceipt | undefined;
}

const generateRandomCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === 3) code += '-';
  }
  return code;
};

export const useViralStore = create<ViralState>((set, get) => ({
  receipts: [],
  signalStrength: null,
  twinFlameCode: null,

  generateReceipt: (signName, signDescription, dayNumber, location) => {
    const probability = calculateSignProbability(signName, dayNumber);
    const status = getReceiptStatus(probability);
    
    const receipt: UniverseReceipt = {
      id: `receipt-${Date.now()}`,
      userId: 'current-user',
      signName,
      signDescription,
      dayNumber,
      timestamp: new Date(),
      location,
      probability,
      status,
    };

    set((state) => ({
      receipts: [...state.receipts, receipt],
    }));

    return receipt;
  },

  generateSignalStrength: (dayNumber) => {
    const strength = 95 + Math.floor(Math.random() * 5);
    
    const signalStrength: SignalStrength = {
      userId: 'current-user',
      dayNumber,
      strength,
      timestamp: new Date(),
    };

    set({ signalStrength });
    return signalStrength;
  },

  generateTwinFlameCode: () => {
    const code = generateRandomCode();
    
    const twinFlameCode: TwinFlameCode = {
      userId: 'current-user',
      code,
      halfCodeImage: `/twin-flame/${code}.png`,
      isMatched: false,
      timestamp: new Date(),
    };

    set({ twinFlameCode });
    return twinFlameCode;
  },

  matchTwinFlame: (code) => {
    const { twinFlameCode } = get();
    
    if (!twinFlameCode || twinFlameCode.isMatched) {
      return false;
    }

    const isMatch = Math.random() > 0.95;
    
    if (isMatch) {
      set((state) => ({
        twinFlameCode: state.twinFlameCode ? {
          ...state.twinFlameCode,
          isMatched: true,
          matchedWith: code,
        } : null,
      }));
    }

    return isMatch;
  },

  getReceiptById: (id) => {
    return get().receipts.find((r) => r.id === id);
  },
}));
