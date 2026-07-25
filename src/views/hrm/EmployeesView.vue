<template>
  <div>
    <!-- Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between mb-4">
      <div>
        <h3 class="page-title fw-bold">Employees</h3>
        <ul class="breadcrumb border-0 p-0 m-0 bg-transparent">
          <li class="breadcrumb-item"><router-link to="/">HRM</router-link></li>
          <li class="breadcrumb-item active">Employees</li>
        </ul>
      </div>
      <div class="d-flex align-items-center gap-2 mt-3 mt-md-0">
        <div class="input-group">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search employee..." />
          <span class="input-group-text"><i class="ti ti-search"></i></span>
        </div>
        <button class="btn btn-primary d-flex align-items-center" @click="showModal = true">
          <i class="ti ti-user-plus me-1"></i> Add Employee
        </button>
      </div>
    </div>

    <!-- Employee Table Card -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Emp ID</th>
                <th>Name & Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in filteredEmployees" :key="emp.id">
                <td class="fw-semibold text-primary">#{{ emp.empId }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="emp.avatar" class="rounded-circle me-2" width="36" height="36" />
                    <div>
                      <h6 class="mb-0 fw-bold">{{ emp.name }}</h6>
                      <small class="text-muted">{{ emp.role }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ emp.department }}</td>
                <td>{{ emp.email }}</td>
                <td>{{ emp.joiningDate }}</td>
                <td>
                  <span :class="['badge rounded-pill', emp.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger']">
                    {{ emp.status }}
                  </span>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-light me-1" @click="toggleStatus(emp)">
                    <i class="ti ti-refresh"></i>
                  </button>
                  <button class="btn btn-sm btn-light text-danger" @click="deleteEmployee(emp.id)">
                    <i class="ti ti-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Dialog -->
    <div v-if="showModal" class="modal fade show d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Add New Employee</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-6">
                <label class="form-label">Full Name</label>
                <input type="text" v-model="newEmp.name" class="form-control" placeholder="John Doe" />
              </div>
              <div class="col-6">
                <label class="form-label">Role</label>
                <input type="text" v-model="newEmp.role" class="form-control" placeholder="Frontend Developer" />
              </div>
              <div class="col-6">
                <label class="form-label">Department</label>
                <input type="text" v-model="newEmp.department" class="form-control" placeholder="Engineering" />
              </div>
              <div class="col-6">
                <label class="form-label">Email</label>
                <input type="email" v-model="newEmp.email" class="form-control" placeholder="john@smarthr.co.in" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="showModal = false">Cancel</button>
            <button type="button" class="btn btn-primary" @click="addEmployee">Add Employee</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const showModal = ref(false);

const newEmp = ref({
  name: '',
  role: '',
  department: '',
  email: ''
});

const employees = ref([
  { id: 1, empId: 'EMP-001', name: 'Anthony Lewis', role: 'UI/UX Designer', department: 'Designing', email: 'anthony@smarthr.co.in', joiningDate: '2024-01-15', status: 'Active', avatar: '/assets/img/profiles/avatar-02.jpg' },
  { id: 2, empId: 'EMP-002', name: 'Brian Villalobos', role: 'PHP Developer', department: 'Development', email: 'brian@smarthr.co.in', joiningDate: '2023-11-20', status: 'Active', avatar: '/assets/img/profiles/avatar-03.jpg' },
  { id: 3, empId: 'EMP-003', name: 'Stephaney Harvey', role: 'HR Manager', department: 'Human Resources', email: 'stephaney@smarthr.co.in', joiningDate: '2022-05-10', status: 'Active', avatar: '/assets/img/profiles/avatar-04.jpg' },
  { id: 4, empId: 'EMP-004', name: 'Doglas Meier', role: 'DevOps Engineer', department: 'IT Systems', email: 'doglas@smarthr.co.in', joiningDate: '2024-03-01', status: 'Inactive', avatar: '/assets/img/profiles/avatar-05.jpg' }
]);

const filteredEmployees = computed(() => {
  return employees.value.filter(e =>
    e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.department.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function toggleStatus(emp) {
  emp.status = emp.status === 'Active' ? 'Inactive' : 'Active';
}

function deleteEmployee(id) {
  employees.value = employees.value.filter(e => e.id !== id);
}

function addEmployee() {
  if (!newEmp.value.name) return;
  employees.value.unshift({
    id: Date.now(),
    empId: `EMP-00${employees.value.length + 1}`,
    name: newEmp.value.name,
    role: newEmp.value.role || 'Team Member',
    department: newEmp.value.department || 'General',
    email: newEmp.value.email || 'employee@smarthr.co.in',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    avatar: '/assets/img/profiles/avatar-02.jpg'
  });
  newEmp.value = { name: '', role: '', department: '', email: '' };
  showModal.value = false;
}
</script>
