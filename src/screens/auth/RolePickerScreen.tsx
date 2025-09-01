import React from 'react';
import { View, Text } from 'react-native';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
export default function RolePickerScreen({ navigation }: any) {
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:22, marginBottom: spacing(2) }}>Choose your role</Text>
      <Button title="I’m a Homeowner" onPress={() => navigation.replace('Signup', { role: 'homeowner' })} />
      <View style={{ height: spacing(1) }} />
      <Button title="I’m a Tiler" onPress={() => navigation.replace('Signup', { role: 'tiler' })} />
    </View>
  );
}
