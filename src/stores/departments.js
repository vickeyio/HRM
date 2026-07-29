import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDepartmentStore = defineStore('departments', () => {
  const searchQuery = ref('');
  const statusFilter = ref('All');

  const departments = ref([
    { id: 1, name: 'Finance', employeeCount: 20, status: 'Active' },
    { id: 2, name: 'Application Development', employeeCount: 30, status: 'Active' },
    { id: 3, name: 'IT Management', employeeCount: 15, status: 'Active' },
    { id: 4, name: 'Web Development', employeeCount: 20, status: 'Active' },
    { id: 5, name: 'Sales', employeeCount: 20, status: 'Active' },
    { id: 6, name: 'UI / UX', employeeCount: 12, status: 'Active' },
    { id: 7, name: 'Quality Assurance', employeeCount: 8, status: 'Inactive' },
    { id: 8, name: 'Human Resources', employeeCount: 10, status: 'Active' }
  ]);

  const filteredDepartments = computed(() => {
    return departments.value.filter(dept => {
      const matchesSearch = dept.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = statusFilter.value === 'All' || dept.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });

  function addDepartment(data) {
    const newDept = {
      id: Date.now(),
      name: data.name,
      employeeCount: Number(data.employeeCount) || 0,
      status: data.status || 'Active'
    };
    departments.value.unshift(newDept);
  }

  function updateDepartment(id, updatedData) {
    const index = departments.value.findIndex(d => d.id === id);
    if (index !== -1) {
      departments.value[index] = { ...departments.value[index], ...updatedData };
    }
  }

  function toggleStatus(id) {
    const dept = departments.value.find(d => d.id === id);
    if (dept) {
      dept.status = dept.status === 'Active' ? 'Inactive' : 'Active';
    }
  }

  function deleteDepartment(id) {
    departments.value = departments.value.filter(d => d.id !== id);
  }

  return {
    departments,
    searchQuery,
    statusFilter,
    filteredDepartments,
    addDepartment,
    updateDepartment,
    toggleStatus,
    deleteDepartment
  };
});
