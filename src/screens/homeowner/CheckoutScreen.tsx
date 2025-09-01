import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
import { paymentsApi } from '@/services/payments';

export default function CheckoutScreen({ route, navigation }: any) {
  const { bookingId, suggestedAmount } = route.params || {};
  const [amount, setAmount] = useState(String(suggestedAmount || '0'));
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);
      await paymentsApi.createPayment({ booking_id: bookingId, amount: parseFloat(amount) || 0, provider: 'mock', status: 'succeeded' });
      Alert.alert('Payment recorded', 'Status: succeeded');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Payment failed', e.message);
    } finally { setLoading(false); }
  };

  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:18 }}>Checkout (Mock)</Text>
      <Input label="Amount (LKR)" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <Button title="Pay Now" onPress={pay} loading={loading} />
      <Text style={{ opacity:0.7, marginTop: 8 }}>Integrate Stripe/PayHere later; this records a payment row under your booking.</Text>
    </View>
  );
}
