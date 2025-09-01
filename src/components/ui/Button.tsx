import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/utils/theme';
type Props = { title: string; onPress?: () => void; loading?: boolean; disabled?: boolean; variant?: 'primary'|'outline'; style?: ViewStyle; };
export default function Button({ title, onPress, loading, disabled, variant='primary', style }: Props) {
  const isOutline = variant==='outline';
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled||loading}
      style={[styles.btn, isOutline?styles.outline:styles.primary, disabled?{opacity:0.6}:null, style]}>
      {loading ? <ActivityIndicator/> : <Text style={[styles.txt, isOutline && { color: colors.primary }]}>{title}</Text>}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({ btn:{ paddingVertical: spacing(1.5), paddingHorizontal: spacing(2), borderRadius: radii.md, alignItems:'center' },
  primary:{ backgroundColor: colors.primary }, outline:{ backgroundColor:'transparent', borderWidth:1, borderColor: colors.primary }, txt:{ color:'#fff', fontWeight:'600' } });
