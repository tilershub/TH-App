import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { AuthNavigator } from './AuthNavigator';
import { HomeownerNavigator } from './HomeownerNavigator';
import { TilerNavigator } from './TilerNavigator';
import { AdminNavigator } from './AdminNavigator';

const Root = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { profile, initialized } = useAuth();
  if (!initialized) return null;
  let screen: keyof RootStackParamList = 'Auth';
  if (profile?.role === 'homeowner') screen = 'Homeowner';
  if (profile?.role === 'tiler') screen = 'Tiler';
  if (profile?.role === 'admin') screen = 'Admin';
  return (
    <Root.Navigator screenOptions={{ headerShown: false }} initialRouteName={screen}>
      <Root.Screen name="Auth" component={AuthNavigator} />
      <Root.Screen name="Homeowner" component={HomeownerNavigator} />
      <Root.Screen name="Tiler" component={TilerNavigator} />
      <Root.Screen name="Admin" component={AdminNavigator} />
    </Root.Navigator>
  );
};
