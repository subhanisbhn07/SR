import { UserProfile } from '../shared/types/onboarding';
import { storage } from './storage';
import { httpClient } from './httpClient';

const PROFILE_KEY = 'user_profile';

export interface OnboardingRepository {
  loadProfile(): UserProfile | null;
  saveProfile(profile: UserProfile): void;
  resetProfile(): void;
  syncProfile(profile: UserProfile): Promise<void>;
}

export const localOnboardingRepository: OnboardingRepository = {
  loadProfile(): UserProfile | null {
    return storage.get<UserProfile>(PROFILE_KEY);
  },

  saveProfile(profile: UserProfile): void {
    storage.set(PROFILE_KEY, profile);
  },

  resetProfile(): void {
    storage.remove(PROFILE_KEY);
  },

  async syncProfile(profile: UserProfile): Promise<void> {
    this.saveProfile(profile);
  },
};

export const apiOnboardingRepository: OnboardingRepository = {
  loadProfile(): UserProfile | null {
    return storage.get<UserProfile>(PROFILE_KEY);
  },

  saveProfile(profile: UserProfile): void {
    storage.set(PROFILE_KEY, profile);
  },

  resetProfile(): void {
    storage.remove(PROFILE_KEY);
  },

  async syncProfile(profile: UserProfile): Promise<void> {
    this.saveProfile(profile);
    
    await httpClient.put('/users/profile', { profile });
  },
};

const USE_API = false;
export const onboardingRepository: OnboardingRepository = USE_API ? apiOnboardingRepository : localOnboardingRepository;
