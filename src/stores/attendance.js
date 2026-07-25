import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAttendanceStore = defineStore('attendance', () => {
  const searchQuery = ref('');
  const departmentFilter = ref('All');
  const statusFilter = ref('All');

  const stats = ref({
    present: 250,
    presentTrend: '+1%',
    lateLogin: 45,
    lateTrend: '-1%',
    uninformed: 15,
    uninformedTrend: '-12%',
    permission: 3,
    permissionTrend: '+1%',
    absent: 12,
    absentTrend: '-19%'
  });

  const logs = ref([
    {
      id: 1,
      empId: 'EMP-001',
      employeeName: 'Anthony Lewis',
      department: 'UI/UX Team',
      avatar: '/assets/img/profiles/avatar-02.jpg',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:45 PM',
      breakTime: '30 Min',
      lateTime: '32 Min',
      productionHours: '8.55 Hrs',
      isOvertime: false
    },
    {
      id: 2,
      empId: 'EMP-002',
      employeeName: 'Brian Villalobos',
      department: 'Development',
      avatar: '/assets/img/profiles/avatar-03.jpg',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:12 PM',
      breakTime: '20 Min',
      lateTime: '20 Min',
      productionHours: '7.54 Hrs',
      isOvertime: false
    },
    {
      id: 3,
      empId: 'EMP-003',
      employeeName: 'Harvey Smith',
      department: 'HR',
      avatar: '/assets/img/profiles/avatar-04.jpg',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:13 PM',
      breakTime: '50 Min',
      lateTime: '23 Min',
      productionHours: '8.45 Hrs',
      isOvertime: false
    },
    {
      id: 4,
      empId: 'EMP-004',
      employeeName: 'Stephan Peralt',
      department: 'Management',
      avatar: '/assets/img/profiles/avatar-05.jpg',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:23 PM',
      breakTime: '41 Min',
      lateTime: '50 Min',
      productionHours: '8.35 Hrs',
      isOvertime: false
    },
    {
      id: 5,
      empId: 'EMP-005',
      employeeName: 'Doglas Martini',
      department: 'Development',
      avatar: '/assets/img/profiles/avatar-06.jpg',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:43 PM',
      breakTime: '23 Min',
      lateTime: '10 Min',
      productionHours: '8.22 Hrs',
      isOvertime: false
    },
    {
      id: 6,
      empId: 'EMP-006',
      employeeName: 'Linda Ray',
      department: 'UI/UX Team',
      avatar: '/assets/img/profiles/avatar-07.jpg',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      breakTime: '-',
      lateTime: '-',
      productionHours: '0.00 Hrs',
      isOvertime: false
    }
  ]);

  const filteredLogs = computed(() => {
    return logs.value.filter(log => {
      const matchesSearch =
        log.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        log.department.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesDept = departmentFilter.value === 'All' || log.department === departmentFilter.value;
      const matchesStatus = statusFilter.value === 'All' || log.status === statusFilter.value;

      return matchesSearch && matchesDept && matchesStatus;
    });
  });

  function updateLog(id, updatedFields) {
    const idx = logs.value.findIndex(l => l.id === id);
    if (idx !== -1) {
      logs.value[idx] = { ...logs.value[idx], ...updatedFields };
    }
  }

  return {
    searchQuery,
    departmentFilter,
    statusFilter,
    stats,
    logs,
    filteredLogs,
    updateLog
  };
});
