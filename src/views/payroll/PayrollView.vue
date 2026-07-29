<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Employee Salary</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Payroll</li>
            <li class="breadcrumb-item active" aria-current="page">Employee Salary</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="me-2 mb-2">
          <button class="btn btn-white d-inline-flex align-items-center" @click="exportSalary">
            <i class="ti ti-file-export me-1"></i>Export
          </button>
        </div>
        <div class="mb-2">
          <button class="btn btn-primary d-flex align-items-center" @click="openAddModal">
            <i class="ti ti-circle-plus me-2"></i>Add Salary
          </button>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Employee Salary List</h5>
        <div class="d-flex align-items-center flex-wrap row-gap-3">
          <div class="me-3">
            <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Employee...">
          </div>
          <div class="dropdown me-3">
            <button class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
              Designation: {{ selectedDept || 'All' }}
            </button>
            <ul class="dropdown-menu">
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedDept = ''">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedDept = 'Finance'">Finance</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedDept = 'Developer'">Developer</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedDept = 'Manager'">Manager</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Salary</th>
                <th>Payslip</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in filteredSalaries" :key="emp.empId">
                <td><span class="fw-medium text-primary">{{ emp.empId }}</span></td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="emp.avatar" class="avatar avatar-md rounded-circle me-2" alt="img" @error="handleImgError">
                    <div>
                      <h6 class="mb-0 fs-14 fw-medium">{{ emp.name }}</h6>
                      <span class="text-muted fs-12">{{ emp.designation }}</span>
                    </div>
                  </div>
                </td>
                <td>{{ emp.email }}</td>
                <td>{{ emp.phone }}</td>
                <td><span class="badge bg-light text-dark border">{{ emp.designation }}</span></td>
                <td>{{ emp.joiningDate }}</td>
                <td><span class="fw-bold text-success">${{ emp.salary.toLocaleString() }}</span></td>
                <td>
                  <router-link to="/payslips" class="badge bg-dark text-white px-2 py-1 cursor-pointer">
                    <i class="ti ti-file-text me-1"></i>Generate Slip
                  </router-link>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-icon btn-light me-1" @click="editSalary(emp)"><i class="ti ti-edit"></i></button>
                  <button class="btn btn-sm btn-icon btn-light text-danger" @click="deleteSalary(emp.empId)"><i class="ti ti-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedDept = ref('');

const salaries = ref([
  { empId: 'Emp-001', name: 'Anthony Lewis', designation: 'Finance', email: 'anthony@example.com', phone: '(123) 4567 890', joiningDate: '12 Sep 2024', salary: 40000, avatar: '/assets/img/users/user-32.jpg' },
  { empId: 'Emp-002', name: 'Brian Villalobos', designation: 'Developer', email: 'brian@example.com', phone: '(179) 7382 829', joiningDate: '24 Oct 2024', salary: 35000, avatar: '/assets/img/users/user-09.jpg' },
  { empId: 'Emp-003', name: 'Harvey Smith', designation: 'Developer', email: 'harvey@example.com', phone: '(184) 2719 738', joiningDate: '18 Feb 2024', salary: 20000, avatar: '/assets/img/users/user-01.jpg' },
  { empId: 'Emp-004', name: 'Stephan Peralt', designation: 'Executive Officer', email: 'stephan@example.com', phone: '(193) 7839 748', joiningDate: '17 Oct 2024', salary: 22000, avatar: '/assets/img/users/user-33.jpg' },
  { empId: 'Emp-005', name: 'Doglas Martini', designation: 'Manager', email: 'doglas@example.com', phone: '(183) 9302 890', joiningDate: '20 Jul 2024', salary: 25000, avatar: '/assets/img/users/user-34.jpg' },
  { empId: 'Emp-006', name: 'Linda Ray', designation: 'Finance', email: 'linda@example.com', phone: '(120) 3728 039', joiningDate: '10 Apr 2024', salary: 30000, avatar: '/assets/img/users/user-02.jpg' }
]);

const filteredSalaries = computed(() => {
  return salaries.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || s.empId.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDept = !selectedDept.value || s.designation.toLowerCase().includes(selectedDept.value.toLowerCase());
    return matchesSearch && matchesDept;
  });
});

function handleImgError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff';
}

function exportSalary() {
  alert('Exporting salary records...');
}

function openAddModal() {
  alert('Opening Add Salary Dialog...');
}

function editSalary(emp) {
  alert(`Editing salary record for ${emp.name}`);
}

function deleteSalary(id) {
  if (confirm(`Are you sure you want to delete ${id}?`)) {
    salaries.value = salaries.value.filter(s => s.empId !== id);
  }
}
</script>
