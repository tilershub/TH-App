import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { spacing } from '@/utils/theme';
export default function EmptyState({ title, subtitle, actionLabel, onAction }:
  { title: string; subtitle?: string; actionLabel?: string; onAction?: () => void }) {
  return <View style={{ alignItems:'center', padding: spacing(3) }}>
    <Text style={{ fontWeight:'700', marginBottom:6 }}>{title}</Text>
    {!!subtitle && <Text style={{ opacity:0.7, textAlign:'center', marginBottom: spacing(2) }}>{subtitle}</Text>}
    {!!actionLabel && <Button title={actionLabel} onPress={onAction} />}
  </View>;
}
