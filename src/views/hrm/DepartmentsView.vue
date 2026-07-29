<template>
  <div>
    <!-- Page Breadcrumb & Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Departments</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">
              Employees
            </li>
            <li class="breadcrumb-item active" aria-current="page">Departments</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
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
        <div class="mb-2">
          <button @click="openAddModal" class="btn btn-primary d-flex align-items-center">
            <i class="ti ti-circle-plus me-2"></i>Add Department
          </button>
        </div>
        <div class="head-icons ms-2">
          <a href="javascript:void(0);" id="collapse-header" title="Collapse">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Department List Card -->
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Department List</h5>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <!-- Search input -->
          <div class="me-3">
            <div class="input-icon position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-search text-gray-9"></i>
              </span>
              <input
                type="text"
                v-model="departmentStore.searchQuery"
                class="form-control"
                placeholder="Search department..."
              />
            </div>
          </div>

          <!-- Status Dropdown -->
          <div class="dropdown me-3">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Status: {{ departmentStore.statusFilter }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="departmentStore.statusFilter = 'All'">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="departmentStore.statusFilter = 'Active'">Active</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="departmentStore.statusFilter = 'Inactive'">Inactive</a></li>
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

      <div class="card-body p-0">
        <div class="custom-datatable-filter table-responsive">
          <table class="table datatable">
            <thead class="thead-light">
              <tr>
                <th class="no-sort">
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :checked="isAllSelected" @change="toggleSelectAll">
                  </div>
                </th>
                <th>Department</th>
                <th>No of Employees</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedDepartments.length === 0">
                <td colspan="5" class="text-center py-5 text-muted">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  No departments found matching search criteria.
                </td>
              </tr>
              <tr v-for="dept in displayedDepartments" :key="dept.id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="dept.id" v-model="selectedDepartments">
                  </div>
                </td>
                <td>
                  <h6 class="fw-medium mb-0"><a href="javascript:void(0);" class="text-dark" @click="openEditModal(dept)">{{ dept.name }}</a></h6>
                </td>
                <td>{{ String(dept.employeeCount).padStart(2, '0') }}</td>
                <td>
                  <span :class="['badge d-inline-flex align-items-center badge-xs', dept.status === 'Active' ? 'badge-success' : 'badge-danger']" style="cursor: pointer;" @click="departmentStore.toggleStatus(dept.id)">
                    <i class="ti ti-point-filled me-1"></i>{{ dept.status }}
                  </span>
                </td>
                <td>
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(dept)" title="Edit Department"><i class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(dept.id)" title="Delete Department"><i class="ti ti-trash"></i></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Department Form Modal -->
    <DepartmentFormModal
      :is-open="isModalOpen"
      :department-data="selectedDepartment"
      @close="isModalOpen = false"
      @save="handleSaveDepartment"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDepartmentStore } from '../../stores/departments';
import DepartmentFormModal from '../../components/hrm/DepartmentFormModal.vue';

const departmentStore = useDepartmentStore();

const isModalOpen = ref(false);
const selectedDepartment = ref(null);
const sortBy = ref('recent');
const sortByLabel = ref('Recently Added');
const selectedDepartments = ref([]);

const displayedDepartments = computed(() => {
  let result = [...departmentStore.filteredDepartments];

  if (sortBy.value === 'asc') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'desc') {
    result.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    result.sort((a, b) => b.id - a.id);
  }

  return result;
});

const isAllSelected = computed(() => {
  return displayedDepartments.value.length > 0 && selectedDepartments.value.length === displayedDepartments.value.length;
});

function toggleSelectAll(e) {
  if (e.target.checked) {
    selectedDepartments.value = displayedDepartments.value.map(d => d.id);
  } else {
    selectedDepartments.value = [];
  }
}

function setSort(type, label) {
  sortBy.value = type;
  sortByLabel.value = label;
}

function openAddModal() {
  selectedDepartment.value = null;
  isModalOpen.value = true;
}

function openEditModal(dept) {
  selectedDepartment.value = { ...dept };
  isModalOpen.value = true;
}

function handleSaveDepartment(formData) {
  if (selectedDepartment.value && selectedDepartment.value.id) {
    departmentStore.updateDepartment(selectedDepartment.value.id, formData);
  } else {
    departmentStore.addDepartment(formData);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this department?')) {
    departmentStore.deleteDepartment(id);
  }
}

function exportData(format) {
  alert(`Exporting Departments as ${format.toUpperCase()}...`);
}
</script>
