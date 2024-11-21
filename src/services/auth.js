import { isEmpty } from 'lodash';
import Client from '@lib/apiClient';
import axios from 'axios';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
/** Хэрэглэгчийн баталгаажуулалт */
const AuthService = {
  async authenticate(payload) {
    const response = await Client.post('authentication/login/', payload);
    return response.data;
  },

  async sendOtp(payload) {
    const response = await Client.post('/authentication/send/otp', payload);
    return response;
  },
  async otpVerify(payload) {
    const response = Client.post('/authentication/verify/otp', payload);
    return response;
  },
  async changePassword(payload) {
    const response = Client.post('/authentication/change-password', payload);
    return response;
  },

  async getCurrentUser(token = '') {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}authentication`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
        'X-API-KEY': process.env.X_API_KEY,
      },
    });
    return response;
  },

  logout() {
    AuthTokenStorageService.clear();
  },

  isAuthenticated() {
    return !isEmpty(AuthTokenStorageService.getAccessToken());
  },
};
export default AuthService;
