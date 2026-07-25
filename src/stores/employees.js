import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEmployeeStore = defineStore('employees', () => {
  const searchQuery = ref('');
  const statusFilter = ref('All');

  const employees = ref([
    { id: 1, empId: 'EMP-001', name: 'Anthony Lewis', role: 'UI/UX Designer', department: 'Designing', email: 'anthony@smarthr.co.in', joiningDate: '2024-01-15', status: 'Active', avatar: '/assets/img/profiles/avatar-02.jpg' },
    { id: 2, empId: 'EMP-002', name: 'Brian Villalobos', role: 'PHP Developer', department: 'Development', email: 'brian@smarthr.co.in', joiningDate: '2023-11-20', status: 'Active', avatar: '/assets/img/profiles/avatar-03.jpg' },
    { id: 3, empId: 'EMP-003', name: 'Stephaney Harvey', role: 'HR Manager', department: 'Human Resources', email: 'stephaney@smarthr.co.in', joiningDate: '2022-05-10', status: 'Active', avatar: '/assets/img/profiles/avatar-04.jpg' },
    { id: 4, empId: 'EMP-004', name: 'Doglas Meier', role: 'DevOps Engineer', department: 'IT Systems', email: 'doglas@smarthr.co.in', joiningDate: '2024-03-01', status: 'Inactive', avatar: '/assets/img/profiles/avatar-05.jpg' }
  ]);

  const filteredEmployees = computed(() => {
    return employees.value.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        emp.empId.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesStatus = statusFilter.value === 'All' || emp.status === statusFilter.value;

      return matchesSearch && matchesStatus;
    });
  });

  function addEmployee(employeeData) {
    const newId = Date.now();
    const formattedCount = String(employees.value.length + 1).padStart(3, '0');
    const newEmployee = {
      id: newId,
      empId: `EMP-${formattedCount}`,
      name: employeeData.name,
      role: employeeData.role || 'Team Member',
      department: employeeData.department || 'General',
      email: employeeData.email || 'employee@smarthr.co.in',
      joiningDate: employeeData.joiningDate || new Date().toISOString().split('T')[0],
      status: employeeData.status || 'Active',
      avatar: '/assets/img/profiles/avatar-02.jpg'
    };
    employees.value.unshift(newEmployee);
  }

  function updateEmployee(id, updatedData) {
    const index = employees.value.findIndex(e => e.id === id);
    if (index !== -1) {
      employees.value[index] = { ...employees.value[index], ...updatedData };
    }
  }

  function toggleStatus(id) {
    const emp = employees.value.find(e => e.id === id);
    if (emp) {
      emp.status = emp.status === 'Active' ? 'Inactive' : 'Active';
    }
  }

  function deleteEmployee(id) {
    employees.value = employees.value.filter(e => e.id !== id);
  }

  return {
    employees,
    searchQuery,
    statusFilter,
    filteredEmployees,
    addEmployee,
    updateEmployee,
    toggleStatus,
    deleteEmployee
  };
});
