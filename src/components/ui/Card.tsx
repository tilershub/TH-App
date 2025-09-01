import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors, radii, spacing, shadow } from '@/utils/theme';
export default function Card({ style, children }: React.PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}
const styles = StyleSheet.create({ card:{ backgroundColor:'#fff', borderRadius: radii.md, borderWidth:1, borderColor: colors.border, padding: spacing(2), ...shadow.card } });
