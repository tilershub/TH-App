import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '@/utils/theme';
export default function HomeScreen() {
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:20 }}>Welcome, Tiler</Text>
      <Text style={{ marginTop: 6, opacity: 0.7 }}>Coming soon: job requests, earnings, spotlight tools.</Text>
    </View>
  );
}
