import React, { createContext, useContext, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

type Ctx = { token: string | null };
const NotificationCtx = createContext<Ctx>({ token: null });

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const tokenRef = useRef<string | null>(null);
  useEffect(() => {
    (async () => {
      if (!Device.isDevice) return;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus != 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus != 'granted') return;
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      tokenRef.current = token;
      // TODO: send token to backend
    })();
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', { name: 'default', importance: Notifications.AndroidImportance.MAX });
    }
  }, []);
  return <NotificationCtx.Provider value={{ token: tokenRef.current }}>{children}</NotificationCtx.Provider>;
};
export const useNotifications = () => useContext(NotificationCtx);
