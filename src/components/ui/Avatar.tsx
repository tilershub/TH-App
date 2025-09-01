import React from 'react';
import { Image, View, Text } from 'react-native';
import { colors } from '@/utils/theme';
export default function Avatar({ uri, name, size=44 }: { uri?: string|null; name?: string|null; size?: number }) {
  if (uri) return <Image source={{ uri }} style={{ width:size, height:size, borderRadius: size/2 }} />;
  const initials = (name ?? '?').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  return <View style={{ width:size, height:size, borderRadius:size/2, backgroundColor: colors.border, alignItems:'center', justifyContent:'center' }}>
    <Text style={{ fontWeight:'700' }}>{initials}</Text></View>;
}
