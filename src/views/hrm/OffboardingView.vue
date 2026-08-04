<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Employee Offboarding"
      :breadcrumbs="['Core HR', 'Offboarding']"
      add-label="Initiate Offboarding"
      @add="isResignationModalOpen = true"
      @export="exportData"
    />

    <!-- Offboarding Metrics -->
    <div class="row mb-4">
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-warning">
          <div class="card-body">
            <h6 class="text-muted mb-1">Pending Resignations</h6>
            <h3 class="fw-bold mb-0 text-warning">4 <span class="fs-14 fw-normal text-muted">Notice Active</span></h3>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-info">
          <div class="card-body">
            <h6 class="text-muted mb-1">Exit Interviews Due</h6>
            <h3 class="fw-bold mb-0 text-info">2 <span class="fs-14 fw-normal text-muted">Interviews Scheduled</span></h3>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-success">
          <div class="card-body">
            <h6 class="text-muted mb-1">Cleared This Month</h6>
            <h3 class="fw-bold mb-0 text-success">6 <span class="fs-14 fw-normal text-muted">Offboarded</span></h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Offboarding Queue Table -->
    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="Resignation & Termination Requests"
        v-model:search="searchQuery"
        search-placeholder="Search employee..."
        v-model:status="statusFilter"
        :status-options="['All', 'Notice Period', 'Exit Interview', 'Cleared']"
      />

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th><input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" /></th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Resignation Date</th>
                <th>Last Working Day</th>
                <th>Reason</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in displayedItems" :key="item.id">
                <td><input type="checkbox" :value="item.id" v-model="selectedIds" /></td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="item.avatar" class="rounded-circle me-2" width="36" height="36" alt="avatar" />
                    <div>
                      <h6 class="mb-0 fw-semibold text-dark">{{ item.name }}</h6>
                      <small class="text-muted">{{ item.role }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ item.department }}</td>
                <td class="text-muted">{{ item.resignationDate }}</td>
                <td class="fw-semibold text-dark">{{ item.lastWorkingDay }}</td>
                <td><span class="text-truncate d-inline-block" style="max-width: 160px;" :title="item.reason">{{ item.reason }}</span></td>
                <td>
                  <span
                    :class="[
                      'badge',
                      item.status === 'Cleared' ? 'bg-success-subtle text-success' :
                      item.status === 'Exit Interview' ? 'bg-info-subtle text-info' :
                      'bg-warning-subtle text-warning'
                    ]"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-info me-1" @click="openExitInterview(item)">
                    <i class="ti ti-message-dots me-1"></i>Exit Review
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Initiate Offboarding Modal -->
    <BaseModal
      v-model="isResignationModalOpen"
      title="Initiate Employee Offboarding"
      save-label="Submit Resignation"
      @save="handleSubmitResignation"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">Select Employee <span class="text-danger">*</span></label>
        <input type="text" v-model="offboardForm.name" class="form-control" placeholder="e.g. Leslie Alexander" required />
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label fw-semibold">Resignation Date</label>
          <input type="date" v-model="offboardForm.resignationDate" class="form-control" />
        </div>
        <div class="col-6">
          <label class="form-label fw-semibold">Last Working Day</label>
          <input type="date" v-model="offboardForm.lastWorkingDay" class="form-control" />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Reason for Departure</label>
        <textarea v-model="offboardForm.reason" class="form-control" rows="3" placeholder="Better career opportunity / relocation..."></textarea>
      </div>
    </BaseModal>

    <!-- Exit Interview Questionnaire Modal -->
    <BaseModal
      v-if="selectedEmployee"
      v-model="isExitModalOpen"
      :title="'Exit Interview: ' + selectedEmployee.name"
      save-label="Complete Exit Clearance"
      @save="completeClearance"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">Primary Reason for Leaving</label>
        <select class="form-select">
          <option>Better Opportunity / Compensation</option>
          <option>Personal / Family Relocation</option>
          <option>Career Change</option>
          <option>Workplace Culture</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Company Asset Recovery</label>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="asset1" checked />
          <label class="form-check-label" for="asset1">Laptop & Power Charger Returned</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="asset2" checked />
          <label class="form-check-label" for="asset2">Security Access Card Returned</label>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Interviewer Feedback Notes</label>
        <textarea class="form-control" rows="3" placeholder="Overall departure feedback and notes..."></textarea>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import BaseModal from '../../components/common/BaseModal.vue';
import { useCrudTable } from '../../composables/useCrudTable';

const isResignationModalOpen = ref(false);
const isExitModalOpen = ref(false);
const selectedEmployee = ref(null);

const resignations = ref([
  { id: 1, name: 'Leslie Alexander', role: 'DevOps Engineer', department: 'IT Management', resignationDate: '20 Jul 2026', lastWorkingDay: '20 Aug 2026', reason: 'Career opportunity elsewhere', status: 'Notice Period', avatar: '/assets/img/profiles/avatar-04.jpg' },
  { id: 2, name: 'Guy Hawkins', role: 'Marketing Specialist', department: 'Sales & Marketing', resignationDate: '15 Jul 2026', lastWorkingDay: '15 Aug 2026', reason: 'Relocation to UK', status: 'Exit Interview', avatar: '/assets/img/profiles/avatar-07.jpg' },
  { id: 3, name: 'Esther Howard', role: 'Account Executive', department: 'Finance', resignationDate: '01 Jun 2026', lastWorkingDay: '01 Jul 2026', reason: 'Further Education', status: 'Cleared', avatar: '/assets/img/profiles/avatar-08.jpg' }
]);

const { searchQuery, statusFilter, selectedIds, displayedItems, isAllSelected, toggleSelectAll, exportData } =
  useCrudTable(resignations, { searchFields: ['name', 'role', 'department', 'reason'] });

const offboardForm = ref({
  name: '',
  resignationDate: new Date().toISOString().split('T')[0],
  lastWorkingDay: '',
  reason: ''
});

function openExitInterview(item) {
  selectedEmployee.value = item;
  isExitModalOpen.value = true;
}

function completeClearance() {
  if (selectedEmployee.value) {
    selectedEmployee.value.status = 'Cleared';
  }
  isExitModalOpen.value = false;
  alert('Exit clearance completed successfully!');
}

function handleSubmitResignation() {
  if (!offboardForm.value.name) return;
  resignations.value.unshift({
    id: Date.now(),
    name: offboardForm.value.name,
    role: 'Employee',
    department: 'General',
    resignationDate: offboardForm.value.resignationDate,
    lastWorkingDay: offboardForm.value.lastWorkingDay || 'In 30 Days',
    reason: offboardForm.value.reason || 'Personal reasons',
    status: 'Notice Period',
    avatar: '/assets/img/profiles/avatar-12.jpg'
  });
  offboardForm.value.name = '';
  isResignationModalOpen.value = false;
  alert('Offboarding process initiated!');
}
</script>
