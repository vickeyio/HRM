import apiClient from './api';

export const initialHolidays = [
  { id: 1, title: 'New Year Day', date: '01 Jan 2026', day: 'Thursday', description: 'Public Holiday' },
  { id: 2, title: 'Labor Day', date: '01 May 2026', day: 'Friday', description: 'International Workers Day' },
  { id: 3, title: 'Independence Day', date: '04 Jul 2026', day: 'Saturday', description: 'National Holiday' }
];

export const holidayService = {
  async getAll() {
    try {
      const res = await apiClient.get('/hr/public-holidays');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /hr/public-holidays unavailable, trying /hr/public-holiday:', err.message);
    }

    try {
      const res = await apiClient.get('/hr/public-holiday');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    } catch (err) {
      console.warn('API /hr/public-holiday unavailable, using mock:', err.message);
    }

    return initialHolidays;
  },

  async create(data) {
    try {
      const res = await apiClient.post('/hr/public-holiday', data);
      return res.data;
    } catch (err) {
      return { id: Date.now(), ...data };
    }
  }
};

export default holidayService;
