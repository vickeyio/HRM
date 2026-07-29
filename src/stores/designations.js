import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDesignationStore = defineStore('designations', () => {
  const searchQuery = ref('');
  const departmentFilter = ref('All');
  const statusFilter = ref('All');

  const designations = ref([
    { id: 1, name: 'Accountant', department: 'Finance', employeeCount: 10, status: 'Active' },
    { id: 2, name: 'App Developer', department: 'Application Development', employeeCount: 15, status: 'Active' },
    { id: 3, name: 'Technician', department: 'IT Management', employeeCount: 8, status: 'Active' },
    { id: 4, name: 'Web Developer', department: 'Web Development', employeeCount: 10, status: 'Active' },
    { id: 5, name: 'Sales Executive Officer', department: 'Sales', employeeCount: 10, status: 'Active' },
    { id: 6, name: 'Designer', department: 'UI / UX', employeeCount: 15, status: 'Active' },
    { id: 7, name: 'Account Manager', department: 'Account Management', employeeCount: 8, status: 'Active' },
    { id: 8, name: 'SEO Analyst', department: 'Marketing', employeeCount: 10, status: 'Inactive' },
    { id: 9, name: 'Admin', department: 'Administration', employeeCount: 5, status: 'Active' },
    { id: 10, name: 'Business Analyst', department: 'Business Development', employeeCount: 7, status: 'Active' }
  ]);

  const filteredDesignations = computed(() => {
    return designations.value.filter(des => {
      const matchesSearch = des.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            des.department.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesDept = departmentFilter.value === 'All' || des.department === departmentFilter.value;
      const matchesStatus = statusFilter.value === 'All' || des.status === statusFilter.value;
      return matchesSearch && matchesDept && matchesStatus;
    });
  });

  function addDesignation(data) {
    const newDes = {
      id: Date.now(),
      name: data.name,
      department: data.department || 'General',
      employeeCount: Number(data.employeeCount) || 0,
      status: data.status || 'Active'
    };
    designations.value.unshift(newDes);
  }

  function updateDesignation(id, updatedData) {
    const index = designations.value.findIndex(d => d.id === id);
    if (index !== -1) {
      designations.value[index] = { ...designations.value[index], ...updatedData };
    }
  }

  function toggleStatus(id) {
    const des = designations.value.find(d => d.id === id);
    if (des) {
      des.status = des.status === 'Active' ? 'Inactive' : 'Active';
    }
  }

  function deleteDesignation(id) {
    designations.value = designations.value.filter(d => d.id !== id);
  }

  return {
    designations,
    searchQuery,
    departmentFilter,
    statusFilter,
    filteredDesignations,
    addDesignation,
    updateDesignation,
    toggleStatus,
    deleteDesignation
  };
});
