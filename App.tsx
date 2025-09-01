import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { AppNavigator } from '@/navigation/AppNavigator';
import { NotificationProvider } from '@/services/notifications';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/services/supabase';
import { authApi } from '@/services/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, retry: 2, refetchOnWindowFocus: false },
    mutations: { retry: 1 },
  },
});

export default function App() {
  const { setSession, setProfile, setInitialized } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) authApi.getProfile(session.user.id).then(setProfile).catch(console.error);
      setInitialized(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        try { const profile = await authApi.getProfile(session.user.id); setProfile(profile); }
        catch (e) { console.error('Profile fetch error', e); }
      } else setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, [setSession, setProfile, setInitialized]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <StatusBar style="auto" />
          </NotificationProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1 } });
