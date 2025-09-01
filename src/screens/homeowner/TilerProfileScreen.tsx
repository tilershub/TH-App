import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { contentApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
import RatingStars from '@/components/ui/RatingStars';
export default function TilerProfileScreen({ navigation }: any) {
  const { params } = useRoute<any>();
  const { data } = useQuery({ queryKey: ['tiler', params.id], queryFn: () => contentApi.getTiler(params.id) });
  return (
    <View style={{ padding: spacing(2) }}>
      <Text style={{ fontWeight:'800', fontSize:20 }}>{data?.name}</Text>
      {data?.profiles?.city ? <Text style={{ opacity:0.7, marginTop:4 }}>{data?.profiles?.city}</Text> : null}
      <RatingStars value={data?.rating_avg ?? 0} count={data?.rating_count ?? 0} />
      {data?.bio ? <Text style={{ marginTop: spacing(1.5) }}>{data.bio}</Text> : null}
      <Button title="Book this Tiler" style={{ marginTop: spacing(2) }}
        onPress={() => navigation.navigate('CreateBooking', { tilerId: data.id, serviceId: data?.tiler_services?.[0]?.service_id })} />
    </View>
  );
}
