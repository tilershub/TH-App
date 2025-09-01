// src/services/payments.ts
import { supabase } from '@/services/supabase';

export const paymentsApi = {
  async createPayment(payload: { booking_id: string; amount: number; currency?: string; provider?: string; provider_ref?: string; status?: 'pending' | 'succeeded' | 'failed' }) {
    const { data, error } = await supabase.from('payments').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async listByBooking(bookingId: string) {
    const { data, error } = await supabase.from('payments').select('*').eq('booking_id', bookingId).order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
};
