import { UniverseReceipt } from '../types/viral';

export const calculateSignProbability = (signName: string, dayNumber: number): number => {
  const baseRarity: { [key: string]: number } = {
    'White Feather': 0.004,
    'Key': 0.012,
    'Running Water': 0.089,
    'Coin': 0.156,
    '11:11': 0.0076,
    'Butterfly': 0.023,
    'Open Door': 0.045,
    'Echo': 0.067,
    'Seed': 0.134,
    'Crossroads': 0.098,
    'Anchor': 0.112,
    'Connection': 0.034,
    'Release': 0.056,
    'Threshold': 0.078,
  };

  const baseProbability = baseRarity[signName] || 0.05;
  const dayMultiplier = 1 + (dayNumber * 0.001);
  
  return Math.min(baseProbability * dayMultiplier, 0.999);
};

export const generateReceiptText = (receipt: UniverseReceipt): string => {
  const date = receipt.timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const time = receipt.timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const probabilityPercent = (receipt.probability * 100).toFixed(3);

  return `
╔════════════════════════════════════╗
║     UNIVERSE TRANSACTION LOG       ║
╠════════════════════════════════════╣
║                                    ║
║  ITEM: ${receipt.signName.padEnd(28)}║
║  DAY:  ${String(receipt.dayNumber).padEnd(28)}║
║  TIME: ${time.padEnd(28)}║
║  DATE: ${date.padEnd(28)}║
║  LOC:  ${receipt.location.padEnd(28)}║
║                                    ║
║  PROBABILITY: ${probabilityPercent}%${' '.repeat(19 - probabilityPercent.length)}║
║  STATUS: ${receipt.status.padEnd(24)}║
║                                    ║
║  "The universe is speaking."       ║
║                                    ║
╚════════════════════════════════════╝
  `.trim();
};

export const getReceiptStatus = (probability: number): UniverseReceipt['status'] => {
  if (probability < 0.01) return 'RARE EVENT';
  if (probability < 0.05) return 'SYNCHRONICITY DETECTED';
  return 'UNIVERSE CONFIRMED';
};
