import axios, { AxiosInstance } from 'axios';
import { authService } from '../services/authService';

const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request: agrega el header Authorization con el Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: maneja errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend responde 401, la sesión expiró → redirigir al login
    if (error.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
