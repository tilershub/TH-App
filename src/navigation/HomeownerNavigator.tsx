import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeownerStackParamList } from '@/types';
import HomeScreen from '@/screens/homeowner/HomeScreen';
import ServicesScreen from '@/screens/homeowner/ServicesScreen';
import ServiceDetailScreen from '@/screens/homeowner/ServiceDetailScreen';
import TilerProfileScreen from '@/screens/homeowner/TilerProfileScreen';
import CreateBookingScreen from '@/screens/homeowner/CreateBookingScreen';
import BookingsScreen from '@/screens/homeowner/BookingsScreen';
import BookingDetailScreen from '@/screens/homeowner/BookingDetailScreen';
import CreateReviewScreen from '@/screens/homeowner/CreateReviewScreen';
import EstimatorScreen from '@/screens/homeowner/EstimatorScreen';
import ProfileScreen from '@/screens/homeowner/ProfileScreen';
import CheckoutScreen from '@/screens/homeowner/CheckoutScreen';

const Stack = createNativeStackNavigator<HomeownerStackParamList>();
export const HomeownerNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TILERSHUB' }} />
    <Stack.Screen name="Services" component={ServicesScreen} options={{ title: 'Services' }} />
    <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: 'Service' }} />
    <Stack.Screen name="TilerProfile" component={TilerProfileScreen} options={{ title: 'Tiler' }} />
    <Stack.Screen name="CreateBooking" component={CreateBookingScreen} options={{ title: 'Book' }} />
    <Stack.Screen name="Bookings" component={BookingsScreen} options={{ title: 'My Bookings' }} />
    <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: 'Booking' }} />
    <Stack.Screen name="CreateReview" component={CreateReviewScreen} options={{ title: 'Review' }} />
    <Stack.Screen name="Estimator" component={EstimatorScreen} options={{ title: 'Estimator' }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
  </Stack.Navigator>
);
