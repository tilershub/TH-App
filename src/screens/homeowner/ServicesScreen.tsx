import React from 'react';
import { FlatList, View } from 'react-native';
import { useServices } from '@/hooks/queries';
import ServiceCard from '@/components/ServiceCard';
import { spacing } from '@/utils/theme';
export default function ServicesScreen({ navigation }: any) {
  const { data = [] } = useServices();
  return (
    <FlatList data={data} numColumns={2}
      columnWrapperStyle={{ gap: spacing(2), paddingHorizontal: spacing(2) }}
      contentContainerStyle={{ gap: spacing(2), paddingVertical: spacing(2) }}
      keyExtractor={(s) => s.id}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <ServiceCard name={item.name} cover_url={item.cover_url ?? undefined}
            onPress={() => navigation.navigate('ServiceDetail', { slug: item.slug, id: item.id })} />
        </View>
      )}
    />
  );
}
