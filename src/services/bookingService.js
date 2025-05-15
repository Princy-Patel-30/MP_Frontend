import api from '../utils/api';

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const getProviderBookings = async () => {
  const response = await api.get('/provider/bookings');
  return response.data;
};