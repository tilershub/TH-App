import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/stores/authStore';
import { authApi } from '@/services/api';
import { spacing } from '@/utils/theme';

export default function LoginScreen({ navigation }: any) {
  const setProfile = useAuthStore((s) => s.setProfile);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session?.user) {
        const profile = await authApi.getProfile(data.session.user.id);
        setProfile(profile);
      }
    } catch (e: any) { Alert.alert('Login failed', e.message); } finally { setLoading(false); }
  };
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:22, marginBottom: spacing(2) }}>Welcome back</Text>
      <Input label="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Input label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={onLogin} loading={loading} />
      <Button title="Create account" variant="outline" style={{ marginTop: spacing(1) }} onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}
