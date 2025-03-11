import apiClient from '../lib/apiClient';
const AdvertisementService = {
  async getAd(params) {
    const response = await apiClient.get('/advertisement', { params });
    return response.data;
  },
  async getById(id) {
    const response = await apiClient.get(`/advertisement/${id}`);
    return response.data;
  },
  async create(payload) {
    const response = await apiClient.post('/advertisement', payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await apiClient.patch('/advertisement/' + id, payload);
    return response.data;
  },
  async save(id) {
    const response = await apiClient.post('advertisement/save/' + id);
    return response.data;
  },
  async remove(id) {
    const response = await apiClient.delete('advertisement/' + id);
    return response.data;
  },
  async createNotification(payload) {
    const response = await apiClient.post('/notification', payload);
    return response.data;
  },
  async getNotification(payload) {
    const response = await apiClient.get('/notification', payload);
    return response.data;
  },
  async updateNotification(id, payload) {
    const response = await apiClient.patch('/notification/' + id, payload);
    return response.data;
  },
  async removeNotification(id) {
    const response = await apiClient.delete('/notification/' + id);
    return response.data;
  },
  async getParticipant(params) {
    const response = await apiClient.get('/ad/participant', { params });
    return response.data;
  },
  async createParticipant(data) {
    const response = await apiClient.post('/ad/participant', data);
    return response.data;
  },
  async removeParticipant(id) {
    const response = await apiClient.delete('/ad/participant' + id);
    return response.data;
  },
};
export default AdvertisementService;
