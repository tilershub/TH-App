import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Card from './ui/Card';
import Avatar from './ui/Avatar';
import RatingStars from './ui/RatingStars';
import { spacing } from '@/utils/theme';
export default function TilerCard({ tiler, onPress }: { tiler: any; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <Avatar uri={tiler?.profiles?.avatar_url} name={tiler?.name} />
          <View style={{ marginLeft: spacing(1.5), flex:1 }}>
            <Text style={{ fontWeight:'700' }}>{tiler?.name}</Text>
            <Text style={{ opacity:0.7 }}>{tiler?.city ?? ''}</Text>
            <RatingStars value={tiler?.rating_avg ?? 0} count={tiler?.rating_count ?? 0} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
