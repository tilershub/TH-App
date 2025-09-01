import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '@/utils/theme';
export default function OverviewScreen() {
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:18 }}>Admin Overview</Text>
      <Text style={{ marginTop: 6, opacity: 0.7 }}>Metrics and moderation tools coming next.</Text>
    </View>
  );
}
