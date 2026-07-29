<template>
  <div>
    <!-- Page Breadcrumb & Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Holidays</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">
              HRM
            </li>
            <li class="breadcrumb-item active" aria-current="page">Holidays</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="mb-2">
          <button @click="openAddModal" class="btn btn-primary d-flex align-items-center">
            <i class="ti ti-circle-plus me-2"></i>Add Holiday
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

    <!-- Holidays List Card -->
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Holidays List</h5>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <!-- Search input -->
          <div class="me-3">
            <div class="input-icon position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-search text-gray-9"></i>
              </span>
              <input
                type="text"
                v-model="holidayStore.searchQuery"
                class="form-control"
                placeholder="Search holiday..."
              />
            </div>
          </div>

          <!-- Status Dropdown -->
          <div class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Status: {{ holidayStore.statusFilter }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="holidayStore.statusFilter = 'All'">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="holidayStore.statusFilter = 'Active'">Active</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="holidayStore.statusFilter = 'Inactive'">Inactive</a></li>
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
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedHolidays.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  <i class="ti ti-calendar-off fs-1 d-block mb-2 text-secondary"></i>
                  No holidays found matching search criteria.
                </td>
              </tr>
              <tr v-for="h in displayedHolidays" :key="h.id">
                <td>
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" :value="h.id" v-model="selectedHolidays">
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
                  <span :class="['badge d-inline-flex align-items-center badge-sm', h.status === 'Active' ? 'badge-success' : 'badge-danger']" style="cursor: pointer;" @click="holidayStore.toggleStatus(h.id)">
                    <i class="ti ti-point-filled me-1"></i>{{ h.status }}
                  </span>
                </td>
                <td>
                  <div class="action-icon d-inline-flex">
                    <a href="javascript:void(0);" class="me-2 text-secondary" @click="openEditModal(h)" title="Edit Holiday"><i class="ti ti-edit"></i></a>
                    <a href="javascript:void(0);" class="text-danger" @click="confirmDelete(h.id)" title="Delete Holiday"><i class="ti ti-trash"></i></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Holiday Form Modal -->
    <HolidayFormModal
      :is-open="isModalOpen"
      :holiday-data="selectedHoliday"
      @close="isModalOpen = false"
      @save="handleSaveHoliday"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useHolidayStore } from '../../stores/holidays';
import HolidayFormModal from '../../components/hrm/HolidayFormModal.vue';

const holidayStore = useHolidayStore();

const isModalOpen = ref(false);
const selectedHoliday = ref(null);
const selectedHolidays = ref([]);

const displayedHolidays = computed(() => {
  return [...holidayStore.filteredHolidays];
});

const isAllSelected = computed(() => {
  return displayedHolidays.value.length > 0 && selectedHolidays.value.length === displayedHolidays.value.length;
});

function toggleSelectAll(e) {
  if (e.target.checked) {
    selectedHolidays.value = displayedHolidays.value.map(h => h.id);
  } else {
    selectedHolidays.value = [];
  }
}

function openAddModal() {
  selectedHoliday.value = null;
  isModalOpen.value = true;
}

function openEditModal(h) {
  selectedHoliday.value = { ...h };
  isModalOpen.value = true;
}

function handleSaveHoliday(formData) {
  if (selectedHoliday.value && selectedHoliday.value.id) {
    holidayStore.updateHoliday(selectedHoliday.value.id, formData);
  } else {
    holidayStore.addHoliday(formData);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this holiday?')) {
    holidayStore.deleteHoliday(id);
  }
}
</script>
