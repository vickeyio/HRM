import apiClient from './api';

export const employeeService = {
  async getAll(params = {}) {
    const resp = await apiClient.get('/employees', { params });
    return resp.data;
  },

  async getById(id) {
    const resp = await apiClient.get(`/employees/${id}`);
    return resp.data;
  },

  async create(data) {
    const resp = await apiClient.post('/employees', data);
    return resp.data;
  },

  async update(id, data) {
    const resp = await apiClient.put(`/employees/${id}`, data);
    return resp.data;
  },

  async delete(id) {
    await apiClient.delete(`/employees/${id}`);
  },

  async toggleStatus(id) {
    const employee = await this.getById(id);
    const newStatus = employee.status === 'Active' ? 'Inactive' : 'Active';
    return this.update(id, { status: newStatus });
  },
};
