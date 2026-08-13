<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Holidays"
      :breadcrumbs="['HRM', 'Holidays']"
      add-label="Add Holiday"
      @add="openAddModal"
    />

    <!-- Holidays List Card -->
    <div class="card">
      <DataTableToolbar
        title="Holidays List"
        v-model:search="holidayStore.searchQuery"
        search-placeholder="Search holiday..."
        v-model:status="holidayStore.statusFilter"
      />

      <div v-if="holidayStore.isLoading" class="card-body p-0 text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading holidays...</p>
      </div>
      <div v-else-if="holidayStore.error" class="card-body p-0 text-center py-5">
        <i class="ti ti-alert-circle fs-1 mb-2 text-danger"></i>
        <p class="text-muted mb-0">{{ holidayStore.error }}</p>
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
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedItems.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  <i class="ti ti-calendar-off fs-1 d-block mb-2 text-secondary"></i>
                  No holidays found matching search criteria.
                </td>
              </tr>
              <tr v-for="h in displayedItems" :key="h.holiday_id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="h.holiday_id" v-model="selectedIds">
                  </div>
                </td>
                <td>
                  <h6 class="fw-medium mb-0"><a href="javascript:void(0);" class="text-dark" @click="openEditModal(h)">{{ h.title }}</a></h6>
                </td>
                <td>
                  <span class="d-inline-flex align-items-center">
                    <i class="ti ti-calendar me-1 text-primary"></i>{{ h.date }}
                  </span>
                </td>
                <td>{{ h.description }}</td>
                <td>
                  <span :class="['badge d-inline-flex align-items-center badge-sm', h.status === 'Active' ? 'badge-success' : 'badge-danger']">
                    <i class="ti ti-point-filled me-1"></i>{{ h.status }}
                  </span>
                </td>
                <td>
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(h)" title="Edit Holiday"><i class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(h.holiday_id)" title="Delete Holiday"><i class="ti ti-trash"></i></a>
                  </div>
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
import { ref, toRef } from 'vue';
import { useHolidayStore } from '../../stores/holidays';
import { useCrudTable } from '../../composables/useCrudTable';
import { useModalStore } from '../../stores/modal';
import { useAlertStore } from '../../stores/alert';
import { parseBackendError } from '../../utils/apiResponseHelper';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import BaseDataTable from '../../components/common/BaseDataTable.vue';
import HolidayFormModal from '../../components/hrm/HolidayFormModal.vue';
import ConfirmModal from '../../components/common/ConfirmModal.vue';

const holidayStore = useHolidayStore();
const modalStore = useModalStore();
const alertStore = useAlertStore();

const selectedHoliday = ref(null);
const modalLoading = ref(false);
const modalError = ref('');
const modalFieldErrors = ref({});

const {
  selectedIds,
  displayedItems,
  isAllSelected,
  toggleSelectAll
} = useCrudTable(toRef(holidayStore, 'filteredHolidays'), { searchFields: ['title', 'description'] });

function openAddModal() {
  selectedHoliday.value = null;
  modalLoading.value = false;
  modalError.value = '';
  modalFieldErrors.value = {};
  modalStore.openModal({
    component: HolidayFormModal,
    props: {
      holidayData: null,
      loading: modalLoading.value,
      error: modalError.value,
      fieldErrors: modalFieldErrors.value,
    },
    title: 'Add Holiday',
    size: 'lg',
    showFooter: true,
    confirmText: 'Add Holiday',
    disableCloseWhileSubmitting: true,
    onConfirm: async (formData) => {
      await holidayStore.addHoliday(formData);
    }
  });
}

function openEditModal(h) {
  selectedHoliday.value = { ...h };
  modalLoading.value = false;
  modalError.value = '';
  modalFieldErrors.value = {};
  modalStore.openModal({
    component: HolidayFormModal,
    props: {
      holidayData: selectedHoliday.value,
      loading: modalLoading.value,
      error: modalError.value,
      fieldErrors: modalFieldErrors.value,
    },
    title: 'Edit Holiday',
    size: 'lg',
    showFooter: true,
    confirmText: 'Save Changes',
    disableCloseWhileSubmitting: true,
    onConfirm: async (formData) => {
      await holidayStore.updateHoliday(h.id, formData);
    }
  });
}

async function handleFormSubmit(formData) {
  modalLoading.value = true;
  modalError.value = '';
  modalFieldErrors.value = {};
  try {
    if (selectedHoliday.value && selectedHoliday.value.id) {
      await holidayStore.updateHoliday(selectedHoliday.value.id, formData);
    } else {
      await holidayStore.addHoliday(formData);
    }
    modalStore.closeModal();
  } catch (err) {
    const parsed = parseBackendError(err);
    modalError.value = parsed.message;
    modalFieldErrors.value = parsed.fieldErrors;
    if (parsed.message && !parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', title: 'Error', message: parsed.message });
    }
  } finally {
    modalLoading.value = false;
  }
}

function confirmDelete(id) {
  modalStore.openModal({
    component: ConfirmModal,
    props: {
      heading: 'Delete Holiday',
      message: 'Are you sure you want to delete this holiday? This action cannot be undone.',
      confirmLabel: 'Delete',
      loading: false,
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
    onConfirm: () => holidayStore.deleteHoliday(id)
  });
}
</script>
