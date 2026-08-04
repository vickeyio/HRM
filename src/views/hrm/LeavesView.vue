<template>
  <div>
    <!-- Breadcrumb & Header Controls -->
    <PageHeader
      title="Leave Requests"
      :breadcrumbs="['Attendance', 'Leaves']"
      add-label="Add Leave Request"
      :show-export="false"
      @add="openAddModal"
    />

    <!-- Leaves Info Metric Cards -->
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <div class="card bg-green-img">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                    <i class="ti ti-user-check text-success fs-18"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1">Total Present</p>
                <h4>{{ leaveStore.leaveStats.totalPresent }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card bg-pink-img">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                    <i class="ti ti-user-edit text-pink fs-18"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1">Planned Leaves</p>
                <h4>{{ leaveStore.leaveStats.plannedLeaves }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card bg-yellow-img">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                    <i class="ti ti-user-exclamation text-warning fs-18"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1">Unplanned Leaves</p>
                <h4>{{ leaveStore.leaveStats.unplannedLeaves }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card bg-blue-img">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                    <i class="ti ti-user-question text-info fs-18"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1">Pending Requests</p>
                <h4>{{ leaveStore.leaveStats.pendingRequests }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leaves Table Card & Toolbar -->
    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="Leave Applications Queue"
        v-model:search="leaveStore.searchQuery"
        search-placeholder="Search employee..."
        v-model:status="leaveStore.statusFilter"
        :status-options="['All', 'Pending', 'Approved', 'Rejected']"
      >
        <template #extra-filters>
          <!-- Leave Type Filter -->
          <select v-model="leaveStore.leaveTypeFilter" class="form-select form-select-sm" style="width: 150px;">
            <option value="All">All Leave Types</option>
            <option value="Medical Leave">Medical Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </template>
      </DataTableToolbar>

      <div v-if="leaveStore.isLoading" class="card-body p-0 text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading leave requests...</p>
      </div>
      <div v-else-if="leaveStore.error" class="card-body p-0 text-center py-5">
        <i class="ti ti-alert-circle fs-1 mb-2 text-danger"></i>
        <p class="text-muted mb-0">{{ leaveStore.error }}</p>
      </div>
      <div v-else class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Employee</th>
                <th>Leave Type & Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Duration</th>
                <th>Status</th>
                <th class="text-end">Approval Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedItems.length === 0">
                <td colspan="7" class="text-center py-5 text-muted">
                  <i class="ti ti-calendar-off fs-1 d-block mb-2 text-secondary"></i>
                  No leave requests found matching filters.
                </td>
              </tr>
              <tr v-for="leave in displayedItems" :key="leave.id">
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="leave.avatar" class="rounded-circle me-2" width="36" height="36" alt="avatar" />
                    <div>
                      <h6 class="mb-0 fw-semibold text-dark">{{ leave.employeeName }}</h6>
                      <small class="text-muted">{{ leave.department }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="fw-medium text-dark me-2">{{ leave.leaveType }}</span>
                    <span v-if="leave.reason" class="text-muted fs-7 ms-1" :title="leave.reason">
                      <i class="ti ti-info-circle text-info"></i>
                    </span>
                  </div>
                </td>
                <td class="text-muted">{{ leave.fromDate }}</td>
                <td class="text-muted">{{ leave.toDate }}</td>
                <td>
                  <span class="badge bg-light text-dark border fw-normal">{{ leave.noOfDays }} Days</span>
                </td>
                <td>
                  <span
                    :class="[
                      'badge rounded-pill',
                      leave.status === 'Approved' ? 'bg-success-subtle text-success' :
                      leave.status === 'Rejected' ? 'bg-danger-subtle text-danger' :
                      'bg-warning-subtle text-warning'
                    ]"
                  >
                    {{ leave.status }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="btn-group">
                    <button
                      v-if="leave.status !== 'Approved'"
                      class="btn btn-sm btn-outline-success me-1"
                      title="Approve Leave"
                      @click="leaveStore.updateStatus(leave.id, 'Approved')"
                    >
                      <i class="ti ti-check"></i> Approve
                    </button>
                    <button
                      v-if="leave.status !== 'Rejected'"
                      class="btn btn-sm btn-outline-danger me-1"
                      title="Reject Leave"
                      @click="leaveStore.updateStatus(leave.id, 'Rejected')"
                    >
                      <i class="ti ti-x"></i> Reject
                    </button>
                    <button class="btn btn-sm btn-light text-secondary me-1" title="Edit" @click="openEditModal(leave)">
                      <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-light text-danger" title="Delete" @click="confirmDelete(leave.id)">
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

    <!-- Modal Form -->
    <LeaveFormModal
      :is-open="isModalOpen"
      :leave-data="selectedLeave"
      @close="isModalOpen = false"
      @save="handleSaveLeave"
    />
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
import { useLeaveStore } from '../../stores/leaves';
import { useCrudTable } from '../../composables/useCrudTable';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import LeaveFormModal from '../../components/hrm/LeaveFormModal.vue';

const leaveStore = useLeaveStore();

const isModalOpen = ref(false);
const selectedLeave = ref(null);

const { displayedItems } = useCrudTable(toRef(leaveStore, 'filteredLeaves'), {
  searchFields: ['employeeName', 'leaveType', 'department', 'reason']
});

function openAddModal() {
  selectedLeave.value = null;
  isModalOpen.value = true;
}

function openEditModal(leave) {
  selectedLeave.value = { ...leave };
  isModalOpen.value = true;
}

async function handleSaveLeave(formData) {
  try {
    if (selectedLeave.value && selectedLeave.value.id) {
      await leaveStore.updateLeave(selectedLeave.value.id, formData);
    } else {
      await leaveStore.addLeave(formData);
    }
  } catch (err) {
    console.error('Failed to save leave request:', err);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this leave request?')) {
    leaveStore.deleteLeave(id).catch(err => console.error('Failed to delete leave request:', err));
  }
}
</script>
