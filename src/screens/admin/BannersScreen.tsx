
import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { spacing } from '@/utils/theme';
import { useBanners } from '@/hooks/queries';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { adminApi } from '@/services/api';

export default function BannersScreen() {
  const { data = [], refetch } = useBanners();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');
  const [priority, setPriority] = useState('0');

  const save = async () => {
    try {
      await adminApi.upsertBanner({ title, image_url: image, cta_label: ctaLabel, cta_url: ctaUrl, priority: Number(priority) });
      setTitle(''); setImage(''); setCtaLabel(''); setCtaUrl(''); setPriority('0');
      refetch();
    } catch (e: any) { Alert.alert('Save failed', e.message); }
  };
  const remove = async (id: string) => {
    try { await adminApi.deleteBanner(id); refetch(); } catch (e: any) { Alert.alert('Delete failed', e.message); }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ padding: spacing(2) }}>
          <Text style={{ fontWeight:'800', fontSize:18 }}>Add / Edit Banner</Text>
          <Input label="Title" value={title} onChangeText={setTitle} />
          <Input label="Image URL" value={image} onChangeText={setImage} />
          <Input label="CTA Label" value={ctaLabel} onChangeText={setCtaLabel} />
          <Input label="CTA URL" value={ctaUrl} onChangeText={setCtaUrl} />
          <Input label="Priority" keyboardType="number-pad" value={priority} onChangeText={setPriority} />
          <Button title="Save Banner" onPress={save} />
          <Text style={{ fontWeight:'800', fontSize:18, marginTop: spacing(2) }}>Existing</Text>
        </View>
      }
      data={data}
      keyExtractor={(b: any) => b.id}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: spacing(2), marginBottom: spacing(1) }}>
          <Card>
            <Text style={{ fontWeight:'700' }}>{item.title || '(no title)'}</Text>
            <Text style={{ opacity:0.7 }}>{item.image_url}</Text>
            <View style={{ flexDirection:'row', gap: 8, marginTop: 8 }}>
              <Button title="Delete" variant="outline" onPress={() => remove(item.id)} />
            </View>
          </Card>
        </View>
      )}
    />
  );
}
