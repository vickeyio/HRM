import apiClient from './api';

export const designationService = {
  async getAll(params = {}) {
    const resp = await apiClient.get('/designations', { params });
    return resp.data;
  },

  async getById(id) {
    const resp = await apiClient.get(`/designations/${id}`);
    return resp.data;
  },

  async create(data) {
    const resp = await apiClient.post('/designations', data);
    return resp.data;
  },

  async update(id, data) {
    const resp = await apiClient.put(`/designations/${id}`, data);
    return resp.data;
  },

  async delete(id) {
    await apiClient.delete(`/designations/${id}`);
  },

  async toggleStatus(id) {
    const des = await this.getById(id);
    const newStatus = des.status === 'Active' ? 'Inactive' : 'Active';
    return this.update(id, { status: newStatus });
  },
};
