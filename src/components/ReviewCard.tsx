import React from 'react';
import { Text } from 'react-native';
import Card from './ui/Card';
import RatingStars from './ui/RatingStars';
export default function ReviewCard({ review }: { review: any }) {
  const avg = (review.rating_quality + review.rating_service + review.rating_timeliness + review.rating_pricing + review.rating_cleanliness)/5;
  return (
    <Card>
      <RatingStars value={avg} />
      {review.comment ? <Text style={{ marginTop: 6 }}>{review.comment}</Text> : null}
    </Card>
  );
}
