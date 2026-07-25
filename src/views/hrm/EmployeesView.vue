<template>
  <div>
    <!-- Page Header & Action Toolbar -->
    <div class="d-md-flex d-block align-items-center justify-content-between mb-4">
      <div>
        <h3 class="page-title fw-bold mb-1">Employee Directory</h3>
        <ul class="breadcrumb border-0 p-0 m-0 bg-transparent">
          <li class="breadcrumb-item"><router-link to="/">Core HR</router-link></li>
          <li class="breadcrumb-item active">Employees</li>
        </ul>
      </div>
      <div class="d-flex align-items-center gap-2 mt-3 mt-md-0">
        <!-- Search Field -->
        <div class="input-group">
          <input
            type="text"
            v-model="employeeStore.searchQuery"
            class="form-control"
            placeholder="Search name, ID, role..."
          />
          <span class="input-group-text bg-white"><i class="ti ti-search text-muted"></i></span>
        </div>

        <!-- Add Employee Button -->
        <button class="btn btn-primary text-nowrap d-flex align-items-center" @click="openAddModal">
          <i class="ti ti-user-plus me-1"></i> Add Employee
        </button>
      </div>
    </div>

    <!-- Filters & Stats Summary Bar -->
    <div class="card border-0 shadow-sm mb-3">
      <div class="card-body py-2 px-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div class="d-flex align-items-center gap-2">
          <span class="text-muted fs-7 me-1">Status:</span>
          <button
            v-for="status in ['All', 'Active', 'Inactive']"
            :key="status"
            :class="['btn btn-sm', employeeStore.statusFilter === status ? 'btn-primary' : 'btn-light']"
            @click="employeeStore.statusFilter = status"
          >
            {{ status }}
          </button>
        </div>
        <div class="text-muted fs-7">
          Showing <strong>{{ employeeStore.filteredEmployees.length }}</strong> of <strong>{{ employeeStore.employees.length }}</strong> employees
        </div>
      </div>
    </div>

    <!-- Employee Data Table -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Emp ID</th>
                <th>Employee Name & Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="employeeStore.filteredEmployees.length === 0">
                <td colspan="7" class="text-center py-5 text-muted">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  No employees matching your criteria.
                </td>
              </tr>
              <tr v-for="emp in employeeStore.filteredEmployees" :key="emp.id">
                <td class="fw-bold text-primary">#{{ emp.empId }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="emp.avatar" class="rounded-circle me-2" width="38" height="38" alt="Avatar" />
                    <div>
                      <h6 class="mb-0 fw-semibold text-dark">{{ emp.name }}</h6>
                      <small class="text-muted">{{ emp.role }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge bg-light text-dark border">{{ emp.department }}</span>
                </td>
                <td class="text-muted">{{ emp.email }}</td>
                <td class="text-muted">{{ emp.joiningDate }}</td>
                <td>
                  <span :class="['badge rounded-pill', emp.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger']">
                    {{ emp.status }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-light text-secondary me-1" title="Toggle Status" @click="employeeStore.toggleStatus(emp.id)">
                      <i class="ti ti-refresh"></i>
                    </button>
                    <button class="btn btn-sm btn-light text-primary me-1" title="Edit Employee" @click="openEditModal(emp)">
                      <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-light text-danger" title="Delete Employee" @click="confirmDelete(emp.id)">
                      <i class="ti ti-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modular Employee Add/Edit Form Modal -->
    <EmployeeFormModal
      :is-open="isModalOpen"
      :employee-data="selectedEmployee"
      @close="isModalOpen = false"
      @save="handleSaveEmployee"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEmployeeStore } from '../../stores/employees';
import EmployeeFormModal from '../../components/hrm/EmployeeFormModal.vue';

const employeeStore = useEmployeeStore();

const isModalOpen = ref(false);
const selectedEmployee = ref(null);

function openAddModal() {
  selectedEmployee.value = null;
  isModalOpen.value = true;
}

function openEditModal(emp) {
  selectedEmployee.value = { ...emp };
  isModalOpen.value = true;
}

function handleSaveEmployee(formData) {
  if (selectedEmployee.value && selectedEmployee.value.id) {
    employeeStore.updateEmployee(selectedEmployee.value.id, formData);
  } else {
    employeeStore.addEmployee(formData);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to remove this employee from the directory?')) {
    employeeStore.deleteEmployee(id);
  }
}
</script>
