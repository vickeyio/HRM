import { defineStore } from 'pinia';
import { ref, computed, reactive, onBeforeMount } from 'vue';
import { leaveService } from '../services/leaveService';

export const useLeaveStore = defineStore('leaves', () => {
  const leaveTypeFilter = ref('All');
  const statusFilter = ref('All');
  const searchQuery = ref('');
  const leaveRequests = ref([]);
  const leaveStats = reactive({
    totalPresent: '0/0',
    plannedLeaves: 0,
    unplannedLeaves: 0,
    pendingRequests: 0,
  });
  const isLoading = ref(false);
  const error = ref(null);
  const loaded = ref(false);

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

  async function fetchAll() {
    if (loaded.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      const [requests, stats] = await Promise.all([
        leaveService.getAll(),
        leaveService.getStats(),
      ]);
      leaveRequests.value = requests;
      Object.assign(leaveStats, stats);
      loaded.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to load leave requests';
      console.error('[LeaveStore] fetch failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addLeave(data) {
    try {
      const newRequest = await leaveService.create(data);
      leaveRequests.value.unshift(newRequest);
      return newRequest;
    } catch (err) {
      error.value = err.message || 'Failed to add leave request';
      throw err;
    }
  }

  async function updateLeave(id, updatedData) {
    try {
      const updated = await leaveService.update(id, updatedData);
      const idx = leaveRequests.value.findIndex(l => l.id === id);
      if (idx !== -1) {
        leaveRequests.value[idx] = updated;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to update leave';
      throw err;
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      const updated = await leaveService.updateStatus(id, newStatus);
      const item = leaveRequests.value.find(l => l.id === id);
      if (item) {
        item.status = updated.status;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to update leave status';
    }
  }

  async function deleteLeave(id) {
    try {
      await leaveService.delete(id);
      leaveRequests.value = leaveRequests.value.filter(l => l.id !== id);
    } catch (err) {
      error.value = err.message || 'Failed to delete leave request';
      throw err;
    }
  }

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    leaveRequests,
    leaveTypeFilter,
    statusFilter,
    searchQuery,
    leaveStats,
    isLoading,
    error,
    filteredLeaves,
    fetchAll,
    addLeave,
    updateLeave,
    updateStatus,
    deleteLeave
  };
});
