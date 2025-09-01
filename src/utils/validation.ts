import { z } from 'zod';
export const signupSchema = z.object({ email: z.string().email(), password: z.string().min(6), full_name: z.string().min(2), phone: z.string().min(9).optional(), role: z.enum(['homeowner','tiler']) });
export const bookingSchema = z.object({ tiler_id: z.string().uuid(), service_id: z.string().uuid(), address: z.string().min(3), date_preference: z.string().optional(), notes: z.string().optional() });
export const reviewSchema = z.object({ booking_id: z.string().uuid(), tiler_id: z.string().uuid(), rating_quality: z.number().min(1).max(5), rating_service: z.number().min(1).max(5), rating_timeliness: z.number().min(1).max(5), rating_pricing: z.number().min(1).max(5), rating_cleanliness: z.number().min(1).max(5), comment: z.string().optional() });
