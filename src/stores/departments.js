import { defineStore } from 'pinia';
import { ref, computed, onBeforeMount } from 'vue';
import { departmentService } from '../services/departmentService';

export const useDepartmentStore = defineStore('departments', () => {
  const searchQuery = ref('');
  const statusFilter = ref('All');
  const departments = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const loaded = ref(false);

  const filteredDepartments = computed(() => {
    return departments.value.filter(dept => {
      const matchesSearch =
        (dept.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (dept.code || '').toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = statusFilter.value === 'All' || dept.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });

  const totalCount = ref(0);

  async function fetchAll(params = {}, force = false) {
    if (loaded.value && !force && Object.keys(params).length === 0) return;
    isLoading.value = true;
    error.value = null;
    try {
      const res = await departmentService.getAll(params);
      departments.value = res;
      totalCount.value = res.pagination?.totalCount ?? res.length;
      loaded.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to load departments';
      console.error('[DepartmentStore] fetch failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addDepartment(data) {
    try {
      const newDept = await departmentService.create(data);
      departments.value.unshift(newDept);
      return newDept;
    } catch (err) {
      error.value = err.message || 'Failed to add department';
      throw err;
    }
  }

  async function updateDepartment(id, updatedData) {
    try {
      const updated = await departmentService.update(id, updatedData);
      const index = departments.value.findIndex(d => d.department_id === id);
      if (index !== -1) {
        departments.value[index] = updated;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to update department';
      throw err;
    }
  }

  async function deleteDepartment(id) {
    try {
      await departmentService.delete(id);
      departments.value = departments.value.filter(d => d.department_id !== id);
    } catch (err) {
      error.value = err.message || 'Failed to delete department';
      throw err;
    }
  }

  async function restoreDepartment(id) {
    try {
      await departmentService.restore(id);
      await fetchAll(true);
    } catch (err) {
      error.value = err.message || 'Failed to restore department';
      throw err;
    }
  }

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    departments,
    searchQuery,
    statusFilter,
    isLoading,
    error,
    totalCount,
    filteredDepartments,
    fetchAll,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    restoreDepartment
  };
});
