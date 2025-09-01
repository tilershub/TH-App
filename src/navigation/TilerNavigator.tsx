import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/tiler/HomeScreen';
import BookingsScreen from '@/screens/tiler/BookingsScreen';
import ServicesScreen from '@/screens/tiler/ServicesScreen';
import ProfileScreen from '@/screens/tiler/ProfileScreen';
import EditRatesScreen from '@/screens/tiler/EditRatesScreen';
import EditProfileScreen from '@/screens/tiler/EditProfileScreen';
const Stack = createNativeStackNavigator();
export const TilerNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tiler Dashboard' }} />
    <Stack.Screen name="Bookings" component={BookingsScreen} options={{ title: 'Jobs' }} />
    <Stack.Screen name="Services" component={ServicesScreen} options={{ title: 'Services' }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    <Stack.Screen name="EditRates" component={EditRatesScreen} options={{ title: 'Rates' }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
  </Stack.Navigator>
);
