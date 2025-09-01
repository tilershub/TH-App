import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import Card from './ui/Card';
import { spacing } from '@/utils/theme';
export default function ServiceCard({ name, cover_url, onPress }: { name: string; cover_url?: string|null; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        {cover_url ? <Image source={{ uri: cover_url }} style={{ height: 120, borderRadius: 8, marginBottom: spacing(1) }} /> : null}
        <Text style={{ fontWeight:'700' }}>{name}</Text>
      </Card>
    </Pressable>
  );
}
