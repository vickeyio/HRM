<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1 fw-bold">Leaves</h2>
        <nav>
          <ol class="breadcrumb mb-0 bg-transparent p-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Attendance</li>
            <li class="breadcrumb-item active" aria-current="page">Leaves</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <!-- Export Dropdown -->
        <div class="me-2 mb-2 dropdown">
          <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
            <i class="ti ti-file-export me-1"></i>Export
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-3">
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1"><i class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1"><i class="ti ti-file-type-xls me-1"></i>Export as Excel</a>
            </li>
          </ul>
        </div>
        <!-- Add Leave Button -->
        <div class="mb-2">
          <button class="btn btn-primary d-flex align-items-center" @click="openAddModal">
            <i class="ti ti-circle-plus me-2"></i>Add Leave
          </button>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Leaves Info -->
    <div class="row g-3 mb-4">
      <div class="col-xl-3 col-md-6">
        <div class="card bg-black-le border-0 shadow-sm rounded-3">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="text-start">
                <p class="mb-1 text-muted">Annual Leaves</p>
                <h4 class="fw-bold mb-0">05</h4>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md d-flex align-items-center justify-content-center">
                    <i class="ti ti-calendar-event fs-32 text-dark"></i>
                  </span>
                </div>
              </div>
            </div>
            <span class="badge bg-secondary-transparent">Remaining Leaves : 07</span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card bg-blue-le border-0 shadow-sm rounded-3">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="text-start">
                <p class="mb-1 text-muted">Medical Leaves</p>
                <h4 class="fw-bold mb-0">11</h4>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md d-flex align-items-center justify-content-center">
                    <i class="ti ti-vaccine fs-32 text-info"></i>
                  </span>
                </div>
              </div>
            </div>
            <span class="badge bg-info-transparent">Remaining Leaves : 01</span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card bg-purple-le border-0 shadow-sm rounded-3">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="text-start">
                <p class="mb-1 text-muted">Casual Leaves</p>
                <h4 class="fw-bold mb-0">02</h4>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md d-flex align-items-center justify-content-center">
                    <i class="ti ti-hexagon-letter-c fs-32 text-purple"></i>
                  </span>
                </div>
              </div>
            </div>
            <span class="badge bg-transparent-purple">Remaining Leaves : 10</span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card bg-pink-le border-0 shadow-sm rounded-3">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="text-start">
                <p class="mb-1 text-muted">Other Leaves</p>
                <h4 class="fw-bold mb-0">07</h4>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-2">
                  <span class="avatar avatar-md d-flex align-items-center justify-content-center">
                    <i class="ti ti-hexagonal-prism-plus fs-32 text-pink"></i>
                  </span>
                </div>
              </div>
            </div>
            <span class="badge bg-pink-transparent">Remaining Leaves : 05</span>
          </div>
        </div>
      </div>
    </div>
    <!-- /Leaves Info -->

    <!-- Leaves list -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 bg-transparent border-bottom py-3">
        <div class="d-flex align-items-center flex-wrap gap-2">
          <h5 class="fw-bold mb-0 me-2">Leave List</h5>
          <span class="badge bg-primary-transparent me-1">Total Leaves : {{ leaveStore.leaveRequests.length * 12 }}</span>
          <span class="badge bg-secondary-transparent">Total Remaining Leaves : 23</span>
        </div>

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 gap-2">
          <!-- Date Range Input -->
          <div class="me-2">
            <div class="input-icon position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-calendar text-gray-9"></i>
              </span>
              <input type="text" class="form-control form-control-sm" placeholder="07/19/2026 - 07/25/2026" style="width: 190px;" />
            </div>
          </div>

          <!-- Leave Type Filter Dropdown -->
          <div class="dropdown me-2">
            <select v-model="leaveStore.leaveTypeFilter" class="form-select form-select-sm" style="width: 140px;">
              <option value="All">Leave Type</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <!-- Approved By Filter Dropdown -->
          <div class="dropdown me-2">
            <select class="form-select form-select-sm" style="width: 140px;">
              <option value="">Approved By</option>
              <option value="Doglas Martini">Doglas Martini</option>
              <option value="Warren Morales">Warren Morales</option>
            </select>
          </div>

          <!-- Select Status Dropdown -->
          <div class="dropdown me-2">
            <select v-model="leaveStore.statusFilter" class="form-select form-select-sm" style="width: 140px;">
              <option value="All">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
              <option value="Pending">New / Pending</option>
            </select>
          </div>

          <!-- Sort Dropdown -->
          <div class="dropdown">
            <select class="form-select form-select-sm" style="width: 150px;">
              <option value="">Sort By : Last 7 Days</option>
              <option value="recent">Recently Added</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Controls Row: Row per page & Search -->
      <div class="card-body border-bottom py-2 px-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div class="d-flex align-items-center gap-2">
          <span class="text-muted fs-7">Row Per Page</span>
          <select class="form-select form-select-sm" style="width: 70px;">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span class="text-muted fs-7">Entries</span>
        </div>

        <div class="input-group input-group-sm" style="width: 220px;">
          <input type="text" v-model="leaveStore.searchQuery" class="form-control" placeholder="Search..." />
          <span class="input-group-text bg-white"><i class="ti ti-search text-muted"></i></span>
        </div>
      </div>

      <!-- Table Body -->
      <div class="card-body p-0">
        <div class="custom-datatable-filter table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="no-sort ps-3" style="width: 40px;">
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" id="select-all" />
                  </div>
                </th>
                <th>Leave Type</th>
                <th>From</th>
                <th>Approved By</th>
                <th>To</th>
                <th>No of Days</th>
                <th>Status</th>
                <th class="text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="leaveStore.filteredLeaves.length === 0">
                <td colspan="8" class="text-center py-5 text-muted">
                  <i class="ti ti-calendar-off fs-1 d-block mb-2 text-secondary"></i>
                  No leave records found matching your selection.
                </td>
              </tr>
              <tr v-for="leave in leaveStore.filteredLeaves" :key="leave.id">
                <td class="ps-3">
                  <div class="form-check form-check-md">
                    <input class="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <p class="fs-14 fw-medium d-flex align-items-center mb-0 text-dark">{{ leave.leaveType }}</p>
                    <a href="javascript:void(0);" class="ms-2" :title="leave.reason || 'I am currently experiencing a fever and feeling unwell.'">
                      <i class="ti ti-info-circle text-info"></i>
                    </a>
                  </div>
                </td>
                <td class="text-muted">{{ leave.fromDate }}</td>
                <td>
                  <div class="d-flex align-items-center file-name-icon">
                    <a href="javascript:void(0);" class="avatar avatar-md border rounded-circle me-2 overflow-hidden" style="width:36px;height:36px;">
                      <img :src="leave.approverAvatar || '/assets/img/profiles/avatar-03.jpg'" class="img-fluid" alt="img" />
                    </a>
                    <div>
                      <h6 class="fw-medium mb-0 text-dark fs-14">{{ leave.approverName || 'Doglas Martini' }}</h6>
                      <span class="fs-12 fw-normal text-muted">{{ leave.approverRole || 'Manager' }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-muted">{{ leave.toDate }}</td>
                <td class="fw-normal text-dark">{{ leave.noOfDays }} Days</td>
                <td>
                  <div class="dropdown">
                    <button
                      class="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center border shadow-xs"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <span
                        :class="[
                          'rounded-circle d-flex justify-content-center align-items-center me-2 p-1',
                          leave.status === 'Approved' ? 'bg-transparent-success' :
                          leave.status === 'Declined' || leave.status === 'Rejected' ? 'bg-transparent-danger' :
                          'bg-transparent-purple'
                        ]"
                      >
                        <i
                          :class="[
                            'ti ti-point-filled',
                            leave.status === 'Approved' ? 'text-success' :
                            leave.status === 'Declined' || leave.status === 'Rejected' ? 'text-danger' :
                            'text-purple'
                          ]"
                        ></i>
                      </span>
                      {{ leave.status === 'Approved' ? 'Approved' : leave.status === 'Declined' || leave.status === 'Rejected' ? 'Declined' : 'New' }}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end p-2 shadow-sm">
                      <li>
                        <a href="javascript:void(0);" class="dropdown-item rounded-1 d-flex align-items-center" @click="leaveStore.updateStatus(leave.id, 'Approved')">
                          <span class="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i class="ti ti-point-filled text-success"></i></span>Approved
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" class="dropdown-item rounded-1 d-flex align-items-center" @click="leaveStore.updateStatus(leave.id, 'Declined')">
                          <span class="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i class="ti ti-point-filled text-danger"></i></span>Declined
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" class="dropdown-item rounded-1 d-flex align-items-center" @click="leaveStore.updateStatus(leave.id, 'Pending')">
                          <span class="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i class="ti ti-point-filled text-purple"></i></span>New
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="text-end pe-3">
                  <div class="action-icon d-inline-flex gap-2">
                    <a href="javascript:void(0);" class="text-muted" title="Edit" @click="openEditModal(leave)"><i class="ti ti-edit fs-16"></i></a>
                    <a href="javascript:void(0);" class="text-muted" title="Delete" @click="confirmDelete(leave.id)"><i class="ti ti-trash fs-16"></i></a>
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
