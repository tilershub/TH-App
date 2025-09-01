
import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { spacing } from '@/utils/theme';
import { adminApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ReviewsQueueScreen() {
  const { data = [], refetch } = useQuery({ queryKey: ['pendingReviews'], queryFn: adminApi.listPendingReviews });

  const setApproval = async (id: string, approved: boolean) => {
    try { await adminApi.setReviewApproval(id, approved); refetch(); } catch (e: any) { Alert.alert('Error', e.message); }
  };

  return (
    <FlatList
      ListHeaderComponent={<View style={{ padding: spacing(2) }}><Text style={{ fontWeight:'800', fontSize:18 }}>Pending Reviews</Text></View>}
      data={data}
      keyExtractor={(r: any) => r.id}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: spacing(2), marginBottom: spacing(1) }}>
          <Card>
            <Text style={{ fontWeight:'700' }}>{item?.bookings?.services?.name || 'Review'}</Text>
            <Text>Reviewer: {item?.profiles?.full_name || item.reviewer_id}</Text>
            <Text>Comment: {item?.comment || '-'}</Text>
            <View style={{ flexDirection:'row', gap: 8, marginTop: 8 }}>
              <Button title="Approve" onPress={() => setApproval(item.id, true)} />
              <Button title="Reject" variant="outline" onPress={() => setApproval(item.id, false)} />
            </View>
          </Card>
        </View>
      )}
      ListEmptyComponent={<View style={{ padding: spacing(2) }}><Text>No pending reviews.</Text></View>}
    />
  );
}
