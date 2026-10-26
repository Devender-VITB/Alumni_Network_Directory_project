import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor to attach token from localStorage if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('alumniconnect_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected network error occurred',
      status: error.response?.status,
      errors: error.response?.data?.errors || [],
      isNetworkError: !error.response,
    };
    return Promise.reject(customError);
  }
);

export default api;
