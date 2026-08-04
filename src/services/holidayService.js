import apiClient from './api';

export const holidayService = {
  async getAll(params = {}) {
    const resp = await apiClient.get('/holidays', { params });
    return resp.data;
  },

  async getById(id) {
    const resp = await apiClient.get(`/holidays/${id}`);
    return resp.data;
  },

  async create(data) {
    const resp = await apiClient.post('/holidays', data);
    return resp.data;
  },

  async update(id, data) {
    const resp = await apiClient.put(`/holidays/${id}`, data);
    return resp.data;
  },

  async delete(id) {
    await apiClient.delete(`/holidays/${id}`);
  },

  async toggleStatus(id) {
    const holiday = await this.getById(id);
    const newStatus = holiday.status === 'Active' ? 'Inactive' : 'Active';
    return this.update(id, { status: newStatus });
  },
};
