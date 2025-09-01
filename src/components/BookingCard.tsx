import React from 'react';
import { Text } from 'react-native';
import Card from './ui/Card';
import { fmtDate } from '@/utils/formatting';
export default function BookingCard({ booking }: { booking: any }) {
  return (
    <Card>
      <Text style={{ fontWeight:'700' }}>{booking?.services?.name}</Text>
      <Text>Tiler: {booking?.tilers?.name}</Text>
      <Text>Status: {booking?.status}</Text>
      <Text>Requested: {fmtDate(booking?.created_at)}</Text>
    </Card>
  );
}
