import apiClient from './api';
import { initialDesignations } from './mock/data/designations';

export const designationService = {
  async getAll() {
    try {
      const res = await apiClient.get('/hr/job-titles');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /hr/job-titles unavailable, trying /hr/job-title fallback:', err.message);
    }

    try {
      const res = await apiClient.get('/hr/job-title');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    } catch (err) {
      console.warn('API /hr/job-title fallback unavailable, using mock data:', err.message);
    }

    return initialDesignations;
  },

  async create(data) {
    try {
      const res = await apiClient.post('/hr/job-title', data);
      return res.data?.dataPayload?.data || res.data?.data || res.data;
    } catch (err) {
      console.warn('API create job-title failed, falling back to local creation:', err.message);
      return { id: Date.now(), ...data, employeeCount: 0, status: 'Active' };
    }
  },

  async update(id, data) {
    try {
      const res = await apiClient.put(`/hr/job-title/${id}`, data);
      return res.data;
    } catch (err) {
      console.warn(`API update job-title ${id} failed:`, err.message);
      return { id, ...data };
    }
  },

  async delete(id) {
    try {
      await apiClient.delete(`/hr/job-title/${id}`);
      return true;
    } catch (err) {
      console.warn(`API delete job-title ${id} failed:`, err.message);
      return true;
    }
  }
};

export default designationService;
