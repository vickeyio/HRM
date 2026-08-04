<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="User Profile"
      :breadcrumbs="['User', 'Profile']"
      :show-export="false"
    />

    <!-- Profile Header Card -->
    <div class="card border-0 shadow-sm rounded-3 mb-4">
      <div class="card-body p-4">
        <div class="d-flex align-items-center flex-wrap gap-4">
          <span class="avatar avatar-xxl rounded-circle position-relative">
            <img :src="authStore.userAvatar" class="rounded-circle img-fluid border border-3 border-white shadow-sm" alt="User Avatar" />
            <span class="position-absolute bottom-0 end-0 bg-success p-2 border border-2 border-white rounded-circle"></span>
          </span>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <h3 class="fw-bold mb-1 text-dark">{{ authStore.userName }}</h3>
                <p class="text-muted mb-2">Senior HR Administrator &bull; {{ authStore.userRole }}</p>
                <div class="d-flex align-items-center gap-3 text-muted fs-14 flex-wrap">
                  <span><i class="ti ti-mail text-primary me-1"></i>{{ authStore.userEmail }}</span>
                  <span><i class="ti ti-phone text-primary me-1"></i>+1 800 555 0199</span>
                  <span><i class="ti ti-map-pin text-primary me-1"></i>New York, USA</span>
                </div>
              </div>
              <router-link to="/account" class="btn btn-outline-primary btn-sm d-flex align-items-center">
                <i class="ti ti-edit me-1"></i>Edit Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Details & Activity Tabs -->
    <div class="row">
      <div class="col-xl-4 col-lg-5 mb-4">
        <!-- Personal Information Card -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="fw-bold mb-0">Personal Information</h5>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0">
              <li class="d-flex justify-content-between py-2 border-bottom">
                <span class="text-muted">Employee ID</span>
                <span class="fw-semibold text-dark">EMP-001</span>
              </li>
              <li class="d-flex justify-content-between py-2 border-bottom">
                <span class="text-muted">Department</span>
                <span class="fw-semibold text-dark">Human Resources</span>
              </li>
              <li class="d-flex justify-content-between py-2 border-bottom">
                <span class="text-muted">Date of Joining</span>
                <span class="fw-semibold text-dark">15 Jan 2022</span>
              </li>
              <li class="d-flex justify-content-between py-2 border-bottom">
                <span class="text-muted">Employment Status</span>
                <span class="badge bg-success-subtle text-success">Full-Time</span>
              </li>
              <li class="d-flex justify-content-between py-2">
                <span class="text-muted">Direct Manager</span>
                <span class="fw-semibold text-dark">Richard Miles</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Emergency Contacts Card -->
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="fw-bold mb-0">Emergency Contact</h5>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center gap-3">
              <div class="avatar bg-light-primary text-primary rounded-circle p-2">
                <i class="ti ti-user-heart fs-20"></i>
              </div>
              <div>
                <h6 class="fw-semibold mb-0">Eleanor Montero</h6>
                <small class="text-muted d-block">Spouse &bull; +1 800 555 9876</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8 col-lg-7 mb-4">
        <!-- Activity & Log Tabs -->
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="fw-bold mb-0">Recent Activity Log</h5>
          </div>
          <div class="card-body">
            <div class="timeline">
              <div class="d-flex gap-3 mb-4">
                <div class="flex-shrink-0">
                  <span class="avatar avatar-md bg-success-subtle text-success rounded-circle">
                    <i class="ti ti-check"></i>
                  </span>
                </div>
                <div>
                  <h6 class="fw-semibold mb-1">Approved Leave Request for Anthony Lewis</h6>
                  <p class="text-muted small mb-0">Reviewed and approved 3 days Annual Leave request.</p>
                  <small class="text-muted">Today at 10:45 AM</small>
                </div>
              </div>

              <div class="d-flex gap-3 mb-4">
                <div class="flex-shrink-0">
                  <span class="avatar avatar-md bg-primary-subtle text-primary rounded-circle">
                    <i class="ti ti-file-text"></i>
                  </span>
                </div>
                <div>
                  <h6 class="fw-semibold mb-1">Generated Monthly Payslips</h6>
                  <p class="text-muted small mb-0">Batch generated 45 payslips for July 2026 payroll cycle.</p>
                  <small class="text-muted">Yesterday at 4:30 PM</small>
                </div>
              </div>

              <div class="d-flex gap-3">
                <div class="flex-shrink-0">
                  <span class="avatar avatar-md bg-warning-subtle text-warning rounded-circle">
                    <i class="ti ti-lock"></i>
                  </span>
                </div>
                <div>
                  <h6 class="fw-semibold mb-1">Updated Security Settings</h6>
                  <p class="text-muted small mb-0">Changed account password and enabled Two-Factor Authentication.</p>
                  <small class="text-muted">3 days ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import PageHeader from '../../components/common/PageHeader.vue';

const authStore = useAuthStore();
</script>
