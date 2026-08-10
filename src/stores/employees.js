import { defineStore } from 'pinia';
import { ref, computed, onBeforeMount } from 'vue';
import { employeeService } from '../services/employeeService';

export const useEmployeeStore = defineStore('employees', () => {
  const searchQuery = ref('');
  const statusFilter = ref('All');
  const employees = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const loaded = ref(false);

  const filteredEmployees = computed(() => {
    return employees.value.filter(emp => {
      const matchesSearch =
        (emp.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (emp.role || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (emp.department || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (emp.employee_number || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (emp.email || '').toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesStatus = statusFilter.value === 'All' || emp.status === statusFilter.value;

      return matchesSearch && matchesStatus;
    });
  });

  async function fetchAll(force = false) {
    if (loaded.value && !force) return;
    isLoading.value = true;
    error.value = null;
    try {
      employees.value = await employeeService.getAll();
      loaded.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to load employees';
      console.error('[EmployeeStore] fetch failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addEmployee(employeeData) {
    try {
      const newEmployee = await employeeService.create(employeeData);
      employees.value.unshift(newEmployee);
      return newEmployee;
    } catch (err) {
      error.value = err.message || 'Failed to add employee';
      throw err;
    }
  }

  async function updateEmployee(id, updatedData) {
    try {
      const updated = await employeeService.update(id, updatedData);
      const index = employees.value.findIndex(e => e.employee_id === id);
      if (index !== -1) {
        employees.value[index] = updated;
      }
      return updated;
    } catch (err) {
      error.value = err.message || 'Failed to update employee';
      throw err;
    }
  }

  async function deleteEmployee(id) {
    try {
      await employeeService.delete(id);
      employees.value = employees.value.filter(e => e.employee_id !== id);
    } catch (err) {
      error.value = err.message || 'Failed to delete employee';
      throw err;
    }
  }

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    employees,
    searchQuery,
    statusFilter,
    isLoading,
    error,
    filteredEmployees,
    fetchAll,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
});
