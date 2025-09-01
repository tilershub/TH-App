import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OverviewScreen from '@/screens/admin/OverviewScreen';
import ReviewsQueueScreen from '@/screens/admin/ReviewsQueueScreen';
import BannersScreen from '@/screens/admin/BannersScreen';
const Stack = createNativeStackNavigator();
export const AdminNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Overview" component={OverviewScreen} options={{ title: 'Admin' }} />
    <Stack.Screen name="ReviewsQueue" component={ReviewsQueueScreen} options={{ title: 'Reviews' }} />
    <Stack.Screen name="Banners" component={BannersScreen} options={{ title: 'Banners' }} />
  </Stack.Navigator>
);
