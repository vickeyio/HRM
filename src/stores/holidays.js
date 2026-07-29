import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useHolidayStore = defineStore('holidays', () => {
  const searchQuery = ref('');
  const statusFilter = ref('All');

  const holidays = ref([
    { id: 1, title: 'New Year', date: '01 Jan 2024', description: 'First day of the new year', status: 'Active' },
    { id: 2, title: 'Martin Luther King Jr. Day', date: '15 Jan 2024', description: 'Celebrating the civil rights leader', status: 'Active' },
    { id: 3, title: "President's Day", date: '19 Feb 2024', description: 'Honoring past US Presidents', status: 'Active' },
    { id: 4, title: 'Good Friday', date: '29 Mar 2024', description: 'Holiday before Easter', status: 'Active' },
    { id: 5, title: 'Easter Monday', date: '01 Apr 2024', description: 'Holiday after Easter', status: 'Active' },
    { id: 6, title: 'Memorial Day', date: '27 Apr 2024', description: 'Honors military personnel', status: 'Active' },
    { id: 7, title: 'Independence Day', date: '04 Jul 2024', description: 'Celebrates Independence', status: 'Active' },
    { id: 8, title: 'Labour Day', date: '02 Sep 2024', description: 'Honors working people', status: 'Inactive' },
    { id: 9, title: 'Veterans Day', date: '11 Nov 2024', description: 'Honors military veterans', status: 'Active' },
    { id: 10, title: 'Christmas Day', date: '25 Dec 2024', description: 'Celebration of Christmas', status: 'Active' }
  ]);

  const filteredHolidays = computed(() => {
    return holidays.value.filter(h => {
      const matchesSearch = h.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            h.description.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = statusFilter.value === 'All' || h.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });

  function addHoliday(data) {
    const newHoliday = {
      id: Date.now(),
      title: data.title,
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      status: data.status || 'Active'
    };
    holidays.value.unshift(newHoliday);
  }

  function updateHoliday(id, updatedData) {
    const index = holidays.value.findIndex(h => h.id === id);
    if (index !== -1) {
      holidays.value[index] = { ...holidays.value[index], ...updatedData };
    }
  }

  function toggleStatus(id) {
    const holiday = holidays.value.find(h => h.id === id);
    if (holiday) {
      holiday.status = holiday.status === 'Active' ? 'Inactive' : 'Active';
    }
  }

  function deleteHoliday(id) {
    holidays.value = holidays.value.filter(h => h.id !== id);
  }

  return {
    holidays,
    searchQuery,
    statusFilter,
    filteredHolidays,
    addHoliday,
    updateHoliday,
    toggleStatus,
    deleteHoliday
  };
});
