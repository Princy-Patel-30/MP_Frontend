import api, { setAuthToken } from '../utils/api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, ...user } = response.data;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const googleSignIn = async (code) => {
  try {
    const response = await api.post('/auth/google/callback', { code });
    const { token, ...user } = response.data;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Google sign-in failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token, ...user } = response.data;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const fetchGoogleAuthUrl = async () => {
  try {
    const response = await api.get('/auth/google');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Google auth URL');
  }
};