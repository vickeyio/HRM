import { useApi } from '../composables/useApi';

export const initialLeaves = [
  { id: 1, employeeName: 'Anthony Lewis', leaveType: 'Annual Leave', fromDate: '10 Aug 2026', toDate: '12 Aug 2026', days: 3, reason: 'Family Vacation', status: 'Pending' },
  { id: 2, employeeName: 'Sarah Connor', leaveType: 'Casual Leave', fromDate: '15 Aug 2026', toDate: '15 Aug 2026', days: 1, reason: 'Personal errands', status: 'Approved' }
];

export const leaveService = {
  async getAll() {
    try {
      const api = useApi('/hr/leave-types', { autoFetch: false, enableCache: true });
      await api.request();
      const res = api.data.value;
      if (res && Array.isArray(res)) return res;
      if (res?.data && Array.isArray(res.data)) return res.data;
      if (res?.dataPayload?.data && Array.isArray(res.dataPayload.data)) return res.dataPayload.data;
    } catch (err) {
      console.warn('API /hr/leave-types unavailable, trying /hr/leave-type:', err.message);
    }

    try {
      const fallbackApi = useApi('/hr/leave-type', { autoFetch: false, enableCache: true });
      await fallbackApi.request();
      const res = fallbackApi.data.value;
      if (res && Array.isArray(res)) return res;
      if (res?.data && Array.isArray(res.data)) return res.data;
    } catch (err) {
      console.warn('API /hr/leave-type unavailable, using mock:', err.message);
    }

    return initialLeaves;
  },

  async create(data) {
    const api = useApi('/hr/leave-type', { method: 'POST', autoFetch: false });
    await api.request(data);
    if (api.error.value) throw api.error.value;
    return api.data.value || { id: Date.now(), ...data, status: 'Pending' };
  }
};


export default leaveService;
