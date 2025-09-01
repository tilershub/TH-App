import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '@/utils/theme';
export default function ProfileScreen() {
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800' }}>Tiler Profile</Text>
      <Text style={{ opacity:0.7 }}>Edit cover, bio, city (to implement)</Text>
    </View>
  );
}
