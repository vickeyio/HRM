<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Candidates List</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Recruitment</li>
            <li class="breadcrumb-item active" aria-current="page">Candidates</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="mb-2">
          <button class="btn btn-white d-inline-flex align-items-center" @click="exportCandidates">
            <i class="ti ti-file-export me-1"></i>Export
          </button>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Candidates Applications</h5>
        <div class="d-flex align-items-center flex-wrap row-gap-3">
          <div class="me-3">
            <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Candidate...">
          </div>
          <div class="dropdown me-3">
            <button class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
              Status: {{ selectedStatus || 'All' }}
            </button>
            <ul class="dropdown-menu">
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedStatus = ''">All</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedStatus = 'Scheduled'">Scheduled</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedStatus = 'Interviewed'">Interviewed</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedStatus = 'Offered'">Offered</a></li>
              <li><a href="javascript:void(0);" class="dropdown-item" @click="selectedStatus = 'Hired'">Hired</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Cand ID</th>
                <th>Candidate</th>
                <th>Applied Role</th>
                <th>Phone</th>
                <th>Applied Date</th>
                <th>Resume</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cand in filteredCandidates" :key="cand.candId">
                <td><span class="fw-medium text-primary">{{ cand.candId }}</span></td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="cand.avatar" class="avatar avatar-md rounded-circle me-2" alt="img" @error="handleImgError">
                    <div>
                      <h6 class="mb-0 fs-14 fw-medium">{{ cand.name }}</h6>
                      <span class="text-muted fs-12">{{ cand.email }}</span>
                    </div>
                  </div>
                </td>
                <td>{{ cand.role }}</td>
                <td>{{ cand.phone }}</td>
                <td>{{ cand.appliedDate }}</td>
                <td>
                  <a href="javascript:void(0);" class="btn btn-sm btn-light" @click="downloadResume(cand.name)">
                    <i class="ti ti-file-text me-1"></i>Resume
                  </a>
                </td>
                <td>
                  <span :class="['badge border', getStatusBadge(cand.status)]">
                    <i class="ti ti-point-filled me-1"></i>{{ cand.status }}
                  </span>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-icon btn-light text-danger" @click="deleteCandidate(cand.candId)">
                    <i class="ti ti-trash"></i>
                  </button>
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
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedStatus = ref('');

const candidates = ref([
  { candId: 'Cand-001', name: 'Harold Gaynor', email: 'harold@example.com', role: 'Accountant', phone: '(146) 8964 278', appliedDate: '12 Sep 2024', status: 'Sent', avatar: '/assets/img/users/user-01.jpg' },
  { candId: 'Cand-002', name: 'Sandra Ornellas', email: 'sandra@example.com', role: 'App Developer', phone: '(148) 9648 218', appliedDate: '24 Oct 2024', status: 'Scheduled', avatar: '/assets/img/users/user-34.jpg' },
  { candId: 'Cand-003', name: 'John Harris', email: 'john@example.com', role: 'Technician', phone: '(196) 2348 947', appliedDate: '18 Feb 2024', status: 'Interviewed', avatar: '/assets/img/users/user-09.jpg' },
  { candId: 'Cand-004', name: 'Carole Langan', email: 'carole@example.com', role: 'Web Developer', phone: '(138) 6487 295', appliedDate: '17 Oct 2024', status: 'Offered', avatar: '/assets/img/users/user-26.jpg' }
]);

const filteredCandidates = computed(() => {
  return candidates.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || c.candId.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = !selectedStatus.value || c.status.toLowerCase() === selectedStatus.value.toLowerCase();
    return matchesSearch && matchesStatus;
  });
});

function getStatusBadge(status) {
  switch (status) {
    case 'Scheduled': return 'border-pink text-pink';
    case 'Interviewed': return 'border-info text-info';
    case 'Offered': return 'border-warning text-warning';
    case 'Hired': return 'border-success text-success';
    default: return 'border-purple text-purple';
  }
}

function handleImgError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff';
}

function exportCandidates() {
  alert('Exporting candidate pipeline...');
}

function downloadResume(name) {
  alert(`Downloading resume for ${name}...`);
}

function deleteCandidate(id) {
  if (confirm(`Remove candidate ${id}?`)) {
    candidates.value = candidates.value.filter(c => c.candId !== id);
  }
}
</script>
