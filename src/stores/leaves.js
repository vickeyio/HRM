import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLeaveStore = defineStore('leaves', () => {
  const leaveTypeFilter = ref('All');
  const statusFilter = ref('All');
  const searchQuery = ref('');

  const leaveRequests = ref([
    {
      id: 1,
      leaveType: 'Medical Leave',
      fromDate: '14 Jan 2024',
      toDate: '15 Jan 2024',
      noOfDays: 2,
      approverName: 'Doglas Martini',
      approverRole: 'Manager',
      approverAvatar: '/assets/img/profiles/avatar-03.jpg',
      status: 'Approved',
      reason: 'I am currently experiencing a fever and feeling unwell.'
    },
    {
      id: 2,
      leaveType: 'Annual Leave',
      fromDate: '21 Jan 2024',
      toDate: '25 Jan 2024',
      noOfDays: 5,
      approverName: 'Doglas Martini',
      approverRole: 'Manager',
      approverAvatar: '/assets/img/profiles/avatar-03.jpg',
      status: 'Approved',
      reason: 'Annual family vacation leave request.'
    },
    {
      id: 3,
      leaveType: 'Medical Leave',
      fromDate: '20 Jan 2024',
      toDate: '22 Feb 2024',
      noOfDays: 3,
      approverName: 'Warren Morales',
      approverRole: 'Admin',
      approverAvatar: '/assets/img/profiles/avatar-05.jpg',
      status: 'Approved',
      reason: 'Medical checkup and rest.'
    },
    {
      id: 4,
      leaveType: 'Annual Leave',
      fromDate: '15 Mar 2024',
      toDate: '17 Mar 2024',
      noOfDays: 3,
      approverName: 'Doglas Martini',
      approverRole: 'Manager',
      approverAvatar: '/assets/img/profiles/avatar-03.jpg',
      status: 'Approved',
      reason: 'Personal time off.'
    },
    {
      id: 5,
      leaveType: 'Casual Leave',
      fromDate: '12 Apr 2024',
      toDate: '16 Apr 2024',
      noOfDays: 5,
      approverName: 'Doglas Martini',
      approverRole: 'Manager',
      approverAvatar: '/assets/img/profiles/avatar-03.jpg',
      status: 'Declined',
      reason: 'Urgent family task.'
    },
    {
      id: 6,
      leaveType: 'Medical Leave',
      fromDate: '20 May 2024',
      toDate: '21 Mar 2024',
      noOfDays: 2,
      approverName: 'Warren Morales',
      approverRole: 'Admin',
      approverAvatar: '/assets/img/profiles/avatar-05.jpg',
      status: 'Declined',
      reason: 'Fever recovery.'
    }
  ]);

  const filteredLeaves = computed(() => {
    return leaveRequests.value.filter(item => {
      const matchesSearch =
        item.leaveType.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.approverName.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesType = leaveTypeFilter.value === 'All' || item.leaveType === leaveTypeFilter.value;
      const matchesStatus = statusFilter.value === 'All' || item.status === statusFilter.value;

      return matchesSearch && matchesType && matchesStatus;
    });
  });

  function addLeave(data) {
    const newRequest = {
      id: Date.now(),
      leaveType: data.leaveType || 'Casual Leave',
      fromDate: data.fromDate || '01 Aug 2024',
      toDate: data.toDate || '03 Aug 2024',
      noOfDays: 2,
      approverName: 'Doglas Martini',
      approverRole: 'Manager',
      approverAvatar: '/assets/img/profiles/avatar-03.jpg',
      status: 'Pending',
      reason: data.reason || 'Personal reasons'
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
    filteredLeaves,
    addLeave,
    updateLeave,
    updateStatus,
    deleteLeave
  };
});
