export type RootStackParamList = {
  Auth: undefined;
  Homeowner: undefined;
  Tiler: undefined;
  Admin: undefined;
};
export type HomeownerStackParamList = {
  Home: undefined;
  Services: undefined;
  ServiceDetail: { slug: string; id: string };
  TilerProfile: { id: string };
  CreateBooking: { tilerId: string; serviceId: string };
  Bookings: undefined;
  BookingDetail: { id: string };
  CreateReview: { bookingId: string; tilerId: string };
  Estimator: undefined;
  Profile: undefined;
  Checkout: { bookingId: string; suggestedAmount?: number } | undefined;
};
export type TilerStackParamList = {
  Home: undefined; Bookings: undefined; Services: undefined; Profile: undefined; EditRates: undefined; EditProfile: undefined;
};
export type AdminStackParamList = { Overview: undefined; ReviewsQueue: undefined; Banners: undefined; };
