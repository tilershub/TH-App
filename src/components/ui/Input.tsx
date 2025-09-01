import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, radii, spacing } from '@/utils/theme';
type Props = TextInputProps & { label?: string; error?: string };
export default function Input({ label, error, ...rest }: Props) {
  return (
    <View style={{ marginBottom: spacing(1.5) }}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, error && { borderColor: colors.danger }]} placeholderTextColor={colors.muted} {...rest} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({ label:{ marginBottom:6, color: colors.text, fontWeight:'600' },
  input:{ borderWidth:1, borderColor: colors.border, borderRadius: radii.md, padding: spacing(1.5) }, error:{ color: colors.danger, marginTop:4, fontSize:12 } });
