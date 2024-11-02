import { api } from '../api.service';

const getToken = (code: string) => {
  return api.post('/sso-gov/token', { code });
};
const getData = (token: string) => {
  return api.get(`/sso-gov/${token}`);
};
export const SsoGovService = { getToken, getData };
