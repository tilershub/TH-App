
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { spacing } from '@/utils/theme';
import { useAuth } from '@/hooks/useAuth';
import { useBookingList } from '@/hooks/queries';
import { bookingApi } from '@/services/api';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { fmtDate } from '@/utils/formatting';

export default function BookingsScreen() {
  const { profile } = useAuth();
  const { data = [], refetch } = useBookingList(profile?.id, 'tiler');

  const change = async (id: string, status: any) => {
    try {
      await bookingApi.updateStatus(id, status);
      refetch();
    } catch (e: any) {
      Alert.alert('Update failed', e.message);
    }
  };

  return (
    <View style={{ padding: spacing(2), gap: spacing(1) }}>
      <Text style={{ fontWeight:'800', fontSize:18, marginBottom: 8 }}>Job Requests</Text>
      {data.map((b: any) => (
        <Card key={b.id}>
          <Text style={{ fontWeight:'700' }}>{b?.services?.name}</Text>
          <Text>Homeowner: {b?.profiles?.full_name || b?.homeowner_id}</Text>
          <Text>Status: {b.status}</Text>
          <Text>Created: {fmtDate(b.created_at)}</Text>
          <View style={{ flexDirection:'row', gap: 8, marginTop: 8 }}>
            <Button title="Accept" onPress={() => change(b.id, 'accepted')} />
            <Button title="Decline" variant="outline" onPress={() => change(b.id, 'declined')} />
            <Button title="Complete" variant="outline" onPress={() => change(b.id, 'completed')} />
          </View>
        </Card>
      ))}
      {!data.length && <Text style={{ opacity:0.7 }}>No jobs yet.</Text>}
    </View>
  );
}
