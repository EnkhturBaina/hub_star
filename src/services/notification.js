import Client from '@lib/apiClient';
/** Мэдэгдэлийн сервис */
const NotificationService = {
  async new(payload) {
    const response = await Client.post('/notification', payload);
    return response.data;
  },
  async list(params) {
    const response = await Client.get('/notification', { params });
    return response.data;
  },
  async update(id, payload) {
    const response = await Client.patch('/notification/' + id, payload);
    return response.data;
  },
  async remove(id) {
    const response = await Client.delete('/notification/' + id);
    return response.data;
  },
};
export default NotificationService;
