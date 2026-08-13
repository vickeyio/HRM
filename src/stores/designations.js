import { defineStore } from 'pinia';
import { ref, computed, onBeforeMount } from 'vue';
import { designationService } from '../services/designationService';

export const useDesignationStore = defineStore('designations', () => {
  const searchQuery = ref('');
  const departmentFilter = ref('All');
  const statusFilter = ref('All');
  const designations = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const loaded = ref(false);

  const filteredDesignations = computed(() => {
    return designations.value.filter(des => {
      const matchesSearch =
        (des.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (des.title_code || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (des.department || '').toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesDept = departmentFilter.value === 'All' || des.department === departmentFilter.value;
      const matchesStatus = statusFilter.value === 'All' || des.status === statusFilter.value;
      return matchesSearch && matchesDept && matchesStatus;
    });
  });

  async function fetchAll(force = false) {
    if (loaded.value && !force) return;
    isLoading.value = true;
    error.value = null;
    try {
      designations.value = await designationService.getAll();
      loaded.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to load designations';
      console.error('[DesignationStore] fetch failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addDesignation(data) {
    const newDes = await designationService.create(data);
    designations.value.unshift(newDes);
    return newDes;
  }

  async function updateDesignation(id, updatedData) {
    const updated = await designationService.update(id, updatedData);
    const index = designations.value.findIndex(d => d.job_title_id === id);
    if (index !== -1) {
      designations.value[index] = updated;
    }
    return updated;
  }

  async function deleteDesignation(id) {
    await designationService.delete(id);
    designations.value = designations.value.filter(d => d.job_title_id !== id);
  }

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    designations,
    searchQuery,
    departmentFilter,
    statusFilter,
    isLoading,
    error,
    filteredDesignations,
    fetchAll,
    addDesignation,
    updateDesignation,
    deleteDesignation
  };
});
