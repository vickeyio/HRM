import { useApi } from '../composables/useApi';
import { unwrapList } from '../utils/apiResponseHelper';

const defaultStats = {
  present: 0,
  presentTrend: '+0%',
  lateLogin: 0,
  lateTrend: '+0%',
  uninformed: 0,
  uninformedTrend: '+0%',
  permission: 0,
  permissionTrend: '+0%',
  absent: 0,
  absentTrend: '+0%'
};

export const attendanceService = {
  async getAll() {
    try {
      const api = useApi('/hr/work-shifts', { autoFetch: false, enableCache: true });
      await api.request();
      const records = unwrapList(api.data.value);
      const logs = records.map(normalizeWorkShift);
      return {
        stats: defaultStats,
        logs: logs.length ? logs : defaultMockLogs
      };
    } catch (err) {
      console.warn('API /hr/work-shifts unavailable:', err.message);
      return {
        stats: defaultStats,
        logs: defaultMockLogs
      };
    }
  },

  async updateLog(id, updatedFields) {
    return { id, ...updatedFields };
  }
};

function normalizeWorkShift(raw) {
  return {
    id: raw.work_shift_id,
    work_shift_id: raw.work_shift_id,
    employeeName: raw.shift_name || 'General Shift',
    department: 'Operations',
    date: 'Today',
    checkIn: raw.start_time || '08:00 AM',
    checkOut: raw.end_time || '05:00 PM',
    hours: String(raw.duration_hours || '9.0'),
    status: raw.status === 1 ? 'Present' : 'Absent'
  };
}

const defaultMockLogs = [
  { id: 1, employeeName: 'Anthony Lewis', department: 'Application Development', date: '04 Aug 2026', checkIn: '08:52 AM', checkOut: '06:05 PM', hours: '9.2', status: 'Present' },
  { id: 2, employeeName: 'Sarah Connor', department: 'Human Resources', date: '04 Aug 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9.0', status: 'Present' }
];

export default attendanceService;
