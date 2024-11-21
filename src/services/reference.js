import Client from '@lib/apiClient';
/** Лавлах сервисүүд */
const ReferenceService = {
  async getMainDirection(params) {
    const response = await Client.get('/reference/main-direction', { params });
    return response.data;
  },
  async getMainDirection(params) {
    const response = await Client.get('/reference/main-direction', { params });
    return response.data;
  },
  async getDirection(params) {
    const response = await Client.get('/reference/direction', { params });
    return response.data;
  },
  async getSubDirection(params) {
    const response = await Client.get('/reference/sub-direction', {
      params,
    });
    return response.data;
  },
  async getAddress(params) {
    const response = await Client.get('/reference/address', { params });
    return response.data;
  },
  async getAdvice(params) {
    const response = await Client.get('reference/advice', { params });
    return response.data;
  },
  async getNews(params) {
    const response = await Client.get('/reference/news', { params });
    return response.data;
  },
  async getNewsById(id) {
    const response = await Client.get('/reference/news/show/' + id);
    return response.data;
  },
};

export default ReferenceService;
