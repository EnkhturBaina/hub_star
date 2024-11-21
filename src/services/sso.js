import Client from '@lib/apiClient';

const SsoGovService = {
  async data(code) {
    const token = await Client.post('/sso-gov/token', { code });
    const response = await Client.get('/sso-gov/' + token.data.response.access_token);
    return response.data;
  },
};
export default SsoGovService;
