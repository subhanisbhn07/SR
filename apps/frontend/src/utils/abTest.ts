type ExperimentName =
  | 'hero_copy_variant'
  | 'cta_color_variant'
  | 'onboarding_flow'
  | 'pricing_display'
  | 'social_proof_position';

type VariantName = 'control' | 'variant_a' | 'variant_b';

interface Experiment {
  name: ExperimentName;
  variants: VariantName[];
  weights: number[];
  enabled: boolean;
}

const experiments: Record<ExperimentName, Experiment> = {
  hero_copy_variant: {
    name: 'hero_copy_variant',
    variants: ['control', 'variant_a', 'variant_b'],
    weights: [0.34, 0.33, 0.33],
    enabled: false,
  },
  cta_color_variant: {
    name: 'cta_color_variant',
    variants: ['control', 'variant_a'],
    weights: [0.5, 0.5],
    enabled: false,
  },
  onboarding_flow: {
    name: 'onboarding_flow',
    variants: ['control', 'variant_a'],
    weights: [0.5, 0.5],
    enabled: false,
  },
  pricing_display: {
    name: 'pricing_display',
    variants: ['control', 'variant_a'],
    weights: [0.5, 0.5],
    enabled: false,
  },
  social_proof_position: {
    name: 'social_proof_position',
    variants: ['control', 'variant_a'],
    weights: [0.5, 0.5],
    enabled: false,
  },
};

const getStoredVariant = (experimentName: ExperimentName): VariantName | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`ab_${experimentName}`);
  return stored as VariantName | null;
};

const storeVariant = (experimentName: ExperimentName, variant: VariantName): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`ab_${experimentName}`, variant);
};

const selectVariant = (experiment: Experiment): VariantName => {
  const random = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < experiment.variants.length; i++) {
    cumulative += experiment.weights[i];
    if (random < cumulative) {
      return experiment.variants[i];
    }
  }
  
  return experiment.variants[0];
};

export const getVariant = (experimentName: ExperimentName): VariantName => {
  const experiment = experiments[experimentName];
  
  if (!experiment.enabled) {
    return 'control';
  }
  
  const storedVariant = getStoredVariant(experimentName);
  if (storedVariant && experiment.variants.includes(storedVariant)) {
    return storedVariant;
  }
  
  const selectedVariant = selectVariant(experiment);
  storeVariant(experimentName, selectedVariant);
  
  return selectedVariant;
};

export const isInVariant = (experimentName: ExperimentName, variant: VariantName): boolean => {
  return getVariant(experimentName) === variant;
};

export const useExperiment = (experimentName: ExperimentName): VariantName => {
  return getVariant(experimentName);
};
