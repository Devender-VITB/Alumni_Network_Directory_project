import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL: apiBaseUrl,
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
