import Client from '@lib/apiClient';
const AdService = {
  async new(payload) {
    const response = await Client.post('/advertisement', payload);
    return response.data;
  },
  async list(params) {
    const response = await Client.get('/advertisement', { params });
    return response.data;
  },
  async info(id) {
    const response = await Client.get('/advertisement' + id);
    return response.data;
  },
  async update(id, payload) {
    const response = await Client.patch('/advertisement/' + id, payload);
    return response.data;
  },
  async remove(id) {
    const response = await Client.delete('/advertisement/' + id);
    return response.data;
  },
  async save(id) {
    const response = await Client.post('/advertisement/save/' + id);
    return response.data;
  },
  async participants(params) {
    const response = await Client.get('/ad/participant', { params });
    return response.data;
  },
  async newParticipant(payload) {
    const response = await Client.post('/ad/participant', payload);
    return response.data;
  },
  async removeParticipant(id) {
    const response = await Client.delete('/ad/participant' + id);
    return response.data;
  },
};
export default AdService;
