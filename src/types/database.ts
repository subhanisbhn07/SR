// Supabase Database Types for SignRoad
// This file defines the database schema that should be created in Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          mode: 'consumer' | 'enterprise';
          streak_days: number;
          total_sessions: number;
          lantern_health: number;
          sparks: number;
          current_road_step: number;
          selected_road: string | null;
          tribe_id: string | null;
          subscription_status: 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
          trial_ends_at: string | null;
          last_meditation_at: string | null;
          timezone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          mode?: 'consumer' | 'enterprise';
          streak_days?: number;
          total_sessions?: number;
          lantern_health?: number;
          sparks?: number;
          current_road_step?: number;
          selected_road?: string | null;
          tribe_id?: string | null;
          subscription_status?: 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
          trial_ends_at?: string | null;
          last_meditation_at?: string | null;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          mode?: 'consumer' | 'enterprise';
          streak_days?: number;
          total_sessions?: number;
          lantern_health?: number;
          sparks?: number;
          current_road_step?: number;
          selected_road?: string | null;
          tribe_id?: string | null;
          subscription_status?: 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
          trial_ends_at?: string | null;
          last_meditation_at?: string | null;
          timezone?: string | null;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          notifications_enabled: boolean;
          reminder_time: string | null;
          focus_areas: string[];
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          preferred_background_sound: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          notifications_enabled?: boolean;
          reminder_time?: string | null;
          focus_areas?: string[];
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          preferred_background_sound?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          notifications_enabled?: boolean;
          reminder_time?: string | null;
          focus_areas?: string[];
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          preferred_background_sound?: string | null;
          updated_at?: string;
        };
      };
      signs: {
        Row: {
          id: string;
          name: string;
          emoji: string;
          category: string;
          rarity: 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';
          unlock_day: number;
          description: string | null;
          meaning: string | null;
          tips_for_finding: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          emoji: string;
          category?: string;
          rarity?: 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';
          unlock_day?: number;
          description?: string | null;
          meaning?: string | null;
          tips_for_finding?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          emoji?: string;
          category?: string;
          rarity?: 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';
          unlock_day?: number;
          description?: string | null;
          meaning?: string | null;
          tips_for_finding?: string | null;
          is_active?: boolean;
        };
      };
      user_sign_logs: {
        Row: {
          id: string;
          user_id: string;
          sign_id: string;
          found_at: string;
          location_note: string | null;
          receipt_generated: boolean;
          receipt_url: string | null;
          sparks_earned: number;
          probability_data: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          sign_id: string;
          found_at?: string;
          location_note?: string | null;
          receipt_generated?: boolean;
          receipt_url?: string | null;
          sparks_earned?: number;
          probability_data?: Json | null;
          created_at?: string;
        };
        Update: {
          location_note?: string | null;
          receipt_generated?: boolean;
          receipt_url?: string | null;
          sparks_earned?: number;
          probability_data?: Json | null;
        };
      };
      user_active_signs: {
        Row: {
          id: string;
          user_id: string;
          sign_id: string;
          assigned_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          sign_id: string;
          assigned_at?: string;
          expires_at?: string | null;
        };
        Update: {
          expires_at?: string | null;
        };
      };
      meditation_sessions: {
        Row: {
          id: string;
          user_id: string;
          road_step: number;
          audio_url: string | null;
          duration_seconds: number;
          completed_at: string | null;
          completion_percentage: number;
          sparks_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          road_step: number;
          audio_url?: string | null;
          duration_seconds?: number;
          completed_at?: string | null;
          completion_percentage?: number;
          sparks_earned?: number;
          created_at?: string;
        };
        Update: {
          completed_at?: string | null;
          completion_percentage?: number;
          sparks_earned?: number;
        };
      };
      sparks_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          source: 'meditation' | 'sign_found' | 'tribe_bonus' | 'milestone' | 'purchase' | 'admin';
          source_id: string | null;
          balance_after: number;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          source: 'meditation' | 'sign_found' | 'tribe_bonus' | 'milestone' | 'purchase' | 'admin';
          source_id?: string | null;
          balance_after: number;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          description?: string | null;
        };
      };
      tribes: {
        Row: {
          id: string;
          name: string;
          cohort_start_date: string;
          timezone: string;
          member_count: number;
          max_members: number;
          tribe_lantern_health: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          cohort_start_date: string;
          timezone: string;
          member_count?: number;
          max_members?: number;
          tribe_lantern_health?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          member_count?: number;
          tribe_lantern_health?: number;
          updated_at?: string;
        };
      };
      manifestations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          category: string;
          description: string | null;
          is_manifested: boolean;
          manifested_at: string | null;
          days_to_manifest: number | null;
          signs_logged: number;
          sessions_completed: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          category?: string;
          description?: string | null;
          is_manifested?: boolean;
          manifested_at?: string | null;
          days_to_manifest?: number | null;
          signs_logged?: number;
          sessions_completed?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          category?: string;
          description?: string | null;
          is_manifested?: boolean;
          manifested_at?: string | null;
          days_to_manifest?: number | null;
          signs_logged?: number;
          sessions_completed?: number;
          is_public?: boolean;
          updated_at?: string;
        };
      };
      road_steps: {
        Row: {
          id: string;
          road_id: string;
          step_number: number;
          title: string;
          description: string | null;
          audio_url: string | null;
          duration_seconds: number;
          is_free: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          road_id: string;
          step_number: number;
          title: string;
          description?: string | null;
          audio_url?: string | null;
          duration_seconds?: number;
          is_free?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          audio_url?: string | null;
          duration_seconds?: number;
          is_free?: boolean;
        };
      };
      roads: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          gradient_from: string | null;
          gradient_to: string | null;
          total_steps: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          gradient_from?: string | null;
          gradient_to?: string | null;
          total_steps?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          gradient_from?: string | null;
          gradient_to?: string | null;
          total_steps?: number;
          is_active?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      subscription_status: 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
      sign_rarity: 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';
      sparks_source: 'meditation' | 'sign_found' | 'tribe_bonus' | 'milestone' | 'purchase' | 'admin';
      difficulty_level: 'beginner' | 'intermediate' | 'advanced';
      user_mode: 'consumer' | 'enterprise';
    };
  };
}

// Helper types for easier use
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type Sign = Database['public']['Tables']['signs']['Row'];
export type UserSignLog = Database['public']['Tables']['user_sign_logs']['Row'];
export type UserActiveSign = Database['public']['Tables']['user_active_signs']['Row'];

export type MeditationSession = Database['public']['Tables']['meditation_sessions']['Row'];
export type SparksTransaction = Database['public']['Tables']['sparks_transactions']['Row'];

export type Tribe = Database['public']['Tables']['tribes']['Row'];
export type Manifestation = Database['public']['Tables']['manifestations']['Row'];

export type Road = Database['public']['Tables']['roads']['Row'];
export type RoadStep = Database['public']['Tables']['road_steps']['Row'];
