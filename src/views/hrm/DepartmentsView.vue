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

    <!-- Department Base Data Table -->
    <BaseDataTable
      :columns="tableColumns"
      :items="paginatedItems"
      :is-loading="departmentStore.isLoading"
      selectable
      v-model:selected-ids="selectedIds"
      :is-all-selected="isAllSelected"
      id-key="id"
      empty-text="No departments found matching search criteria."
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-count="totalCount"
      :page-size="pageSize"
      @toggle-select-all="toggleSelectAll"
      @next-page="nextPage"
      @prev-page="prevPage"
      @go-to-page="goToPage"
    >
      <template #toolbar>
        <DataTableToolbar
          title="Department List"
          v-model:search="departmentStore.searchQuery"
          search-placeholder="Search department..."
          v-model:status="departmentStore.statusFilter"
          v-model:sort="sortBy"
        />
      </template>

      <template #cell(name)="{ item }">
        <h6 class="fw-medium mb-0">
          <a href="javascript:void(0);" class="text-dark" @click="openEditModal(item)">{{ item.name }}</a>
        </h6>
      </template>

      <template #cell(code)="{ value }">
        <span class="badge badge-soft-secondary">{{ value || '—' }}</span>
      </template>

      <template #cell(description)="{ value }">
        <span class="text-truncate d-inline-block" style="max-width: 250px;">{{ value || '—' }}</span>
      </template>

      <template #cell(status)="{ value }">
        <span :class="['badge d-inline-flex align-items-center badge-xs', value === 'Active' ? 'badge-success' : 'badge-danger']">
          <i class="ti ti-point-filled me-1"></i>{{ value }}
        </span>
      </template>

      <template #actions="{ item }">
        <div class="action-icon d-inline-flex">
          <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(item)" title="Edit Department"><i class="ti ti-edit"></i></a>
          <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(item.id)" title="Delete Department"><i class="ti ti-trash"></i></a>
        </div>
      </template>
    </BaseDataTable>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
import { useDepartmentStore } from '../../stores/departments';
import { useCrudTable } from '../../composables/useCrudTable';
import { useModalStore } from '../../stores/modal';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import BaseDataTable from '../../components/common/BaseDataTable.vue';
import DepartmentFormModal from '../../components/hrm/DepartmentFormModal.vue';
import ConfirmModal from '../../components/common/ConfirmModal.vue';

const departmentStore = useDepartmentStore();
const modalStore = useModalStore();

const tableColumns = [
  { key: 'name', label: 'Department' },
  { key: 'code', label: 'Code' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
];

const {
  sortBy,
  selectedIds,
  paginatedItems,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  isAllSelected,
  toggleSelectAll,
  nextPage,
  prevPage,
  goToPage,
  exportData
} = useCrudTable(toRef(departmentStore, 'filteredDepartments'), {
  searchFields: ['name', 'code'],
  idKey: 'id',
  serverSide: true,
  serverTotalCount: toRef(departmentStore, 'totalCount'),
  onFetch: async ({ page, perPage, search }) => {
    await departmentStore.fetchAll({ page, per_page: perPage, q: search }, true);
  }
});

function openAddModal() {
  modalStore.openModal({
    component: DepartmentFormModal,
    props: {
      departmentData: null,
    },
    title: 'Add Department',
    size: 'lg',
    showFooter: true,
    confirmText: 'Add Department',
    disableCloseWhileSubmitting: true,
    onConfirm: async (formData) => {
      await departmentStore.addDepartment(formData);
    }
  });
}

function openEditModal(dept) {
  modalStore.openModal({
    component: DepartmentFormModal,
    props: {
      departmentData: dept,
    },
    title: 'Edit Department',
    size: 'lg',
    showFooter: true,
    confirmText: 'Save Changes',
    disableCloseWhileSubmitting: true,
    onConfirm: async (formData) => {
      await departmentStore.updateDepartment(dept.id, formData);
    }
  });
}

function confirmDelete(id) {
  modalStore.openModal({
    component: ConfirmModal,
    props: {
      isOpen: true,
      heading: 'Delete Department',
      message: 'Are you sure you want to delete this department? This action cannot be undone.',
      confirmLabel: 'Delete',
      onConfirm: () => departmentStore.deleteDepartment(id)
    },
    title: 'Confirm Delete',
    size: 'sm',
    centered: true,
    showFooter: true,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    showConfirm: true,
    showCancel: true,
    disableCloseWhileSubmitting: true,
  });
}
</script>
