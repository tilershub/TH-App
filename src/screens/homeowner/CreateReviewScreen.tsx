import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { spacing } from '@/utils/theme';
export default function CreateReviewScreen() {
  const [comment, setComment] = useState('');
  return (
    <View style={{ padding: spacing(2) }}>
      <Input label="Comment" value={comment} onChangeText={setComment} />
      <Button title="Submit Review" onPress={()=>{}} />
    </View>
  );
}
