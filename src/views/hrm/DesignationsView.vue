<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Designations"
      :breadcrumbs="['Employees', 'Designations']"
      add-label="Add Designation"
      @add="openAddModal"
      @export="exportData"
    />

    <!-- Designation List Card -->
    <div class="card">
      <DataTableToolbar
        title="Designation List"
        v-model:search="designationStore.searchQuery"
        search-placeholder="Search designation..."
        v-model:status="designationStore.statusFilter"
        v-model:sort="sortBy"
      >
        <template #extra-filters>
          <!-- Department Filter Dropdown -->
          <div class="dropdown me-3">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Department: {{ designationStore.departmentFilter }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li v-for="dept in departmentOptions" :key="dept">
                <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="designationStore.departmentFilter = dept">
                  {{ dept === 'All' ? 'All Departments' : dept }}
                </a>
              </li>
            </ul>
          </div>
        </template>
      </DataTableToolbar>

      <div v-if="designationStore.isLoading" class="card-body p-0 text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading designations...</p>
      </div>
      <div v-else-if="designationStore.error" class="card-body p-0 text-center py-5">
        <i class="ti ti-alert-circle fs-1 mb-2 text-danger"></i>
        <p class="text-muted mb-0">{{ designationStore.error }}</p>
      </div>
      <div v-else class="card-body p-0">
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
              <tr v-if="displayedItems.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  No designations found matching search criteria.
                </td>
              </tr>
              <tr v-for="des in displayedItems" :key="des.id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="des.id" v-model="selectedIds">
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
import { ref, toRef } from 'vue';
import { useDesignationStore } from '../../stores/designations';
import { useCrudTable } from '../../composables/useCrudTable';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import DesignationFormModal from '../../components/hrm/DesignationFormModal.vue';

const designationStore = useDesignationStore();

const isModalOpen = ref(false);
const selectedDesignation = ref(null);

const departmentOptions = [
  'All',
  'Finance',
  'Application Development',
  'IT Management',
  'Web Development',
  'Sales',
  'UI / UX'
];

const {
  sortBy,
  selectedIds,
  displayedItems,
  isAllSelected,
  toggleSelectAll,
  exportData
} = useCrudTable(toRef(designationStore, 'filteredDesignations'), { searchFields: ['name', 'department'] });

function openAddModal() {
  selectedDesignation.value = null;
  isModalOpen.value = true;
}

function openEditModal(des) {
  selectedDesignation.value = { ...des };
  isModalOpen.value = true;
}

async function handleSaveDesignation(formData) {
  try {
    if (selectedDesignation.value && selectedDesignation.value.id) {
      await designationStore.updateDesignation(selectedDesignation.value.id, formData);
    } else {
      await designationStore.addDesignation(formData);
    }
  } catch (err) {
    console.error('Failed to save designation:', err);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this designation?')) {
    designationStore.deleteDesignation(id).catch(err => console.error('Failed to delete designation:', err));
  }
}
</script>
