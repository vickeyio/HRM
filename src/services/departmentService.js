import apiClient from './api';

export const departmentService = {
  async getAll(params = {}) {
    const resp = await apiClient.get('/departments', { params });
    return resp.data;
  },

  async getById(id) {
    const resp = await apiClient.get(`/departments/${id}`);
    return resp.data;
  },

  async create(data) {
    const resp = await apiClient.post('/departments', data);
    return resp.data;
  },

  async update(id, data) {
    const resp = await apiClient.put(`/departments/${id}`, data);
    return resp.data;
  },

  async delete(id) {
    await apiClient.delete(`/departments/${id}`);
  },

  async toggleStatus(id) {
    const dept = await this.getById(id);
    const newStatus = dept.status === 'Active' ? 'Inactive' : 'Active';
    return this.update(id, { status: newStatus });
  },
};
