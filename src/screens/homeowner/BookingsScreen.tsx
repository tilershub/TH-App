import React from 'react';
import { FlatList, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useBookingList } from '@/hooks/queries';
import BookingCard from '@/components/BookingCard';
import { spacing } from '@/utils/theme';
export default function BookingsScreen({ navigation }: any) {
  const { profile } = useAuth();
  const { data = [] } = useBookingList(profile?.id, 'homeowner');
  return (
    <FlatList data={data} keyExtractor={(b: any) => b.id}
      contentContainerStyle={{ padding: spacing(2), gap: spacing(1.25) }}
      renderItem={({ item }: any) => (
        <View>
          <BookingCard booking={item} />
        </View>
      )}
    />
  );
}
