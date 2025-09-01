import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

type AuthState = {
  initialized: boolean;
  session: Session | null;
  profile: Profile | null;
  setInitialized: (v: boolean) => void;
  setSession: (s: Session | null) => void;
  setProfile: (p: Profile | null) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  initialized: false,
  session: null,
  profile: null,
  setInitialized: (v) => set({ initialized: v }),
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  signOut: () => set({ session: null, profile: null }),
}));
