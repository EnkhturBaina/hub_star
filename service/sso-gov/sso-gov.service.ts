import axios from 'axios';
import { api } from '../api.service';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

const authRequestCitizen = async () => {
  if (!getCookie('access-token')) {
    redirect('/auth/sigin');
  }
  try {
    const response = await axios.get('/sso-gov/auth-request-citizen', {
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
        Authorization: `Bearer ${getCookie('access-token')}`,
      },
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 400,
    });
    console.log('response ==========>', response);
    if (response.status == 302 && response.headers?.location) {
      const redirectUrl = response.headers.location;
      window.open(redirectUrl, '_blank');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 302) {
      const redirectUrl = error.response.headers.location;
      window.open(redirectUrl, '_blank');
    } else {
      console.error('Хүсэлтийг боловсруулахад алдаа гарлаа:', error);
    }
  }
};
const authRequestOrg = () => {
  return api.get('/sso-gov/auth-request-org');
};
const getToken = (code: string) => {
  return api.post('/sso-gov/token', { code });
};
const getData = (token: string) => {
  return api.get(`/sso-gov/${token}`);
};
export const SsoGovService = { authRequestCitizen, authRequestOrg, getToken, getData };
