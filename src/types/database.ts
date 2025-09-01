export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type Database = {
  public: { Tables: {
    profiles: { Row: { id: string; role: 'homeowner'|'tiler'|'admin'; full_name: string|null; phone: string|null; city: string|null; avatar_url: string|null; push_token: string|null; created_at: string; updated_at: string; };
               Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
               Update: Partial<Database['public']['Tables']['profiles']['Row']>; };
    tilers: { Row: { id: string; profile_id: string; name: string; city: string|null; bio: string|null; cover_url: string|null; rating_avg: number|null; rating_count: number|null; is_active: boolean; spotlights: string[]|null; created_at: string; };
              Insert: Partial<Database['public']['Tables']['tilers']['Row']> & { id: string; profile_id: string; name: string };
              Update: Partial<Database['public']['Tables']['tilers']['Row']>; };
    services: { Row: { id: string; name: string; slug: string; description: string|null; cover_url: string|null; is_active: boolean; created_at: string; };
                Insert: Partial<Database['public']['Tables']['services']['Row']> & { id: string; name: string; slug: string };
                Update: Partial<Database['public']['Tables']['services']['Row']>; };
    tiler_services: { Row: { id: string; tiler_id: string; service_id: string; rate_lkr_sqft: number|null; };
                      Insert: Partial<Database['public']['Tables']['tiler_services']['Row']> & { id: string; tiler_id: string; service_id: string };
                      Update: Partial<Database['public']['Tables']['tiler_services']['Row']>; };
    bookings: { Row: { id: string; homeowner_id: string; tiler_id: string; service_id: string; address: string|null; date_preference: string|null; notes: string|null; status: 'pending'|'accepted'|'declined'|'completed'|'canceled'; created_at: string; };
                Insert: Partial<Database['public']['Tables']['bookings']['Row']> & { homeowner_id: string; tiler_id: string; service_id: string; };
                Update: Partial<Database['public']['Tables']['bookings']['Row']>; };
    reviews: { Row: { id: string; booking_id: string; tiler_id: string; reviewer_id: string; rating_quality: number; rating_service: number; rating_timeliness: number; rating_pricing: number; rating_cleanliness: number; comment: string|null; approved: boolean; created_at: string; };
               Insert: Omit<Database['public']['Tables']['reviews']['Row'],'created_at'|'id'|'approved'> & { id?: string };
               Update: Partial<Database['public']['Tables']['reviews']['Row']>; };
    banners: { Row: { id: string; title: string|null; image_url: string|null; cta_label: string|null; cta_url: string|null; priority: number|null; };
               Insert: Partial<Database['public']['Tables']['banners']['Row']> & { id: string };
               Update: Partial<Database['public']['Tables']['banners']['Row']>; };
    estimator_configs: { Row: { id: string; wastage_default: number|null; labor_floor_min: number|null; labor_floor_max: number|null; labor_skirting_min: number|null; labor_skirting_max: number|null; created_at: string; };
                         Insert: Partial<Database['public']['Tables']['estimator_configs']['Row']> & { id: string };
                         Update: Partial<Database['public']['Tables']['estimator_configs']['Row']>; };
  }};
};
