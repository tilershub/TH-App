import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { colors, radii } from '@/utils/theme';
export default function Badge({ label, style }: { label: string; style?: ViewStyle }) {
  return <View style={[{ paddingVertical:4, paddingHorizontal:8, borderRadius: radii.sm, backgroundColor: colors.primary + '20' }, style]}>
    <Text style={{ color: colors.primary, fontWeight:'600' }}>{label}</Text></View>;
}
