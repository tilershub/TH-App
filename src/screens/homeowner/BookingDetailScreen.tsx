import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '@/utils/theme';
import Button from '@/components/ui/Button';

export default function BookingDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  // In a real app, fetch booking by id and compute amount due
  const suggestedAmount = 25000; // placeholder
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800' }}>Booking Detail</Text>
      <Text style={{ opacity:0.7, marginBottom: spacing(2) }}>Details coming soon (timeline, status updates, payments)</Text>
      <Button title="Pay Now" onPress={() => navigation.navigate('Checkout', { bookingId: id, suggestedAmount })} />
    </View>
  );
}
