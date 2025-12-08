import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Get Supabase config from localStorage (set via admin panel)
const getSupabaseConfig = () => {
  const config = localStorage.getItem('signroad-supabase-config');
  if (config) {
    try {
      return JSON.parse(config);
    } catch {
      return null;
    }
  }
  return null;
};

// Create a singleton Supabase client
let supabaseInstance: SupabaseClient<Database> | null = null;

export const getSupabase = (): SupabaseClient<Database> | null => {
  const config = getSupabaseConfig();
  
  if (!config?.url || !config?.anonKey) {
    return null;
  }

  // Create new instance if config changed or doesn't exist
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }

  return supabaseInstance;
};

// Reset the Supabase instance (call when config changes)
export const resetSupabaseInstance = () => {
  supabaseInstance = null;
};

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  const config = getSupabaseConfig();
  return !!(config?.url && config?.anonKey);
};

// Save Supabase config to localStorage
export const saveSupabaseConfig = (url: string, anonKey: string) => {
  localStorage.setItem('signroad-supabase-config', JSON.stringify({ url, anonKey }));
  resetSupabaseInstance();
};

// Get current Supabase config
export const getSupabaseConfigValues = () => {
  return getSupabaseConfig() || { url: '', anonKey: '' };
};

// Clear Supabase config
export const clearSupabaseConfig = () => {
  localStorage.removeItem('signroad-supabase-config');
  resetSupabaseInstance();
};
