import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/services/supabase';

const BUCKET = 'images';

export async function uploadImageFromUri(uri: string, path: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  const contentType = 'image/jpeg';
  const { data, error } = await supabase.storage.from(BUCKET).upload(path, Buffer.from(base64, 'base64'), {
    contentType, upsert: true,
  } as any);
  if (error) throw error;
  const { data: pub } = await supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return pub.publicUrl;
}

export async function pickImage(): Promise<ImagePicker.ImagePickerAsset | null> {
  const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
  if (res.canceled) return null;
  return res.assets[0];
}
