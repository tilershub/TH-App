import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useService, useTilersForService } from '@/hooks/queries';
import TilerCard from '@/components/TilerCard';
import { spacing } from '@/utils/theme';
export default function ServiceDetailScreen({ navigation }: any) {
  const { params } = useRoute<any>();
  const { data: service } = useService(params.slug);
  const { data: tilerServices = [] } = useTilersForService(params.id);
  return (
    <FlatList
      ListHeaderComponent={<View style={{ padding: spacing(2) }}>
        <Text style={{ fontWeight:'800', fontSize:20 }}>{service?.name}</Text>
        {service?.description ? <Text style={{ opacity:0.7, marginTop:6 }}>{service.description}</Text> : null}
      </View>}
      data={tilerServices}
      keyExtractor={(ts: any) => ts.id}
      renderItem={({ item }: any) => (
        <View style={{ paddingHorizontal: spacing(2), marginBottom: spacing(1.5) }}>
          <TilerCard tiler={item.tilers} onPress={() => navigation.navigate('TilerProfile', { id: item.tilers.id })} />
        </View>
      )}
    />
  );
}
