<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Departments"
      :breadcrumbs="['Employees', 'Departments']"
      add-label="Add Department"
      @add="openAddModal"
      @export="exportData"
    />

    <!-- Department List Card -->
    <div class="card">
      <DataTableToolbar
        title="Department List"
        v-model:search="departmentStore.searchQuery"
        search-placeholder="Search department..."
        v-model:status="departmentStore.statusFilter"
        v-model:sort="sortBy"
      />

      <div v-if="departmentStore.isLoading" class="card-body p-0 text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading departments...</p>
      </div>
      <div v-else-if="departmentStore.error" class="card-body p-0 text-center py-5">
        <i class="ti ti-alert-circle fs-1 mb-2 text-danger"></i>
        <p class="text-muted mb-0">{{ departmentStore.error }}</p>
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
                <th>Department</th>
                <th>No of Employees</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedItems.length === 0">
                <td colspan="5" class="text-center py-5 text-muted">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  No departments found matching search criteria.
                </td>
              </tr>
              <tr v-for="dept in displayedItems" :key="dept.id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="dept.id" v-model="selectedIds">
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
import { ref, toRef } from 'vue';
import { useDepartmentStore } from '../../stores/departments';
import { useCrudTable } from '../../composables/useCrudTable';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import DepartmentFormModal from '../../components/hrm/DepartmentFormModal.vue';

const departmentStore = useDepartmentStore();

const isModalOpen = ref(false);
const selectedDepartment = ref(null);

const {
  sortBy,
  selectedIds,
  displayedItems,
  isAllSelected,
  toggleSelectAll,
  exportData
} = useCrudTable(toRef(departmentStore, 'filteredDepartments'), { searchFields: ['name'] });

function openAddModal() {
  selectedDepartment.value = null;
  isModalOpen.value = true;
}

function openEditModal(dept) {
  selectedDepartment.value = { ...dept };
  isModalOpen.value = true;
}

async function handleSaveDepartment(formData) {
  try {
    if (selectedDepartment.value && selectedDepartment.value.id) {
      await departmentStore.updateDepartment(selectedDepartment.value.id, formData);
    } else {
      await departmentStore.addDepartment(formData);
    }
  } catch (err) {
    console.error('Failed to save department:', err);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this department?')) {
    departmentStore.deleteDepartment(id).catch(err => console.error('Failed to delete department:', err));
  }
}
</script>
