import React, { useMemo } from 'react';
import { FlatList, Image, Pressable, Dimensions } from 'react-native';
import { useBanners } from '@/hooks/queries';
import { spacing, radii } from '@/utils/theme';
import * as Linking from 'expo-linking';
const { width } = Dimensions.get('window');
export default function BannerCarousel() {
  const { data = [] } = useBanners();
  const itemW = useMemo(() => width - spacing(4), []);
  if (!data.length) return null;
  return (
    <FlatList data={data} horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing(2) }} keyExtractor={(b) => b.id}
      snapToInterval={itemW + spacing(2)} decelerationRate="fast"
      renderItem={({ item }) => (
        <Pressable onPress={() => item.cta_url && Linking.openURL(item.cta_url!)}>
          <Image source={{ uri: item.image_url ?? '' }} style={{ width: itemW, height: 160, borderRadius: radii.lg, marginRight: spacing(2) }} resizeMode="cover" />
        </Pressable>
      )} />
  );
}
