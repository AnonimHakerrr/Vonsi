// services/http_api.ts
import axios from 'axios';
import { getToken, removeToken } from './tokenService';
import { APP_CONFIG } from '../env';

const http_api = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Додаємо Bearer токен перед кожним запитом
http_api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Ловимо помилки 401/403
http_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      removeToken(); // видаляємо токен при неавторизованому доступі
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export default http_api;
