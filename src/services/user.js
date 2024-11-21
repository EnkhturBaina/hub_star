import Client from '@lib/apiClient';
/** Хэрэглэгчийн сервис */
const UserService = {
  async info(id) {
    const response = await Client.get('/authentication/profile/' + id);
    return response.data;
  },

  async update(id, payload) {
    const response = await Client.patch('/users/' + id, payload);
    return response.data;
  },

  async remove(id) {
    const response = await Client.delete('/users/' + id);
    return response.data;
  },
};
export default UserService;
