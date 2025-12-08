-- SignRoad Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  mode TEXT DEFAULT 'consumer' CHECK (mode IN ('consumer', 'enterprise')),
  streak_days INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  lantern_health INTEGER DEFAULT 100 CHECK (lantern_health >= 0 AND lantern_health <= 100),
  sparks INTEGER DEFAULT 0,
  current_road_step INTEGER DEFAULT 1,
  selected_road TEXT,
  tribe_id UUID,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('free', 'trial', 'active', 'cancelled', 'expired')),
  trial_ends_at TIMESTAMPTZ,
  last_meditation_at TIMESTAMPTZ,
  timezone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT true,
  reminder_time TIME,
  focus_areas TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  preferred_background_sound TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Roads table (meditation journey paths)
CREATE TABLE IF NOT EXISTS public.roads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  gradient_from TEXT,
  gradient_to TEXT,
  total_steps INTEGER DEFAULT 365,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Road steps table (individual meditation sessions)
CREATE TABLE IF NOT EXISTS public.road_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  road_id UUID NOT NULL REFERENCES public.roads(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  duration_seconds INTEGER DEFAULT 300,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(road_id, step_number)
);

-- Signs master table
CREATE TABLE IF NOT EXISTS public.signs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  rarity TEXT DEFAULT 'whispered' CHECK (rarity IN ('whispered', 'spoken', 'shouted', 'thundered', 'cosmos_aligned')),
  unlock_day INTEGER DEFAULT 1,
  description TEXT,
  meaning TEXT,
  tips_for_finding TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User active signs (currently assigned signs)
CREATE TABLE IF NOT EXISTS public.user_active_signs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sign_id UUID NOT NULL REFERENCES public.signs(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id, sign_id)
);

-- User sign logs (found signs history)
CREATE TABLE IF NOT EXISTS public.user_sign_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sign_id UUID NOT NULL REFERENCES public.signs(id) ON DELETE CASCADE,
  found_at TIMESTAMPTZ DEFAULT NOW(),
  location_note TEXT,
  receipt_generated BOOLEAN DEFAULT false,
  receipt_url TEXT,
  sparks_earned INTEGER DEFAULT 5,
  probability_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meditation sessions table
CREATE TABLE IF NOT EXISTS public.meditation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  road_step INTEGER NOT NULL,
  audio_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  sparks_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sparks transactions table
CREATE TABLE IF NOT EXISTS public.sparks_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('meditation', 'sign_found', 'tribe_bonus', 'milestone', 'purchase', 'admin')),
  source_id TEXT,
  balance_after INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tribes table
CREATE TABLE IF NOT EXISTS public.tribes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cohort_start_date DATE NOT NULL,
  timezone TEXT NOT NULL,
  member_count INTEGER DEFAULT 0 CHECK (member_count >= 0 AND member_count <= 8),
  max_members INTEGER DEFAULT 8,
  tribe_lantern_health INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for tribe_id in users
ALTER TABLE public.users 
ADD CONSTRAINT fk_users_tribe 
FOREIGN KEY (tribe_id) REFERENCES public.tribes(id) ON DELETE SET NULL;

-- Manifestations table
CREATE TABLE IF NOT EXISTS public.manifestations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  description TEXT,
  is_manifested BOOLEAN DEFAULT false,
  manifested_at TIMESTAMPTZ,
  days_to_manifest INTEGER,
  signs_logged INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_tribe_id ON public.users(tribe_id);
CREATE INDEX IF NOT EXISTS idx_user_sign_logs_user_id ON public.user_sign_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sign_logs_sign_id ON public.user_sign_logs(sign_id);
CREATE INDEX IF NOT EXISTS idx_meditation_sessions_user_id ON public.meditation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sparks_transactions_user_id ON public.sparks_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_manifestations_user_id ON public.manifestations(user_id);
CREATE INDEX IF NOT EXISTS idx_road_steps_road_id ON public.road_steps(road_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_active_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sign_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sparks_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifestations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own active signs" ON public.user_active_signs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own active signs" ON public.user_active_signs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sign logs" ON public.user_sign_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sign logs" ON public.user_sign_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own meditation sessions" ON public.meditation_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meditation sessions" ON public.meditation_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own sparks transactions" ON public.sparks_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sparks transactions" ON public.sparks_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own manifestations" ON public.manifestations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own manifestations" ON public.manifestations
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for roads and signs (content tables)
ALTER TABLE public.roads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.road_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view roads" ON public.roads
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view road steps" ON public.road_steps
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view signs" ON public.signs
  FOR SELECT USING (true);

CREATE POLICY "Tribe members can view their tribe" ON public.tribes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.tribe_id = tribes.id)
  );

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, trial_ends_at, timezone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NOW() + INTERVAL '14 days',
    COALESCE(NEW.raw_user_meta_data->>'timezone', 'UTC')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default roads
INSERT INTO public.roads (name, slug, description, icon, gradient_from, gradient_to, total_steps, is_active) VALUES
  ('Sleep & Rest', 'sleep', 'Restore your natural sleep rhythm and wake up refreshed', 'moon', '#1e3a5f', '#0f172a', 365, true),
  ('Burnout Recovery', 'burnout', 'Rebuild your energy and find sustainable balance', 'battery-charging', '#7c3aed', '#4c1d95', 365, true),
  ('Manifestation', 'manifest', 'Align your intentions with the universe', 'sparkles', '#059669', '#064e3b', 365, true),
  ('Healing Journey', 'healing', 'Process emotions and find inner peace', 'heart', '#dc2626', '#7f1d1d', 365, true),
  ('Spiritual Growth', 'spiritual', 'Deepen your connection to something greater', 'sun', '#d97706', '#78350f', 365, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert initial signs (first 20 of 100)
INSERT INTO public.signs (name, emoji, category, rarity, unlock_day, description, meaning, tips_for_finding) VALUES
  ('White Feather', '🪶', 'nature', 'whispered', 1, 'A white feather appearing in your path', 'Angels are near, protection and guidance', 'Look on sidewalks, parks, or near windows'),
  ('Lucky Coin', '🪙', 'objects', 'whispered', 1, 'Finding a coin heads-up', 'Abundance is flowing to you', 'Check the ground when walking, especially near stores'),
  ('Butterfly', '🦋', 'nature', 'whispered', 1, 'A butterfly crossing your path', 'Transformation and new beginnings', 'Gardens, parks, or sunny areas'),
  ('Rainbow', '🌈', 'sky', 'spoken', 4, 'Seeing a rainbow after rain', 'Promise of good things to come', 'Look to the sky after rain when sun appears'),
  ('Ladybug', '🐞', 'nature', 'whispered', 1, 'A ladybug landing near you', 'Good luck and wishes coming true', 'Gardens, plants, or sunny windowsills'),
  ('Four-Leaf Clover', '🍀', 'nature', 'thundered', 10, 'Finding a four-leaf clover', 'Exceptional luck and rare blessings', 'Clover patches in grass areas'),
  ('Shooting Star', '⭐', 'sky', 'shouted', 7, 'Witnessing a shooting star', 'Your wish is being heard', 'Clear night skies, away from city lights'),
  ('Red Door', '🚪', 'objects', 'spoken', 4, 'Noticing a red door', 'New opportunities opening', 'Walk through neighborhoods mindfully'),
  ('Umbrella', '☂️', 'objects', 'whispered', 1, 'Seeing an umbrella when not raining', 'Protection is available to you', 'Cafes, stores, or on the street'),
  ('Blue Bird', '🐦', 'nature', 'spoken', 4, 'Spotting a blue bird', 'Happiness and joy approaching', 'Parks, gardens, or near trees'),
  ('Sunflower', '🌻', 'nature', 'whispered', 1, 'Seeing a sunflower', 'Positivity and warmth', 'Gardens, flower shops, or fields'),
  ('Heart Shape', '💚', 'patterns', 'spoken', 4, 'Finding a heart shape in nature', 'Love surrounds you', 'Leaves, clouds, puddles, or stones'),
  ('Double Numbers', '🔢', 'numbers', 'whispered', 1, 'Seeing 11:11, 22:22, etc.', 'Alignment with the universe', 'Clocks, receipts, or license plates'),
  ('Dragonfly', '🪰', 'nature', 'spoken', 4, 'A dragonfly appearing', 'Change and self-realization', 'Near water, gardens, or meadows'),
  ('Owl', '🦉', 'nature', 'shouted', 7, 'Seeing or hearing an owl', 'Wisdom and intuition', 'Evening walks, wooded areas'),
  ('Cardinal', '🐦', 'nature', 'spoken', 4, 'Spotting a red cardinal', 'Loved ones watching over you', 'Backyards, parks, or forests'),
  ('Hawk', '🦅', 'nature', 'shouted', 7, 'A hawk circling overhead', 'Vision and perspective', 'Open fields, highways, or hilltops'),
  ('Full Moon', '🌕', 'sky', 'spoken', 4, 'Witnessing a full moon', 'Completion and manifestation', 'Clear night skies'),
  ('Deer', '🦌', 'nature', 'shouted', 7, 'Encountering a deer', 'Gentleness and new adventures', 'Wooded areas, parks, or rural roads'),
  ('Hummingbird', '🐦', 'nature', 'thundered', 10, 'Seeing a hummingbird', 'Joy and lightness of being', 'Gardens with flowers, feeders')
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
