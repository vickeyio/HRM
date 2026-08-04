<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="My Leave Allocation & Balance"
      :breadcrumbs="['ESS', 'My Leaves']"
      add-label="Apply Leave"
      @add="isModalOpen = true"
    />

    <!-- Leave Balance Summary Cards -->
    <div class="row mb-4">
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-primary">
          <div class="card-body">
            <h6 class="text-muted mb-1">Annual Leave</h6>
            <h3 class="fw-bold mb-0 text-primary">12 <span class="fs-14 fw-normal text-muted">/ 18 Days Left</span></h3>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-success">
          <div class="card-body">
            <h6 class="text-muted mb-1">Medical Leave</h6>
            <h3 class="fw-bold mb-0 text-success">8 <span class="fs-14 fw-normal text-muted">/ 12 Days Left</span></h3>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-warning">
          <div class="card-body">
            <h6 class="text-muted mb-1">Casual Leave</h6>
            <h3 class="fw-bold mb-0 text-warning">4 <span class="fs-14 fw-normal text-muted">/ 6 Days Left</span></h3>
          </div>
        </div>
      </div>
    </div>

    <!-- My Leave Applications Table -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom">
        <h5 class="fw-bold mb-0">My Submitted Leave Requests</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leave in myLeaves" :key="leave.id">
                <td class="fw-semibold text-dark">{{ leave.type }}</td>
                <td>{{ leave.from }}</td>
                <td>{{ leave.to }}</td>
                <td><span class="badge bg-light text-dark border">{{ leave.days }} Days</span></td>
                <td>{{ leave.reason }}</td>
                <td>
                  <span :class="['badge', leave.status === 'Approved' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning']">
                    {{ leave.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Apply Leave Modal -->
    <BaseModal
      v-model="isModalOpen"
      title="Apply For Leave"
      save-label="Submit Request"
      @save="handleApply"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">Leave Type</label>
        <select v-model="newLeave.type" class="form-select">
          <option>Annual Leave</option>
          <option>Medical Leave</option>
          <option>Casual Leave</option>
        </select>
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label fw-semibold">From Date</label>
          <input type="date" v-model="newLeave.from" class="form-control" />
        </div>
        <div class="col-6">
          <label class="form-label fw-semibold">To Date</label>
          <input type="date" v-model="newLeave.to" class="form-control" />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Reason</label>
        <textarea v-model="newLeave.reason" class="form-control" rows="3" placeholder="Brief reason..."></textarea>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';
import BaseModal from '../../components/common/BaseModal.vue';

const isModalOpen = ref(false);

const myLeaves = ref([
  { id: 1, type: 'Annual Leave', from: '10 Aug 2026', to: '12 Aug 2026', days: 3, reason: 'Family vacation', status: 'Approved' },
  { id: 2, type: 'Medical Leave', from: '15 Jul 2026', to: '15 Jul 2026', days: 1, reason: 'Dental checkup', status: 'Approved' }
]);

const newLeave = ref({
  type: 'Annual Leave',
  from: '',
  to: '',
  reason: ''
});

function handleApply() {
  myLeaves.value.unshift({
    id: Date.now(),
    type: newLeave.value.type,
    from: newLeave.value.from || '20 Aug 2026',
    to: newLeave.value.to || '21 Aug 2026',
    days: 2,
    reason: newLeave.value.reason || 'Personal matters',
    status: 'Pending'
  });
  isModalOpen.value = false;
  alert('Leave request submitted!');
}
</script>
