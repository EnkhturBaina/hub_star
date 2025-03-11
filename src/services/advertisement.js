import apiClient from '../lib/apiClient';
const AdvertisementService = {
  async getAd(params) {
    return apiClient.get('/advertisement', { params });
  },
  async getById(id) {
    return apiClient.get(`/advertisement/${id}`);
  },
  async create(payload) {
    return apiClient.post('/advertisement', payload);
  },
  async update(id, payload) {
    return apiClient.patch('/advertisement/' + id, payload);
  },
  async save(id) {
    return apiClient.post('advertisement/save/' + id);
  },
  async remove(id) {
    return apiClient.delete('advertisement/' + id);
  },
  async createNotification(payload) {
    return apiClient.post('/notification', payload);
  },
  async updateNotification(id, payload) {
    return apiClient.patch('/notification/' + id, payload);
  },
  async removeNotification(id) {
    return apiClient.delete('/notification/' + id);
  },
  async getParticipant(params) {
    return api.get('/ad/participant', { params });
  },
  async createParticipant(data) {
    return api.post('/ad/participant', data);
  },
  async removeParticipant(id) {
    return api.delete('/ad/participant' + id);
  },
};
export default AdvertisementService;
