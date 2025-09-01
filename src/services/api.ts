import { supabase } from '@/services/supabase';
import { Database } from '@/types/database';

type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
type Insert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
type Update<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

const from = <T extends keyof Database['public']['Tables']>(table: T) => supabase.from(table as string);

export const authApi = {
  async getProfile(userId: string) {
    const { data, error } = await from('profiles').select('*').eq('id', userId).single<Tables<'profiles'>>();
    if (error) throw error; try { await (await import('./supabase')).supabase.functions.invoke('moderate-review', { body: { reviewId: (data as any).id, text: (payload as any).comment } }); } catch {}
    return data;
  },
  async upsertProfile(payload: Update<'profiles'>) {
    const { data, error } = await from('profiles').upsert(payload).select().single<Tables<'profiles'>>();
    if (error) throw error; return data;
  },
};

export const contentApi = {
  async listBanners() {
    const { data, error } = await from('banners').select('*').order('priority', { ascending: true }) as any;
    if (error) throw error; return data ?? [];
  },
  async listServices() {
    const { data, error } = await from('services').select('*').eq('is_active', true).order('name') as any;
    if (error) throw error; return data ?? [];
  },
  async getServiceBySlug(slug: string) {
    const { data, error } = await from('services').select('*').eq('slug', slug).single();
    if (error) throw error; return data;
  },
  async listTilers(params?: { city?: string; spotlight?: string; query?: string }) {
    let qb: any = from('tilers').select('*, profiles(*)').eq('is_active', true);
    if (params?.city) qb = qb.ilike('city', `%${params.city}%`);
    if (params?.spotlight) qb = qb.ilike('spotlights', `%${params.spotlight}%`);
    if (params?.query) qb = qb.or(`name.ilike.%${params.query}%,bio.ilike.%${params.query}%`);
    const { data, error } = await qb;
    if (error) throw error; return data ?? [];
  },
  async getTiler(id: string) {
    const { data, error } = await from('tilers')
      .select('*, profiles(*), tiler_services(*, services(*))').eq('id', id).single();
    if (error) throw error; return data;
  },
  async listTilersForService(serviceId: string) {
    const { data, error } = await from('tiler_services')
      .select('*, tilers(*, profiles(*)), services(*)')
      .eq('service_id', serviceId).eq('tilers.is_active', true);
    if (error) throw error; return data ?? [];
  },
  async getEstimatorConfig() {
    const { data, error } = await from('estimator_configs').select('*').limit(1).single();
    if (error) throw error; return data;
  },
};

export const bookingApi = {
  async createBooking(payload: Insert<'bookings'>) {
    const { data, error } = await from('bookings').insert(payload).select().single();
    if (error) throw error; return data;
  },
  async listBookingsByUser(userId: string, role: 'homeowner' | 'tiler') {
    const key = role === 'homeowner' ? 'homeowner_id' : 'tiler_id';
    const { data, error } = await from('bookings')
      .select('*, tilers(*), services(*), profiles!bookings_homeowner_id_fkey(*)')
      .eq(key, userId).order('created_at', { ascending: false });
    if (error) throw error; return data ?? [];
  },
  async getBooking(id: string) {
    const { data, error } = await from('bookings')
      .select('*, tilers(*), services(*), profiles!bookings_homeowner_id_fkey(*)')
      .eq('id', id).single();
    if (error) throw error; return data;
  },
  async updateStatus(id: string, status: any) {
    const { data, error } = await from('bookings').update({ status }).eq('id', id).select().single();
    if (error) throw error; return data;
  },
};

export const reviewApi = {
  async createReview(payload: Insert<'reviews'>) {
    const { data, error } = await from('reviews').insert(payload).select().single();
    if (error) throw error; return data;
  },
  async listReviewsForTiler(tilerId: string) {
    const { data, error } = await from('reviews')
      .select('*, profiles(*), bookings(*), services(*)')
      .eq('tiler_id', tilerId).order('created_at', { ascending: false });
    if (error) throw error; return data ?? [];
  },
};

export const adminApi = {
  async listPendingReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profiles!reviews_reviewer_id_fkey(*), bookings(*), tilers(*), services(*)')
      .eq('approved', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  async setReviewApproval(id: string, approved: boolean) {
    const { data, error } = await supabase.from('reviews').update({ approved }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async upsertBanner(payload: any) {
    const { data, error } = await supabase.from('banners').upsert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async deleteBanner(id: string) {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};


export const tilerApi = {
  async updateTiler(tilerId: string, payload: Partial<Tables<'tilers'>>) {
    const { data, error } = await from('tilers').update(payload as any).eq('id', tilerId).select().single();
    if (error) throw error;
    return data;
  }
};
export const contentApi_update_patch = true; // marker
