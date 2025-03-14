import apiClient from '../lib/apiClient';
import { isEmpty } from 'lodash';
import AuthTokenStorageService from './AuthTokenStorageService';
import axios from 'axios';
import process from 'process';

const AuthService = {
  async authenticate(username, password) {
    const response = await apiClient.post('/authentication/login', { username, password });
    return response.data;
  },
  async register(username, password) {
    const response = await apiClient.post('/authentication/register', { username, password });
    return response.data;
  },
  async sendOtp(payload) {
    const response = await apiClient.post('/authentication/send/otp', payload);
    return response.data;
  },
  async otpVerify(payload) {
    const response = await apiClient.post('/authentication/verify/otp', payload);
    return response.data;
  },
  async getCurrentUser(token = '') {
    const response = axios.get('authentication', {
      baseURL: process.env.BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
        'X-API-KEY': process.env.X_API_KEY,
      },
    });
    return response;
  },
  async otherProfile(id) {
    const response = await apiClient.get('/authentication/profile/' + id);
    return response.data;
  },
  async changePassword(payload) {
    const response = await apiClient.post('/authentication/change-password', payload);
    return response.data;
  },
  async updateById(id, payload) {
    const response = await apiClient.patch('/users/' + id, payload);
    return response.data;
  },
  async removeUser(id) {
    const response = await apiClient.delete('/users/' + id);
    return response.data;
  },
  logout() {
    AuthTokenStorageService.clearToken();
  },
  isAuthenticated() {
    return !isEmpty(AuthTokenStorageService.getAccessToken());
  },
  async getSsoGovToken(code = '') {
    const response = await apiClient.post('/sso-gov/token', { code });
    return response.data;
  },
  async getSsoGovData(token = '') {
    const response = await apiClient.post('/sso-gov/' + token);
    return response.data;
  },
};
export default AuthService;
