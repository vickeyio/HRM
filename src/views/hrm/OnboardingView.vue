<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Employee Onboarding"
      :breadcrumbs="['Core HR', 'Onboarding']"
      add-label="Initiate Onboarding"
      @add="isAddModalOpen = true"
      @export="exportData"
    />

    <!-- Onboarding Overview Metrics -->
    <div class="row mb-4">
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-info">
          <div class="card-body">
            <h6 class="text-muted mb-1">Active Onboardings</h6>
            <h3 class="fw-bold mb-0 text-info">8 <span class="fs-14 fw-normal text-muted">New Hires</span></h3>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-warning">
          <div class="card-body">
            <h6 class="text-muted mb-1">Pending Document Uploads</h6>
            <h3 class="fw-bold mb-0 text-warning">3 <span class="fs-14 fw-normal text-muted">Verification Needed</span></h3>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-success">
          <div class="card-body">
            <h6 class="text-muted mb-1">Completed This Month</h6>
            <h3 class="fw-bold mb-0 text-success">14 <span class="fs-14 fw-normal text-muted">Onboarded</span></h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Onboarding List Table -->
    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="New Hire Onboarding Pipeline"
        v-model:search="searchQuery"
        search-placeholder="Search candidate or department..."
        v-model:status="statusFilter"
        :status-options="['All', 'In Progress', 'Document Verification', 'Completed']"
      />

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th><input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" /></th>
                <th>Employee Name</th>
                <th>Designation & Department</th>
                <th>Joining Date</th>
                <th>Checklist Progress</th>
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
                      <small class="text-muted">{{ item.email }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="fw-medium text-dark d-block">{{ item.role }}</span>
                  <small class="text-muted">{{ item.department }}</small>
                </td>
                <td class="text-muted">{{ item.joiningDate }}</td>
                <td style="min-width: 180px;">
                  <div class="d-flex align-items-center gap-2">
                    <div class="progress flex-grow-1" style="height: 6px;">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="{ width: item.progress + '%' }"
                      ></div>
                    </div>
                    <small class="fw-semibold text-dark">{{ item.progress }}%</small>
                  </div>
                </td>
                <td>
                  <span
                    :class="[
                      'badge',
                      item.status === 'Completed' ? 'bg-success-subtle text-success' :
                      item.status === 'Document Verification' ? 'bg-warning-subtle text-warning' :
                      'bg-info-subtle text-info'
                    ]"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-primary me-1" @click="openChecklist(item)">
                    <i class="ti ti-checklist me-1"></i>Checklist
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Initiate Onboarding Modal -->
    <BaseModal
      v-model="isAddModalOpen"
      title="Initiate New Hire Onboarding"
      save-label="Start Onboarding"
      @save="handleInitiate"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">Employee Name <span class="text-danger">*</span></label>
        <input type="text" v-model="newHire.name" class="form-control" placeholder="e.g. Robert Fox" required />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Email Address <span class="text-danger">*</span></label>
        <input type="email" v-model="newHire.email" class="form-control" placeholder="robert@company.com" required />
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label fw-semibold">Role / Designation</label>
          <input type="text" v-model="newHire.role" class="form-control" placeholder="UI/UX Designer" />
        </div>
        <div class="col-6">
          <label class="form-label fw-semibold">Department</label>
          <select v-model="newHire.department" class="form-select">
            <option>Application Development</option>
            <option>Finance</option>
            <option>Sales & Marketing</option>
            <option>Human Resources</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Joining Date</label>
        <input type="date" v-model="newHire.joiningDate" class="form-control" />
      </div>
    </BaseModal>

    <!-- Onboarding Task Checklist Modal -->
    <BaseModal
      v-if="selectedHire"
      v-model="isChecklistOpen"
      :title="'Onboarding Checklist: ' + selectedHire.name"
      save-label="Update Progress"
      @save="isChecklistOpen = false"
    >
      <div class="list-group list-group-flush">
        <div class="list-group-item p-3">
          <div class="form-check form-switch mb-0">
            <input class="form-check-input" type="checkbox" id="check1" checked />
            <label class="form-check-label fw-semibold ms-2" for="check1">Identity Document & Passport Collection</label>
          </div>
        </div>
        <div class="list-group-item p-3">
          <div class="form-check form-switch mb-0">
            <input class="form-check-input" type="checkbox" id="check2" checked />
            <label class="form-check-label fw-semibold ms-2" for="check2">Tax & Direct Deposit Authorization Forms</label>
          </div>
        </div>
        <div class="list-group-item p-3">
          <div class="form-check form-switch mb-0">
            <input class="form-check-input" type="checkbox" id="check3" />
            <label class="form-check-label fw-semibold ms-2" for="check3">IT Hardware & Laptop Device Issue</label>
          </div>
        </div>
        <div class="list-group-item p-3">
          <div class="form-check form-switch mb-0">
            <input class="form-check-input" type="checkbox" id="check4" />
            <label class="form-check-label fw-semibold ms-2" for="check4">Company Email & Slack Account Creation</label>
          </div>
        </div>
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

const isAddModalOpen = ref(false);
const isChecklistOpen = ref(false);
const selectedHire = ref(null);

const newHires = ref([
  { id: 1, name: 'Robert Fox', email: 'robert@company.com', role: 'Senior React Developer', department: 'Application Development', joiningDate: '15 Aug 2026', progress: 75, status: 'In Progress', avatar: '/assets/img/profiles/avatar-02.jpg' },
  { id: 2, name: 'Jenny Wilson', email: 'jenny@company.com', role: 'UI/UX Designer', department: 'Application Development', joiningDate: '18 Aug 2026', progress: 50, status: 'Document Verification', avatar: '/assets/img/profiles/avatar-05.jpg' },
  { id: 3, name: 'Cody Fisher', email: 'cody@company.com', role: 'Financial Analyst', department: 'Finance', joiningDate: '01 Aug 2026', progress: 100, status: 'Completed', avatar: '/assets/img/profiles/avatar-09.jpg' }
]);

const { searchQuery, statusFilter, selectedIds, displayedItems, isAllSelected, toggleSelectAll, exportData } =
  useCrudTable(newHires, { searchFields: ['name', 'role', 'department', 'email'] });

const newHire = ref({
  name: '',
  email: '',
  role: '',
  department: 'Application Development',
  joiningDate: new Date().toISOString().split('T')[0]
});

function openChecklist(hire) {
  selectedHire.value = hire;
  isChecklistOpen.value = true;
}

function handleInitiate() {
  if (!newHire.value.name) return;
  newHires.value.unshift({
    id: Date.now(),
    name: newHire.value.name,
    email: newHire.value.email,
    role: newHire.value.role || 'New Team Member',
    department: newHire.value.department,
    joiningDate: newHire.value.joiningDate,
    progress: 25,
    status: 'In Progress',
    avatar: '/assets/img/profiles/avatar-12.jpg'
  });
  newHire.value.name = '';
  newHire.value.email = '';
  isAddModalOpen.value = false;
  alert('Onboarding process initiated!');
}
</script>
