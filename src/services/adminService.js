import api from '../utils/api';

// Admin Service APIs
export const adminGetAllServices = async () => {
  const response = await api.get('/admin/services');
  return response.data;
};

export const updateServiceStatus = async (id, status) => {
  const response = await api.put(`/admin/services/${id}`, { status });
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/admin/services/${id}`);
  return response.data;
};

// Admin User APIs
export const addUser = async (userData) => {
  const response = await api.post('/admin/users', userData);
  return response.data.user; // Adjust based on response structure
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/admin/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await api.get(`/admin/users/${id}/details`);
  return response.data;
};