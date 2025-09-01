import { useMemo } from 'react';
import { useAuthStore } from '@/stores/authStore';
export const useAuth = () => { const { session, profile, initialized } = useAuthStore(); const role = profile?.role ?? null; return useMemo(() => ({ session, profile, role, initialized }), [session, profile, initialized]); };
