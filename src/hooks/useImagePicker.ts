import { pickImage } from '@/services/storage';
export const useImagePicker = () => { const choose = async () => { const asset = await pickImage(); return asset?.uri ?? null; }; return { choose }; };
