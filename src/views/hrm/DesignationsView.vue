<template>
  <div>
    <!-- Page Breadcrumb & Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Designations</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">
              Employees
            </li>
            <li class="breadcrumb-item active" aria-current="page">Designations</li>
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
            <i class="ti ti-circle-plus me-2"></i>Add Designation
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

    <!-- Designation List Card -->
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Designation List</h5>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <!-- Search input -->
          <div class="me-3">
            <div class="input-icon position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-search text-gray-9"></i>
              </span>
              <input
                type="text"
                v-model="designationStore.searchQuery"
                class="form-control"
                placeholder="Search designation..."
              />
            </div>
          </div>

          <!-- Department Filter Dropdown -->
          <div class="dropdown me-3">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Department: {{ designationStore.departmentFilter }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'All'">All Departments</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'Finance'">Finance</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'Application Development'">Application Development</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'IT Management'">IT Management</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'Web Development'">Web Development</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'Sales'">Sales</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = 'UI / UX'">UI / UX</a></li>
            </ul>
          </div>

          <!-- Status Dropdown -->
          <div class="dropdown me-3">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Status: {{ designationStore.statusFilter }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.statusFilter = 'All'">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.statusFilter = 'Active'">Active</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.statusFilter = 'Inactive'">Inactive</a></li>
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
                <th>Designation</th>
                <th>Department</th>
                <th>No of Employees</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedDesignations.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  No designations found matching search criteria.
                </td>
              </tr>
              <tr v-for="des in displayedDesignations" :key="des.id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="des.id" v-model="selectedDesignations">
                  </div>
                </td>
                <td>
                  <h6 class="fw-medium fs-14 text-dark mb-0"><a href="javascript:void(0);" class="text-dark" @click="openEditModal(des)">{{ des.name }}</a></h6>
                </td>
                <td>{{ des.department }}</td>
                <td>{{ String(des.employeeCount).padStart(2, '0') }}</td>
                <td>
                  <span :class="['badge d-inline-flex align-items-center badge-xs', des.status === 'Active' ? 'badge-success' : 'badge-danger']" style="cursor: pointer;" @click="designationStore.toggleStatus(des.id)">
                    <i class="ti ti-point-filled me-1"></i>{{ des.status }}
                  </span>
                </td>
                <td>
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(des)" title="Edit Designation"><i class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(des.id)" title="Delete Designation"><i class="ti ti-trash"></i></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Designation Form Modal -->
    <DesignationFormModal
      :is-open="isModalOpen"
      :designation-data="selectedDesignation"
      @close="isModalOpen = false"
      @save="handleSaveDesignation"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDesignationStore } from '../../stores/designations';
import DesignationFormModal from '../../components/hrm/DesignationFormModal.vue';

const designationStore = useDesignationStore();

const isModalOpen = ref(false);
const selectedDesignation = ref(null);
const sortBy = ref('recent');
const sortByLabel = ref('Recently Added');
const selectedDesignations = ref([]);

const displayedDesignations = computed(() => {
  let result = [...designationStore.filteredDesignations];

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
  return displayedDesignations.value.length > 0 && selectedDesignations.value.length === displayedDesignations.value.length;
});

function toggleSelectAll(e) {
  if (e.target.checked) {
    selectedDesignations.value = displayedDesignations.value.map(d => d.id);
  } else {
    selectedDesignations.value = [];
  }
}

function setSort(type, label) {
  sortBy.value = type;
  sortByLabel.value = label;
}

function openAddModal() {
  selectedDesignation.value = null;
  isModalOpen.value = true;
}

function openEditModal(des) {
  selectedDesignation.value = { ...des };
  isModalOpen.value = true;
}

function handleSaveDesignation(formData) {
  if (selectedDesignation.value && selectedDesignation.value.id) {
    designationStore.updateDesignation(selectedDesignation.value.id, formData);
  } else {
    designationStore.addDesignation(formData);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this designation?')) {
    designationStore.deleteDesignation(id);
  }
}

function exportData(format) {
  alert(`Exporting Designations as ${format.toUpperCase()}...`);
}
</script>
