import apiClient from '../lib/apiClient';

const ReferenceService = {
  async getMainDirection(params) {
    const response = await apiClient.get('/reference/main-direction', { params });
    return response.data;
  },
  async getDirectionFilter(params) {
    const response = await apiClient.get('/reference/main-direction/filter', { params });
    return response.data;
  },
  async getMainDirectionById(id) {
    const response = await apiClient.get(`/reference/main-direction/show/${id}`);
    return response.data;
  },
  async getDirection(params) {
    const response = await apiClient.get('/reference/direction', { params });
    return response.data;
  },
  async getSubDirection(params) {
    const response = await apiClient.get('/reference/sub-direction', { params });
    return response.data;
  },
  async getAddress(params) {
    const response = await apiClient.get('/reference/address', { params });
    return response.data;
  },
  async getMenu() {
    const response = await apiClient.get('/reference/menu');
    return response.data;
  },
  async getMenuPage(menuId) {
    const response = await apiClient.get('/reference/pages/menu/' + menuId);
    return response.data;
  },
  async getAdvice(params) {
    const response = await apiClient.get('/reference/advice', { params });
    return response.data;
  },
  async getNews() {
    const response = await apiClient.get('/reference/news');
    return response.data;
  },
  async getNewsById(id) {
    const response = await apiClient.get('/reference/news/' + id);
    return response.data;
  },
  async getMachinery(params) {
    const response = await apiClient.get('/reference/machinery', { params });
    return response.data;
  },
  async getAllBranch() {
    const response = await apiClient.get('/reference/branch');
    return response.data;
  },
  async getAllPartnership(branchId) {
    const response = await apiClient.get('/partnership', { params: { branchId } });
    return response.data;
  },
  async getByIdPartnership(id) {
    const response = await apiClient.get('/partnership/' + id);
    return response.data;
  },
  async newFeedback(payload) {
    const response = await apiClient.post('/feedback', payload);
    return response.data;
  },
};

export default ReferenceService;
