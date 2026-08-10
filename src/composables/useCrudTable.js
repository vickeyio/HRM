import { ref, computed, watch } from 'vue';
import { exportToCSV } from '../utils/export';

export function useCrudTable(itemsRef, options = {}) {
  const {
    searchFields = ['name'],
    defaultSort = 'recent',
    pageSize = 10,
    idKey = null,
    serverSide = false,
    serverTotalCount = null,
    onFetch = null
  } = options;

  const searchQuery = ref('');
  const statusFilter = ref('All');
  const sortBy = ref(defaultSort);
  const selectedIds = ref([]);
  const currentPage = ref(1);

  // Helper to extract unique ID for items across different schemas
  function getItemId(item) {
    if (!item) return null;
    if (idKey && item[idKey] !== undefined) return item[idKey];
    return item.id ?? item.department_id ?? item.job_title_id ?? item.employee_id ?? item.holiday_id ?? item.leave_id ?? null;
  }

  // Computed filtered & sorted list
  const displayedItems = computed(() => {
    if (serverSide) return itemsRef.value || [];

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
      result.sort((a, b) => String(a.name || a.title || a.department_name || '').localeCompare(String(b.name || b.title || b.department_name || '')));
    } else if (sortBy.value === 'desc') {
      result.sort((a, b) => String(b.name || b.title || b.department_name || '').localeCompare(String(a.name || a.title || a.department_name || '')));
    } else if (sortBy.value === 'recent') {
      result.sort((a, b) => (getItemId(b) || 0) - (getItemId(a) || 0));
    }

    return result;
  });

  // Pagination logic
  const perPageVal = computed(() => (typeof pageSize === 'object' && pageSize?.value ? pageSize.value : Number(pageSize) || 10));

  const totalCount = computed(() => {
    if (serverSide && serverTotalCount) {
      return typeof serverTotalCount === 'object' && serverTotalCount.value !== undefined ? serverTotalCount.value : Number(serverTotalCount) || 0;
    }
    return displayedItems.value.length;
  });

  const totalPages = computed(() => {
    const total = totalCount.value;
    return total > 0 ? Math.ceil(total / perPageVal.value) : 1;
  });

  const paginatedItems = computed(() => {
    if (serverSide) return itemsRef.value || [];
    const start = (currentPage.value - 1) * perPageVal.value;
    return displayedItems.value.slice(start, start + perPageVal.value);
  });

  // Trigger server-side fetch when pagination/search parameters change
  if (serverSide && typeof onFetch === 'function') {
    watch([currentPage, perPageVal, searchQuery, statusFilter, sortBy], () => {
      onFetch({
        page: currentPage.value,
        perPage: perPageVal.value,
        search: searchQuery.value,
        status: statusFilter.value,
        sort: sortBy.value
      });
    }, { immediate: true });
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }

  function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  }

  // Select All logic
  const isAllSelected = computed(() => {
    return (
      paginatedItems.value.length > 0 &&
      paginatedItems.value.every(item => selectedIds.value.includes(getItemId(item)))
    );
  });

  function toggleSelectAll() {
    if (isAllSelected.value) {
      const pageIds = paginatedItems.value.map(getItemId);
      selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id));
    } else {
      const pageIds = paginatedItems.value.map(getItemId);
      const newSelected = new Set([...selectedIds.value, ...pageIds]);
      selectedIds.value = Array.from(newSelected);
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
    currentPage,
    pageSize: perPageVal,
    totalPages,
    totalCount,
    displayedItems,
    paginatedItems,
    isAllSelected,
    getItemId,
    nextPage,
    prevPage,
    goToPage,
    toggleSelectAll,
    setSort,
    exportData
  };
}
