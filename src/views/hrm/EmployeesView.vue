<template>
  <div>
    <!-- Page Breadcrumb & Header Toolbar -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Employees List</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">
              Employees
            </li>
            <li class="breadcrumb-item active" aria-current="page">Employees List</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <!-- View Toggle (List vs Grid) -->
        <div class="me-2 mb-2">
          <div class="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
            <button
              type="button"
              :class="['btn btn-icon btn-sm me-1', viewMode === 'list' ? 'active bg-primary text-white' : 'btn-light']"
              @click="viewMode = 'list'"
              title="List View"
            >
              <i class="ti ti-list-tree"></i>
            </button>
            <button
              type="button"
              :class="['btn btn-icon btn-sm', viewMode === 'grid' ? 'active bg-primary text-white' : 'btn-light']"
              @click="viewMode = 'grid'"
              title="Grid View"
            >
              <i class="ti ti-layout-grid"></i>
            </button>
          </div>
        </div>

        <!-- Export Dropdown -->
        <div class="me-2 mb-2">
          <div class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              <i class="ti ti-file-export me-1"></i>Export
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="exportData('pdf')">
                  <i class="ti ti-file-type-pdf me-1"></i>Export as PDF
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="exportData('excel')">
                  <i class="ti ti-file-type-xls me-1"></i>Export as Excel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Add Employee Button -->
        <div class="mb-2">
          <button @click="openAddModal" class="btn btn-primary d-flex align-items-center">
            <i class="ti ti-circle-plus me-2"></i>Add Employee
          </button>
        </div>

        <!-- Collapse Header Button -->
        <div class="head-icons ms-2">
          <a href="javascript:void(0);" class="" id="collapse-header" title="Collapse">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Stat Cards Row -->
    <div class="row">
      <!-- Total Employee -->
      <div class="col-lg-3 col-md-6 d-flex">
        <div class="card flex-fill">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center overflow-hidden">
              <div>
                <span class="avatar avatar-lg bg-dark rounded-circle"><i class="ti ti-users"></i></span>
              </div>
              <div class="ms-2 overflow-hidden">
                <p class="fs-12 fw-medium mb-1 text-truncate">Total Employee</p>
                <h4>{{ employeeStore.employees.length }}</h4>
              </div>
            </div>
            <div>
              <span class="badge badge-soft-purple badge-sm fw-normal">
                <i class="ti ti-arrow-wave-right-down"></i> +19.01%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active -->
      <div class="col-lg-3 col-md-6 d-flex">
        <div class="card flex-fill">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center overflow-hidden">
              <div>
                <span class="avatar avatar-lg bg-success rounded-circle"><i class="ti ti-user-share"></i></span>
              </div>
              <div class="ms-2 overflow-hidden">
                <p class="fs-12 fw-medium mb-1 text-truncate">Active</p>
                <h4>{{ activeCount }}</h4>
              </div>
            </div>
            <div>
              <span class="badge badge-soft-primary badge-sm fw-normal">
                <i class="ti ti-arrow-wave-right-down"></i> +19.01%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- InActive -->
      <div class="col-lg-3 col-md-6 d-flex">
        <div class="card flex-fill">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center overflow-hidden">
              <div>
                <span class="avatar avatar-lg bg-danger rounded-circle"><i class="ti ti-user-pause"></i></span>
              </div>
              <div class="ms-2 overflow-hidden">
                <p class="fs-12 fw-medium mb-1 text-truncate">InActive</p>
                <h4>{{ inactiveCount }}</h4>
              </div>
            </div>
            <div>
              <span class="badge badge-soft-dark badge-sm fw-normal">
                <i class="ti ti-arrow-wave-right-down"></i> +19.01%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- New Joiners -->
      <div class="col-lg-3 col-md-6 d-flex">
        <div class="card flex-fill">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center overflow-hidden">
              <div>
                <span class="avatar avatar-lg bg-info rounded-circle"><i class="ti ti-user-plus"></i></span>
              </div>
              <div class="ms-2 overflow-hidden">
                <p class="fs-12 fw-medium mb-1 text-truncate">New Joiners</p>
                <h4>67</h4>
              </div>
            </div>
            <div>
              <span class="badge badge-soft-secondary badge-sm fw-normal">
                <i class="ti ti-arrow-wave-right-down"></i> +19.01%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Stat Cards Row -->

    <!-- Employee Directory Content Card -->
    <div class="card">
      <!-- Filter Toolbar Header -->
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Employee List</h5>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <!-- Search Box -->
          <div class="me-3">
            <div class="input-icon position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-search text-gray-9"></i>
              </span>
              <input
                type="text"
                v-model="employeeStore.searchQuery"
                class="form-control"
                placeholder="Search employee..."
              />
            </div>
          </div>

          <!-- Designation Filter Dropdown -->
          <div class="dropdown me-3">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Designation: {{ selectedDesignation || 'All' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedDesignation = ''">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedDesignation = 'Finance'">Finance</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedDesignation = 'Developer'">Developer</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedDesignation = 'Executive'">Executive</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedDesignation = 'Designing'">Designing</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedDesignation = 'Human Resources'">Human Resources</a></li>
            </ul>
          </div>

          <!-- Status Filter Dropdown -->
          <div class="dropdown me-3">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Select Status: {{ employeeStore.statusFilter }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="employeeStore.statusFilter = 'All'">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="employeeStore.statusFilter = 'Active'">Active</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="employeeStore.statusFilter = 'Inactive'">Inactive</a></li>
            </ul>
          </div>

          <!-- Sort Dropdown -->
          <div class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Sort By : {{ sortByLabel }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="setSort('recent', 'Recently Added')">Recently Added</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="setSort('asc', 'Ascending')">Ascending</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="setSort('desc', 'Descending')">Descending</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-if="employeeStore.isLoading" class="card-body p-0 text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading employees...</p>
      </div>
      <div v-else-if="employeeStore.error" class="card-body p-0 text-center py-5">
        <i class="ti ti-alert-circle fs-1 mb-2 text-danger"></i>
        <p class="text-muted mb-0">{{ employeeStore.error }}</p>
      </div>
      <div v-else-if="viewMode === 'list'" class="card-body p-0">
        <div class="custom-datatable-filter table-responsive">
          <table class="table datatable">
            <thead class="thead-light">
              <tr>
                <th class="no-sort">
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :checked="isAllSelected" @change="toggleSelectAll">
                  </div>
                </th>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedEmployees.length === 0">
                <td colspan="9" class="text-center py-5 text-muted">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  No employees matching criteria.
                </td>
              </tr>
              <tr v-for="emp in displayedEmployees" :key="emp.employee_id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="emp.employee_id" v-model="selectedEmployees">
                  </div>
                </td>
                <td><a href="javascript:void(0);" class="text-primary fw-medium" @click="openEditModal(emp)">{{ emp.employee_number }}</a></td>
                <td>
                  <div class="d-flex align-items-center">
                    <a href="javascript:void(0);" class="avatar avatar-md me-2">
                      <img :src="emp.avatar || '/assets/img/profiles/avatar-02.jpg'" class="img-fluid rounded-circle" alt="img">
                    </a>
                    <div>
                      <p class="text-dark mb-0"><a href="javascript:void(0);" class="fw-medium" @click="openEditModal(emp)">{{ emp.name }}</a></p>
                      <span class="fs-12 text-muted">{{ emp.role || emp.department }}</span>
                    </div>
                  </div>
                </td>
                <td><a :href="'mailto:' + emp.email" class="text-body">{{ emp.email }}</a></td>
                <td>{{ emp.phone || '(123) 4567 890' }}</td>
                <td>
                  <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                      {{ emp.department || 'General' }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-2">
                      <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeDepartment(emp, 'Finance')">Finance</a></li>
                      <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeDepartment(emp, 'Development')">Development</a></li>
                      <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeDepartment(emp, 'Designing')">Designing</a></li>
                      <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeDepartment(emp, 'Human Resources')">Human Resources</a></li>
                    </ul>
                  </div>
                </td>
                <td>{{ emp.employment_date }}</td>
                <td>
                  <span :class="['badge d-inline-flex align-items-center badge-xs', emp.status === 'Active' ? 'badge-success' : 'badge-danger']">
                    <i class="ti ti-point-filled me-1"></i>{{ emp.status }}
                  </span>
                </td>
                <td>
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(emp)" title="Edit Employee"><i class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(emp.employee_id)" title="Delete Employee"><i class="ti ti-trash"></i></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Grid View -->
      <div v-else class="card-body p-4">
        <div class="row">
          <div v-if="displayedEmployees.length === 0" class="col-12 text-center py-5 text-muted">
            <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
            No employees matching criteria.
          </div>
          <div v-for="emp in displayedEmployees" :key="emp.employee_id" class="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div class="card border flex-fill text-center p-3">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span :class="['badge badge-xs d-inline-flex align-items-center', emp.status === 'Active' ? 'badge-success' : 'badge-danger']">
                  <i class="ti ti-point-filled me-1"></i>{{ emp.status }}
                </span>
                <div class="dropdown">
                  <a href="javascript:void(0);" class="text-muted" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></a>
                  <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="openEditModal(emp)"><i class="ti ti-edit me-1"></i>Edit</a></li>
                    <li><a href="javascript:void(0);" class="dropdown-item rounded-1 text-danger" @click="confirmDelete(emp.employee_id)"><i class="ti ti-trash me-1"></i>Delete</a></li>
                  </ul>
                </div>
              </div>
              <div class="avatar avatar-xxl rounded-circle mx-auto mb-3">
                <img :src="emp.avatar || '/assets/img/profiles/avatar-02.jpg'" class="img-fluid rounded-circle" alt="img">
              </div>
              <h5 class="mb-1"><a href="javascript:void(0);" class="text-dark" @click="openEditModal(emp)">{{ emp.name }}</a></h5>
              <p class="fs-13 text-muted mb-2">{{ emp.role || emp.department }}</p>
              <div class="bg-light rounded p-2 mb-3">
                <span class="fs-12 text-dark d-block">ID: <strong>{{ emp.employee_number }}</strong></span>
                <span class="fs-12 text-muted d-block">{{ emp.email }}</span>
              </div>
              <div class="d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-light btn-sm" @click="openEditModal(emp)"><i class="ti ti-edit me-1"></i>Edit</button>
                <button class="btn btn-outline-danger btn-sm" @click="confirmDelete(emp.employee_id)"><i class="ti ti-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Employee Form Modal -->
    <EmployeeFormModal
      :is-open="isModalOpen"
      :employee-data="selectedEmployee"
      @close="isModalOpen = false"
      @save="handleSaveEmployee"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useEmployeeStore } from '../../stores/employees';
import EmployeeFormModal from '../../components/hrm/EmployeeFormModal.vue';

const employeeStore = useEmployeeStore();

const viewMode = ref('list'); // 'list' | 'grid'
const isModalOpen = ref(false);
const selectedEmployee = ref(null);
const selectedDesignation = ref('');
const sortBy = ref('recent');
const sortByLabel = ref('Recently Added');

const selectedEmployees = ref([]);

const activeCount = computed(() => employeeStore.employees.filter(e => e.status === 'Active').length);
const inactiveCount = computed(() => employeeStore.employees.filter(e => e.status === 'Inactive').length);

const displayedEmployees = computed(() => {
  let result = [...employeeStore.filteredEmployees];

  if (selectedDesignation.value) {
    result = result.filter(e =>
      (e.role && e.role.toLowerCase().includes(selectedDesignation.value.toLowerCase())) ||
      (e.department && e.department.toLowerCase().includes(selectedDesignation.value.toLowerCase()))
    );
  }

  if (sortBy.value === 'asc') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'desc') {
    result.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    result.sort((a, b) => (b.employee_id || 0) - (a.employee_id || 0));
  }

  return result;
});

const isAllSelected = computed(() => {
  return displayedEmployees.value.length > 0 && selectedEmployees.value.length === displayedEmployees.value.length;
});

function toggleSelectAll(e) {
  if (e.target.checked) {
    selectedEmployees.value = displayedEmployees.value.map(emp => emp.employee_id);
  } else {
    selectedEmployees.value = [];
  }
}

function setSort(type, label) {
  sortBy.value = type;
  sortByLabel.value = label;
}

function openAddModal() {
  selectedEmployee.value = null;
  isModalOpen.value = true;
}

function openEditModal(emp) {
  selectedEmployee.value = { ...emp };
  isModalOpen.value = true;
}

async function handleSaveEmployee(formData) {
  try {
    if (selectedEmployee.value && selectedEmployee.value.employee_id) {
      await employeeStore.updateEmployee(selectedEmployee.value.employee_id, formData);
      if (selectedEmployee.value.employee_id) {
        Object.assign(selectedEmployee.value, employeeStore.employees.find(e => e.employee_id === selectedEmployee.value.employee_id) || {});
      }
    } else {
      await employeeStore.addEmployee(formData);
    }
  } catch (err) {
    console.error('Failed to save employee:', err);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to remove this employee?')) {
    employeeStore.deleteEmployee(id).catch(err => console.error('Failed to delete employee:', err));
  }
}

function changeDepartment(emp, dept) {
  employeeStore.updateEmployee(emp.employee_id, { department_id: dept }).catch(err => console.error('Failed to update employee:', err));
}

function exportData(format) {
  alert(`Exporting Employee Directory as ${format.toUpperCase()}...`);
}
</script>

