import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLeaveStore = defineStore('leaves', () => {
  const leaveTypeFilter = ref('All');
  const statusFilter = ref('All');
  const searchQuery = ref('');

  const leaveRequests = ref([
    {
      id: 1,
      empId: 'EMP-001',
      employeeName: 'Anthony Lewis',
      department: 'Finance',
      avatar: '/assets/img/profiles/avatar-02.jpg',
      leaveType: 'Medical Leave',
      reason: 'Experiencing high fever and under medical prescription.',
      fromDate: '2024-01-14',
      toDate: '2024-01-15',
      noOfDays: 2,
      status: 'Approved'
    },
    {
      id: 2,
      empId: 'EMP-002',
      employeeName: 'Brian Villalobos',
      department: 'Development',
      avatar: '/assets/img/profiles/avatar-03.jpg',
      leaveType: 'Casual Leave',
      reason: 'Personal family emergency.',
      fromDate: '2024-01-21',
      toDate: '2024-01-25',
      noOfDays: 5,
      status: 'Pending'
    },
    {
      id: 3,
      empId: 'EMP-003',
      employeeName: 'Stephaney Harvey',
      department: 'Human Resources',
      avatar: '/assets/img/profiles/avatar-04.jpg',
      leaveType: 'Annual Leave',
      reason: 'Annual family vacation.',
      fromDate: '2024-02-10',
      toDate: '2024-02-14',
      noOfDays: 5,
      status: 'Approved'
    },
    {
      id: 4,
      empId: 'EMP-004',
      employeeName: 'Doglas Meier',
      department: 'IT Systems',
      avatar: '/assets/img/profiles/avatar-05.jpg',
      leaveType: 'Casual Leave',
      reason: 'Personal appointments.',
      fromDate: '2024-03-01',
      toDate: '2024-03-02',
      noOfDays: 2,
      status: 'Rejected'
    }
  ]);

  const leaveStats = computed(() => {
    const totalPresent = '180/200';
    const plannedLeaves = leaveRequests.value.filter(l => l.leaveType === 'Annual Leave').length * 2 + 8;
    const unplannedLeaves = leaveRequests.value.filter(l => l.leaveType === 'Medical Leave' || l.leaveType === 'Casual Leave').length * 2 + 4;
    const pendingRequests = leaveRequests.value.filter(l => l.status === 'Pending').length;

    return {
      totalPresent,
      plannedLeaves,
      unplannedLeaves,
      pendingRequests
    };
  });

  const filteredLeaves = computed(() => {
    return leaveRequests.value.filter(item => {
      const matchesSearch =
        item.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.leaveType.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesType = leaveTypeFilter.value === 'All' || item.leaveType === leaveTypeFilter.value;
      const matchesStatus = statusFilter.value === 'All' || item.status === statusFilter.value;

      return matchesSearch && matchesType && matchesStatus;
    });
  });

  function addLeave(data) {
    const from = new Date(data.fromDate);
    const to = new Date(data.toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newRequest = {
      id: Date.now(),
      empId: data.empId || 'EMP-001',
      employeeName: data.employeeName || 'Current Employee',
      department: data.department || 'General',
      avatar: data.avatar || '/assets/img/profiles/avatar-02.jpg',
      leaveType: data.leaveType,
      reason: data.reason || 'Personal reasons',
      fromDate: data.fromDate,
      toDate: data.toDate,
      noOfDays: isNaN(diffDays) ? 1 : diffDays,
      status: 'Pending'
    };
    leaveRequests.value.unshift(newRequest);
  }

  function updateLeave(id, updatedData) {
    const idx = leaveRequests.value.findIndex(l => l.id === id);
    if (idx !== -1) {
      leaveRequests.value[idx] = { ...leaveRequests.value[idx], ...updatedData };
    }
  }

  function updateStatus(id, newStatus) {
    const item = leaveRequests.value.find(l => l.id === id);
    if (item) {
      item.status = newStatus;
    }
  }

  function deleteLeave(id) {
    leaveRequests.value = leaveRequests.value.filter(l => l.id !== id);
  }

  return {
    leaveRequests,
    leaveTypeFilter,
    statusFilter,
    searchQuery,
    leaveStats,
    filteredLeaves,
    addLeave,
    updateLeave,
    updateStatus,
    deleteLeave
  };
});
