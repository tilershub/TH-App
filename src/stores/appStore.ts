import { create } from 'zustand';
type Banner = { id: string; title: string | null; image_url: string | null; cta_label: string | null; cta_url: string | null; priority: number | null; };
type AppState = { banners: Banner[]; setBanners: (b: Banner[]) => void; };
export const useAppStore = create<AppState>((set) => ({ banners: [], setBanners: (banners) => set({ banners }) }));
