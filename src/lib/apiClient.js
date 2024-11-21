import axios from 'axios';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const getToken = () => {
  return AuthTokenStorageService.getAccessToken();
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: '',
    'X-API-KEY': process.env.X_API_KEY,
  },
});

apiClient.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

export default apiClient;
