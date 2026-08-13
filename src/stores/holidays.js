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
      const matchesSearch =
        (h.title || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (h.description || '').toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = statusFilter.value === 'All' || h.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });

  async function fetchAll(force = false) {
    if (loaded.value && !force) return;
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
    const newHoliday = await holidayService.create(data);
    holidays.value.unshift(newHoliday);
    return newHoliday;
  }

  async function updateHoliday(id, updatedData) {
    const updated = await holidayService.update(id, updatedData);
    const index = holidays.value.findIndex(h => h.holiday_id === id);
    if (index !== -1) {
      holidays.value[index] = updated;
    }
    return updated;
  }

  async function deleteHoliday(id) {
    await holidayService.delete(id);
    holidays.value = holidays.value.filter(h => h.holiday_id !== id);
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
    deleteHoliday
  };
});
