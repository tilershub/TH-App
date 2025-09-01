import React, { useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { authApi, contentApi } from '@/services/api';
import { useImagePicker } from '@/hooks/useImagePicker';
import { uploadImageFromUri } from '@/services/storage';

export default function ProfileScreen() {
  const { profile } = useAuth();
  const setProfile = useAuthStore((s) => s.setProfile);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [city, setCity] = useState(profile?.city || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [avatar, setAvatar] = useState<string | undefined | null>(profile?.avatar_url);
  const { choose } = useImagePicker();
  const [saving, setSaving] = useState(false);

  const pickAvatar = async () => {
    const uri = await choose();
    if (uri) setAvatar(uri);
  };

  const save = async () => {
    try {
      setSaving(true);
      let avatar_url = profile?.avatar_url || null;
      if (avatar && avatar.startsWith('file:')) {
        avatar_url = await uploadImageFromUri(avatar, `avatars/${profile!.id}.jpg`);
      }
      const updated = await authApi.upsertProfile({ id: profile!.id, full_name: fullName, city, phone, avatar_url });
      setProfile(updated);
      Alert.alert('Saved', 'Profile updated');
    } catch (e: any) {
      Alert.alert('Save failed', e.message);
    } finally { setSaving(false); }
  };

  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:18 }}>My Profile</Text>
      {avatar ? <Image source={{ uri: avatar }} style={{ width: 96, height: 96, borderRadius: 48, marginTop: spacing(1) }} /> : null}
      <Button title="Change Avatar" variant="outline" style={{ marginTop: spacing(1) }} onPress={pickAvatar} />
      <Input label="Full name" value={fullName} onChangeText={setFullName} />
      <Input label="City" value={city} onChangeText={setCity} />
      <Input label="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <Button title="Save" onPress={save} loading={saving} />
    </View>
  );
}
