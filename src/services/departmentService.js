import apiClient from './api';
import { initialDepartments } from './mock/data/departments';

export const departmentService = {
  async getAll() {
    try {
      const res = await apiClient.get('/hr/departments');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /hr/departments unavailable, trying /hr/department fallback:', err.message);
    }

    try {
      const res = await apiClient.get('/hr/department');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    } catch (err) {
      console.warn('API /hr/department fallback unavailable, using mock data:', err.message);
    }

    return initialDepartments;
  },

  async create(data) {
    try {
      const res = await apiClient.post('/hr/department', data);
      return res.data?.dataPayload?.data || res.data?.data || res.data;
    } catch (err) {
      console.warn('API create department failed, falling back to local creation:', err.message);
      return { id: Date.now(), ...data, employeeCount: 0, status: 'Active' };
    }
  },

  async update(id, data) {
    try {
      const res = await apiClient.put(`/hr/department/${id}`, data);
      return res.data;
    } catch (err) {
      console.warn(`API update department ${id} failed:`, err.message);
      return { id, ...data };
    }
  },

  async delete(id) {
    try {
      await apiClient.delete(`/hr/department/${id}`);
      return true;
    } catch (err) {
      console.warn(`API delete department ${id} failed:`, err.message);
      return true;
    }
  }
};

export default departmentService;
