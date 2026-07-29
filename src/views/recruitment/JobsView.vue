<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Jobs List</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Recruitment</li>
            <li class="breadcrumb-item active" aria-current="page">Jobs</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="mb-2 me-2">
          <button class="btn btn-primary d-flex align-items-center" @click="openAddJobModal">
            <i class="ti ti-circle-plus me-2"></i>Add New Job
          </button>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="row">
      <div class="col-xl-3 col-md-6 d-flex mb-3" v-for="job in jobsList" :key="job.id">
        <div class="card flex-fill">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="d-flex align-items-center">
                <span class="avatar avatar-md bg-light p-1 rounded me-2">
                  <img :src="job.icon" class="img-fluid" alt="icon" @error="handleImgError">
                </span>
                <div>
                  <h6 class="mb-0 fs-14 fw-semibold">{{ job.title }}</h6>
                  <span class="text-muted fs-12">{{ job.department }}</span>
                </div>
              </div>
              <span :class="['badge', job.status === 'Active' ? 'bg-success-transparent text-success' : 'bg-danger-transparent text-danger']">
                {{ job.status }}
              </span>
            </div>
            <p class="fs-13 text-muted mb-3">{{ job.description }}</p>
            <div class="d-flex align-items-center justify-content-between pt-2 border-top">
              <span class="fs-12 text-muted"><i class="ti ti-users me-1"></i>{{ job.applicants }} Applicants</span>
              <span class="fs-12 fw-medium text-dark"><i class="ti ti-clock me-1"></i>{{ job.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const jobsList = ref([
  { id: 1, title: 'Senior iOS Developer', department: 'Mobile Development', status: 'Active', description: 'Seeking expert iOS Developer with 5+ years of Swift and SwiftUI experience.', applicants: 25, type: 'Full Time', icon: '/assets/img/icons/apple.svg' },
  { id: 2, title: 'Junior PHP Developer', department: 'Backend Web', status: 'Active', description: 'Looking for enthusiastic PHP developer skilled in Laravel Framework.', applicants: 20, type: 'Full Time', icon: '/assets/img/icons/php.svg' },
  { id: 3, title: 'Junior React Developer', department: 'Frontend Web', status: 'Active', description: 'Frontend engineer proficient in React, Vue, and modern JavaScript.', applicants: 30, type: 'Contract', icon: '/assets/img/icons/react.svg' },
  { id: 4, title: 'Senior Laravel Developer', department: 'Enterprise Software', status: 'Closed', description: 'Lead engineer for microservices architecture and cloud API integrations.', applicants: 40, type: 'Full Time', icon: '/assets/img/icons/laravel-icon.svg' }
]);

function handleImgError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=Job&background=0D8ABC&color=fff';
}

function openAddJobModal() {
  alert('Opening Add Job Modal...');
}
</script>
