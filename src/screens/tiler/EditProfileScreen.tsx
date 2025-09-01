import React, { useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
import { useAuth } from '@/hooks/useAuth';
import { uploadImageFromUri } from '@/services/storage';
import { authApi, contentApi } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';

export default function EditProfileScreen() {
  const { profile } = useAuth();
  const setProfile = useAuthStore((s) => s.setProfile);
  // Fetch tiler row by profile id
  const { data: tiler } = useQuery({ queryKey: ['tilerByProfile', profile?.id], queryFn: async () => {
    const res = await contentApi.listTilers({}); return (res || []).find((t: any) => t.profile_id === profile?.id);
  }});
  const [name, setName] = useState(tiler?.name || '');
  const [city, setCity] = useState(tiler?.city || '');
  const [bio, setBio] = useState(tiler?.bio || '');
  const [avatar, setAvatar] = useState<string | undefined | null>(profile?.avatar_url);
  const [saving, setSaving] = useState(false);

  const onPickAvatar = async () => {
    const { useImagePicker } = await import('@/hooks/useImagePicker');
    const { choose } = useImagePicker();
    const uri = await choose();
    if (uri) setAvatar(uri);
  };

  const save = async () => {
    try {
      setSaving(true);
      let avatar_url = profile?.avatar_url || null;
      if (avatar && avatar.startsWith('file:')) {
        avatar_url = await uploadImageFromUri(avatar, `avatars/${profile!.id}.jpg`);
        await authApi.upsertProfile({ id: profile!.id, avatar_url });
        setProfile({ ...(profile as any), avatar_url } as any);
      }
      if (tiler) {
        await contentApi.updateTiler(tiler.id, { name, city, bio });
      }
      Alert.alert('Saved', 'Profile updated');
    } catch (e: any) {
      Alert.alert('Save failed', e.message);
    } finally { setSaving(false); }
  };

  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:18 }}>Edit Tiler Profile</Text>
      {avatar ? <Image source={{ uri: avatar }} style={{ width: 96, height: 96, borderRadius: 48, marginTop: spacing(1) }} /> : null}
      <Button title="Change Avatar" variant="outline" style={{ marginTop: spacing(1) }} onPress={onPickAvatar} />
      <Input label="Business Name" value={name} onChangeText={setName} />
      <Input label="City" value={city} onChangeText={setCity} />
      <Input label="Bio" value={bio} onChangeText={setBio} multiline />
      <Button title="Save" onPress={save} loading={saving} />
    </View>
  );
}
