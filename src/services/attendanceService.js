import apiClient from './api';

export const attendanceService = {
  async getAll() {
    try {
      const res = await apiClient.get('/hr/work-shift');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    } catch (err) {
      console.warn('API /hr/work-shift unavailable, using mock:', err.message);
    }
    return [
      { id: 1, employeeName: 'Anthony Lewis', date: '04 Aug 2026', checkIn: '08:52 AM', checkOut: '06:05 PM', hours: '9.2', status: 'Present' },
      { id: 2, employeeName: 'Sarah Connor', date: '04 Aug 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9.0', status: 'Present' }
    ];
  }
};

export default attendanceService;
