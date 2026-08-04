import apiClient from './api';

export const leaveService = {
  async getAll(params = {}) {
    const resp = await apiClient.get('/leaves', { params });
    return resp.data;
  },

  async getById(id) {
    const resp = await apiClient.get(`/leaves/${id}`);
    return resp.data;
  },

  async getStats() {
    const resp = await apiClient.get('/leaves/stats');
    return resp.data;
  },

  async create(data) {
    const resp = await apiClient.post('/leaves', data);
    return resp.data;
  },

  async update(id, data) {
    const resp = await apiClient.put(`/leaves/${id}`, data);
    return resp.data;
  },

  async updateStatus(id, status) {
    const resp = await apiClient.patch(`/leaves/${id}/status`, { status });
    return resp.data;
  },

  async delete(id) {
    await apiClient.delete(`/leaves/${id}`);
  },
};
