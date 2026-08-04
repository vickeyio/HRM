import { defineStore } from 'pinia';
import { ref, computed, onBeforeMount } from 'vue';
import { attendanceService } from '../services/attendanceService';

export const useAttendanceStore = defineStore('attendance', () => {
  const searchQuery = ref('');
  const departmentFilter = ref('All');
  const statusFilter = ref('All');
  const stats = ref({
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
  });
  const logs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const loaded = ref(false);

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

  async function fetchAll() {
    if (loaded.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      const data = await attendanceService.getAll();
      stats.value = data.stats;
      logs.value = data.logs;
      loaded.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to load attendance data';
      console.error('[AttendanceStore] fetch failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function updateLog(id, updatedFields) {
    try {
      const updated = await attendanceService.updateLog(id, updatedFields);
      const idx = logs.value.findIndex(l => l.id === id);
      if (idx !== -1) {
        logs.value[idx] = updated;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to update attendance log';
      throw err;
    }
  }

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    searchQuery,
    departmentFilter,
    statusFilter,
    stats,
    logs,
    isLoading,
    error,
    filteredLogs,
    fetchAll,
    updateLog
  };
});
