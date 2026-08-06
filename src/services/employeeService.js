import apiClient from './api';
import { initialEmployees } from './mock/data/employees';

export const employeeService = {
  async getAll() {
    try {
      // Primary plural endpoint: /hr/employees
      const res = await apiClient.get('/hr/employees');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /hr/employees unavailable, trying /hr/employee fallback:', err.message);
    }

    try {
      const res = await apiClient.get('/hr/employee');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    } catch (err) {
      console.warn('API /hr/employee fallback unavailable, using mock data:', err.message);
    }

    return initialEmployees;
  },

  async getById(id) {
    try {
      const res = await apiClient.get(`/hr/employees/${id}`);
      return res.data;
    } catch (err) {
      try {
        const res = await apiClient.get(`/hr/employee/${id}`);
        return res.data;
      } catch (e) {
        console.warn(`API /hr/employee/${id} unavailable:`, e.message);
        return initialEmployees.find(e => e.id === Number(id));
      }
    }
  },

  async create(formData) {
    // Transform UI form data to backend EmployeeDraftCreateRequest schema
    const payload = {
      profile: {
        first_name: formData.firstName || (formData.name ? formData.name.split(' ')[0] : 'Employee'),
        last_name: formData.lastName || (formData.name ? formData.name.split(' ').slice(1).join(' ') : ''),
        email_address: formData.email || 'employee@company.com',
        mobile_number: formData.phone || '254700000000',
        avatar_url: formData.avatar || '/assets/img/profiles/avatar-02.jpg'
      },
      employee: {
        department_id: Number(formData.department_id) || 1,
        job_title_id: Number(formData.job_title_id) || 1,
        hire_date: formData.joiningDate || new Date().toISOString().split('T')[0]
      }
    };

    try {
      const res = await apiClient.post('/hr/employee', payload);
      return res.data?.dataPayload?.data || res.data?.data || res.data;
    } catch (err) {
      console.warn('API create employee failed, falling back to local creation:', err.message);
      return { id: Date.now(), ...formData, status: 'Active' };
    }
  },

  async update(id, data) {
    try {
      const res = await apiClient.put(`/hr/employee/${id}`, data);
      return res.data;
    } catch (err) {
      console.warn(`API update employee ${id} failed:`, err.message);
      return { id, ...data };
    }
  },

  async delete(id) {
    try {
      await apiClient.delete(`/hr/employee/${id}`);
      return true;
    } catch (err) {
      console.warn(`API delete employee ${id} failed:`, err.message);
      return true;
    }
  }
};

export default employeeService;
