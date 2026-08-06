import apiClient from './api';

export const initialLeaves = [
  { id: 1, employeeName: 'Anthony Lewis', leaveType: 'Annual Leave', fromDate: '10 Aug 2026', toDate: '12 Aug 2026', days: 3, reason: 'Family Vacation', status: 'Pending' },
  { id: 2, employeeName: 'Sarah Connor', leaveType: 'Casual Leave', fromDate: '15 Aug 2026', toDate: '15 Aug 2026', days: 1, reason: 'Personal errands', status: 'Approved' }
];

export const leaveService = {
  async getAll() {
    try {
      const res = await apiClient.get('/hr/leave-types');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /hr/leave-types unavailable, trying /hr/leave-type:', err.message);
    }

    try {
      const res = await apiClient.get('/hr/leave-type');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    } catch (err) {
      console.warn('API /hr/leave-type unavailable, using mock:', err.message);
    }

    return initialLeaves;
  },

  async create(data) {
    try {
      const res = await apiClient.post('/hr/leave-type', data);
      return res.data;
    } catch (err) {
      return { id: Date.now(), ...data, status: 'Pending' };
    }
  }
};

export default leaveService;
