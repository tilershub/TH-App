import React from 'react';
import { View, Text, FlatList } from 'react-native';
import BannerCarousel from '@/components/BannerCarousel';
import ServiceCard from '@/components/ServiceCard';
import TilerCard from '@/components/TilerCard';
import { useServices, useTilers } from '@/hooks/queries';
import { spacing } from '@/utils/theme';

export default function HomeScreen({ navigation }: any) {
  const { data: services = [] } = useServices();
  const { data: tilers = [] } = useTilers({ spotlight: 'Bathroom Tiling' });

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <BannerCarousel />
          <Text style={{ fontWeight:'800', fontSize:18, margin: spacing(2) }}>Services</Text>
          <FlatList
            data={services} horizontal keyExtractor={(s) => s.id} showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing(2) }}
            renderItem={({ item }) => (
              <View style={{ width: 200, marginRight: spacing(2) }}>
                <ServiceCard name={item.name} cover_url={item.cover_url ?? undefined}
                  onPress={() => navigation.navigate('ServiceDetail', { slug: item.slug, id: item.id })} />
              </View>
            )}
          />
          <Text style={{ fontWeight:'800', fontSize:18, margin: spacing(2) }}>Top Tilers</Text>
        </View>
      }
      data={tilers}
      keyExtractor={(t: any) => t.id}
      contentContainerStyle={{ padding: spacing(2), paddingTop: 0 }}
      renderItem={({ item }) => (
        <View style={{ marginBottom: spacing(1.5) }}>
          <TilerCard tiler={item} onPress={() => navigation.navigate('TilerProfile', { id: item.id })} />
        </View>
      )}
    />
  );
}
