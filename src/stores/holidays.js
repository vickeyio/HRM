import { defineStore } from 'pinia';
import { ref, computed, onBeforeMount } from 'vue';
import { holidayService } from '../services/holidayService';

export const useHolidayStore = defineStore('holidays', () => {
  const searchQuery = ref('');
  const statusFilter = ref('All');
  const holidays = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const loaded = ref(false);

  const filteredHolidays = computed(() => {
    return holidays.value.filter(h => {
      const matchesSearch = h.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            h.description.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = statusFilter.value === 'All' || h.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });

  async function fetchAll() {
    if (loaded.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      holidays.value = await holidayService.getAll();
      loaded.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to load holidays';
      console.error('[HolidayStore] fetch failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addHoliday(data) {
    try {
      const newHoliday = await holidayService.create(data);
      holidays.value.unshift(newHoliday);
      return newHoliday;
    } catch (err) {
      error.value = err.message || 'Failed to add holiday';
      throw err;
    }
  }

  async function updateHoliday(id, updatedData) {
    try {
      const updated = await holidayService.update(id, updatedData);
      const index = holidays.value.findIndex(h => h.id === id);
      if (index !== -1) {
        holidays.value[index] = updated;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to update holiday';
      throw err;
    }
  }

  async function toggleStatus(id) {
    try {
      const updated = await holidayService.toggleStatus(id);
      const holiday = holidays.value.find(h => h.id === id);
      if (holiday) {
        holiday.status = updated.status;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to toggle status';
    }
  }

  async function deleteHoliday(id) {
    try {
      await holidayService.delete(id);
      holidays.value = holidays.value.filter(h => h.id !== id);
    } catch (err) {
      error.value = err.message || 'Failed to delete holiday';
      throw err;
    }
  }

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    holidays,
    searchQuery,
    statusFilter,
    isLoading,
    error,
    filteredHolidays,
    fetchAll,
    addHoliday,
    updateHoliday,
    toggleStatus,
    deleteHoliday
  };
});
