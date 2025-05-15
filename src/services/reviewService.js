import api from '../utils/api';

export const addReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const getReviews = async (serviceId) => {
  const response = await api.get(`/reviews/${serviceId}`);
  return response.data;
};