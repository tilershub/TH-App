import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, bookingApi, contentApi, reviewApi } from '@/services/api';

export const useProfile = (userId?: string | null) =>
  useQuery({ queryKey: ['profile', userId], queryFn: () => (userId ? authApi.getProfile(userId) : Promise.resolve(null)), enabled: !!userId });

export const useBanners = () => useQuery({ queryKey: ['banners'], queryFn: contentApi.listBanners });
export const useServices = () => useQuery({ queryKey: ['services'], queryFn: contentApi.listServices });
export const useService = (slug?: string) => useQuery({ queryKey: ['service', slug], queryFn: () => contentApi.getServiceBySlug(slug!), enabled: !!slug });
export const useTilers = (filters?: { city?: string; spotlight?: string; query?: string }) => useQuery({ queryKey: ['tilers', filters], queryFn: () => contentApi.listTilers(filters) });
export const useTilersForService = (serviceId?: string) => useQuery({ queryKey: ['tilersByService', serviceId], queryFn: () => contentApi.listTilersForService(serviceId!), enabled: !!serviceId });
export const useBookingList = (userId?: string, role?: 'homeowner' | 'tiler') => useQuery({ queryKey: ['bookings', userId, role], queryFn: () => bookingApi.listBookingsByUser(userId!, role!), enabled: !!userId && !!role });
export const useCreateBooking = () => { const qc = useQueryClient(); return useMutation({ mutationFn: bookingApi.createBooking, onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }) }); };
export const useCreateReview = () => useMutation({ mutationFn: reviewApi.createReview });
