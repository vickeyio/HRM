import { ref, computed } from 'vue';
import { exportToCSV } from '../utils/export';

export function useCrudTable(itemsRef, options = {}) {
  const {
    searchFields = ['name'],
    defaultSort = 'recent'
  } = options;

  const searchQuery = ref('');
  const statusFilter = ref('All');
  const sortBy = ref(defaultSort);
  const selectedIds = ref([]);

  // Computed filtered & sorted list
  const displayedItems = computed(() => {
    let result = [...(itemsRef.value || [])];

    // 1. Search Filter
    if (searchQuery.value && searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      result = result.filter(item =>
        searchFields.some(field => String(item[field] || '').toLowerCase().includes(q))
      );
    }

    // 2. Status Filter
    if (statusFilter.value && statusFilter.value !== 'All') {
      result = result.filter(item => item.status === statusFilter.value);
    }

    // 3. Sorting
    if (sortBy.value === 'asc') {
      result.sort((a, b) => String(a.name || a.title || '').localeCompare(String(b.name || b.title || '')));
    } else if (sortBy.value === 'desc') {
      result.sort((a, b) => String(b.name || b.title || '').localeCompare(String(a.name || a.title || '')));
    } else if (sortBy.value === 'recent') {
      result.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return result;
  });

  // Select All logic
  const isAllSelected = computed(() => {
    return (
      displayedItems.value.length > 0 &&
      displayedItems.value.every(item => selectedIds.value.includes(item.id))
    );
  });

  function toggleSelectAll() {
    if (isAllSelected.value) {
      selectedIds.value = [];
    } else {
      selectedIds.value = displayedItems.value.map(item => item.id);
    }
  }

  function setSort(type) {
    sortBy.value = type;
  }

  // Real Export Helper
  function exportData(type = 'csv', filename = 'data_export') {
    exportToCSV(filename, displayedItems.value);
  }

  return {
    searchQuery,
    statusFilter,
    sortBy,
    selectedIds,
    displayedItems,
    isAllSelected,
    toggleSelectAll,
    setSort,
    exportData
  };
}
