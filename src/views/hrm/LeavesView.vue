<template>
  <div>
    <!-- Breadcrumb & Header Controls -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h3 class="fw-bold mb-1">Leave Requests</h3>
        <nav>
          <ol class="breadcrumb mb-0 bg-transparent p-0">
            <li class="breadcrumb-item"><router-link to="/"><i class="ti ti-smart-home"></i></router-link></li>
            <li class="breadcrumb-item">Attendance</li>
            <li class="breadcrumb-item active" aria-current="page">Leaves</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
        <!-- Add Leave Button -->
        <button class="btn btn-primary d-flex align-items-center" @click="openAddModal">
          <i class="ti ti-circle-plus me-2"></i>Add Leave Request
        </button>
      </div>
    </div>

    <!-- Leaves Info Metric Cards -->
    <div class="row g-3 mb-4">
      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm rounded-3 bg-success-subtle">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                    <i class="ti ti-user-check text-success fs-4"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1 text-muted fs-7">Total Present</p>
                <h4 class="fw-bold text-dark mb-0">{{ leaveStore.leaveStats.totalPresent }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm rounded-3 bg-danger-subtle">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                    <i class="ti ti-user-edit text-danger fs-4"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1 text-muted fs-7">Planned Leaves</p>
                <h4 class="fw-bold text-dark mb-0">{{ leaveStore.leaveStats.plannedLeaves }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm rounded-3 bg-warning-subtle">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                    <i class="ti ti-user-exclamation text-warning fs-4"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1 text-muted fs-7">Unplanned Leaves</p>
                <h4 class="fw-bold text-dark mb-0">{{ leaveStore.leaveStats.unplannedLeaves }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm rounded-3 bg-info-subtle">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                    <i class="ti ti-user-question text-info fs-4"></i>
                  </span>
                </div>
              </div>
              <div class="text-end">
                <p class="mb-1 text-muted fs-7">Pending Requests</p>
                <h4 class="fw-bold text-dark mb-0">{{ leaveStore.leaveStats.pendingRequests }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leaves Table Card & Toolbar -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2 py-3">
        <h5 class="fw-bold mb-0">Leave Applications Queue</h5>

        <div class="d-flex align-items-center gap-2 flex-wrap">
          <!-- Search Bar -->
          <div class="input-group input-group-sm" style="width: 220px;">
            <input type="text" v-model="leaveStore.searchQuery" class="form-control" placeholder="Search employee..." />
            <span class="input-group-text bg-white"><i class="ti ti-search text-muted"></i></span>
          </div>

          <!-- Leave Type Filter -->
          <select v-model="leaveStore.leaveTypeFilter" class="form-select form-select-sm" style="width: 150px;">
            <option value="All">All Leave Types</option>
            <option value="Medical Leave">Medical Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>

          <!-- Status Filter -->
          <select v-model="leaveStore.statusFilter" class="form-select form-select-sm" style="width: 140px;">
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div class="card-body p-0">
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
              <tr v-if="leaveStore.filteredLeaves.length === 0">
                <td colspan="7" class="text-center py-5 text-muted">
                  <i class="ti ti-calendar-off fs-1 d-block mb-2 text-secondary"></i>
                  No leave requests found matching filters.
                </td>
              </tr>
              <tr v-for="leave in leaveStore.filteredLeaves" :key="leave.id">
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
import { ref } from 'vue';
import { useLeaveStore } from '../../stores/leaves';
import LeaveFormModal from '../../components/hrm/LeaveFormModal.vue';

const leaveStore = useLeaveStore();

const isModalOpen = ref(false);
const selectedLeave = ref(null);

function openAddModal() {
  selectedLeave.value = null;
  isModalOpen.value = true;
}

function openEditModal(leave) {
  selectedLeave.value = { ...leave };
  isModalOpen.value = true;
}

function handleSaveLeave(formData) {
  if (selectedLeave.value && selectedLeave.value.id) {
    leaveStore.updateLeave(selectedLeave.value.id, formData);
  } else {
    leaveStore.addLeave(formData);
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this leave request?')) {
    leaveStore.deleteLeave(id);
  }
}
</script>
