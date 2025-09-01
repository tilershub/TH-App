import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { supabase } from '@/services/supabase';
import { authApi } from '@/services/api';
import { spacing } from '@/utils/theme';

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'homeowner' | 'tiler' | null>(null);
  const [loading, setLoading] = useState(false);
  const onCreate = async () => {
    if (!role) return Alert.alert('Select role', 'Please choose Homeowner or Tiler');
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const user = data.user; if (!user) throw new Error('No user created');
      await authApi.upsertProfile({ id: user.id, role, full_name: fullName });
      Alert.alert('Account created', 'You can now log in'); navigation.navigate('Login');
    } catch (e: any) { Alert.alert('Signup failed', e.message); } finally { setLoading(false); }
  };
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:22, marginBottom: spacing(2) }}>Create account</Text>
      <Input label="Full name" value={fullName} onChangeText={setFullName} />
      <Input label="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Input label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <View style={{ flexDirection:'row', marginVertical: spacing(1) }}>
        <Button title="Homeowner" variant={role==='homeowner'?'primary':'outline'} onPress={()=>setRole('homeowner')} />
        <View style={{ width: 8 }} />
        <Button title="Tiler" variant={role==='tiler'?'primary':'outline'} onPress={()=>setRole('tiler')} />
      </View>
      <Button title="Create Account" onPress={onCreate} loading={loading} />
    </View>
  );
}
