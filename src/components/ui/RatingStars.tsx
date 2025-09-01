import React from 'react';
import { View, Text } from 'react-native';
export default function RatingStars({ value = 0, count }: { value?: number; count?: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.round(value) ? '★' : '☆')).join(' ');
  return <View style={{ flexDirection:'row' }}><Text>{stars} {count ? `(${count})` : ''}</Text></View>;
}
