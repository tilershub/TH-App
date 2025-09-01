import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
import { useCreateBooking } from '@/hooks/queries';
import { useAuth } from '@/hooks/useAuth';
export default function CreateBookingScreen({ route, navigation }: any) {
  const { tilerId, serviceId } = route.params;
  const { profile } = useAuth();
  const [address, setAddress] = useState(''); const [datePref, setDatePref] = useState(''); const [notes, setNotes] = useState('');
  const { mutateAsync, isPending } = useCreateBooking();
  const submit = async () => {
    try {
      await mutateAsync({ homeowner_id: profile!.id, tiler_id: tilerId, service_id: serviceId, address, date_preference: datePref, notes, status: 'pending' } as any);
      Alert.alert('Request sent', 'The tiler will review your request.'); navigation.goBack();
    } catch (e: any) { Alert.alert('Error', e.message); }
  };
  return (
    <View style={{ padding: spacing(2) }}>
      <Input label="Address" value={address} onChangeText={setAddress} />
      <Input label="Preferred Date" placeholder="YYYY-MM-DD" value={datePref} onChangeText={setDatePref} />
      <Input label="Notes" value={notes} onChangeText={setNotes} multiline numberOfLines={3} />
      <Button title="Send Booking Request" onPress={submit} loading={isPending} />
    </View>
  );
}
