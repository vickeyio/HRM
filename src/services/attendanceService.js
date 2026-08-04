import apiClient from './api';

export const attendanceService = {
  async getAll(params = {}) {
    const resp = await apiClient.get('/attendance', { params });
    return resp.data;
  },

  async getStats(params = {}) {
    const resp = await apiClient.get('/attendance/stats', { params });
    return resp.data;
  },

  async updateLog(id, data) {
    const resp = await apiClient.put(`/attendance/logs/${id}`, data);
    return resp.data;
  },
};
