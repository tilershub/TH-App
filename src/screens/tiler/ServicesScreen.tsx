import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '@/utils/theme';
export default function ServicesScreen() {
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800' }}>My Services</Text>
      <Text style={{ opacity:0.7 }}>Set rates per service (to implement)</Text>
    </View>
  );
}
