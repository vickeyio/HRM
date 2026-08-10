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

    <!-- Designation Base Data Table -->
    <BaseDataTable
      :columns="tableColumns"
      :items="paginatedItems"
      :is-loading="designationStore.isLoading"
      :error="designationStore.error"
      selectable
      v-model:selected-ids="selectedIds"
      :is-all-selected="isAllSelected"
      id-key="id"
      empty-text="No designations found matching search criteria."
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
          title="Designation List"
          v-model:search="designationStore.searchQuery"
          search-placeholder="Search designation..."
          v-model:status="designationStore.statusFilter"
          v-model:sort="sortBy"
        />
      </template>

      <template #cell(name)="{ item }">
        <h6 class="fw-medium fs-14 text-dark mb-0">
          <a href="javascript:void(0);" class="text-dark" @click="openEditModal(item)">{{ item.name }}</a>
        </h6>
      </template>

      <template #cell(title_code)="{ value }">
        <span class="badge badge-soft-secondary">{{ value || '—' }}</span>
      </template>

      <template #cell(department)="{ value }">
        <span>{{ value || '—' }}</span>
      </template>

      <template #cell(status)="{ value }">
        <span :class="['badge d-inline-flex align-items-center badge-xs', value === 'Active' ? 'badge-success' : 'badge-danger']">
          <i class="ti ti-point-filled me-1"></i>{{ value }}
        </span>
      </template>

      <template #actions="{ item }">
        <div class="action-icon d-inline-flex">
          <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(item)" title="Edit Designation"><i class="ti ti-edit"></i></a>
          <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(item.id)" title="Delete Designation"><i class="ti ti-trash"></i></a>
        </div>
      </template>
    </BaseDataTable>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
import { useDesignationStore } from '../../stores/designations';
import { useCrudTable } from '../../composables/useCrudTable';
import { useModalStore } from '../../stores/modal';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import BaseDataTable from '../../components/common/BaseDataTable.vue';
import DesignationFormModal from '../../components/hrm/DesignationFormModal.vue';
import ConfirmModal from '../../components/common/ConfirmModal.vue';

const designationStore = useDesignationStore();
const modalStore = useModalStore();

const tableColumns = [
  { key: 'name', label: 'Designation' },
  { key: 'title_code', label: 'Code' },
  { key: 'department', label: 'Department' },
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
} = useCrudTable(toRef(designationStore, 'filteredDesignations'), {
  searchFields: ['name', 'title_code'],
  idKey: 'id',
  serverSide: true,
  serverTotalCount: toRef(designationStore, 'totalCount'),
  onFetch: async ({ page, perPage, search }) => {
    await designationStore.fetchAll({ page, per_page: perPage, q: search }, true);
  }
});

function openAddModal() {
  modalStore.open({
    component: DesignationFormModal,
    props: {
      isOpen: true,
      designationData: null,
      onSave: async (formData) => {
        try {
          await designationStore.addDesignation(formData);
        } catch (err) {
          console.error('Failed to add designation:', err);
          throw err;
        }
      }
    }
  });
}

function openEditModal(des) {
  modalStore.open({
    component: DesignationFormModal,
    props: {
      isOpen: true,
      designationData: des,
      onSave: async (formData) => {
        try {
          await designationStore.updateDesignation(des.id, formData);
        } catch (err) {
          console.error('Failed to update designation:', err);
          throw err;
        }
      }
    }
  });
}

function confirmDelete(id) {
  modalStore.open({
    component: ConfirmModal,
    props: {
      isOpen: true,
      heading: 'Delete Designation',
      message: 'Are you sure you want to delete this designation? This action cannot be undone.',
      onConfirm: () => designationStore.deleteDesignation(id)
    }
  });
}
</script>
