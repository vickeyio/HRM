<template>
  <!-- Header -->
  <div class="header">
    <div class="main-header">
      <!-- Header Left (Logo) -->
      <div class="header-left">
        <router-link to="/" class="logo logo-normal">
          <img src="/assets/img/logo.svg" alt="Logo" />
        </router-link>
        <router-link to="/" class="logo-small">
          <img src="/assets/img/logo-small.svg" alt="Logo" />
        </router-link>
        <router-link to="/" class="dark-logo">
          <img src="/assets/img/logo-white.svg" alt="Logo" />
        </router-link>
      </div>

      <!-- Mobile Button -->
      <a id="mobile_btn" class="mobile_btn" href="javascript:void(0);" @click="sidebarStore.toggleMobile">
        <span class="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>

      <!-- Header User / Right Section -->
      <div class="header-user">
        <div class="nav user-menu nav-list">
          <div class="me-auto d-flex align-items-center" id="header-search">
            <!-- Sidebar Toggle Button -->
            <a id="toggle_btn" href="javascript:void(0);" class="btn btn-menubar me-2" @click="sidebarStore.toggleSidebar">
              <i class="ti ti-arrow-bar-to-left"></i>
            </a>

            <!-- Search -->
            <div class="input-group input-group-flat d-inline-flex me-2">
              <input type="text" class="form-control" placeholder="Search in HRMS" />
              <span class="input-group-text">
                <kbd>CTRL + / </kbd>
              </span>
            </div>

            <!-- CRM Dropdown -->
            <div class="dropdown crm-dropdown">
              <a href="javascript:void(0);" class="btn btn-menubar me-2" data-bs-toggle="dropdown">
                <i class="ti ti-layout-grid"></i>
              </a>
              <div class="dropdown-menu dropdown-lg dropdown-menu-start">
                <div class="card mb-0 border-0 shadow-none">
                  <div class="card-header">
                    <h4>CRM</h4>
                  </div>
                  <div class="card-body pb-1">
                    <div class="row">
                      <div class="col-sm-6">
                        <router-link to="/contacts" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                          <span class="d-flex align-items-center me-3">
                            <i class="ti ti-user-shield text-default me-2"></i>Contacts
                          </span>
                          <i class="ti ti-arrow-right"></i>
                        </router-link>
                        <router-link to="/deals" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                          <span class="d-flex align-items-center me-3">
                            <i class="ti ti-heart-handshake text-default me-2"></i>Deals
                          </span>
                          <i class="ti ti-arrow-right"></i>
                        </router-link>
                        <router-link to="/pipeline" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                          <span class="d-flex align-items-center me-3">
                            <i class="ti ti-timeline-event-text text-default me-2"></i>Pipeline
                          </span>
                          <i class="ti ti-arrow-right"></i>
                        </router-link>
                      </div>
                      <div class="col-sm-6">
                        <router-link to="/companies" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                          <span class="d-flex align-items-center me-3">
                            <i class="ti ti-building text-default me-2"></i>Companies
                          </span>
                          <i class="ti ti-arrow-right"></i>
                        </router-link>
                        <router-link to="/leads" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                          <span class="d-flex align-items-center me-3">
                            <i class="ti ti-user-check text-default me-2"></i>Leads
                          </span>
                          <i class="ti ti-arrow-right"></i>
                        </router-link>
                        <router-link to="/activity" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                          <span class="d-flex align-items-center me-3">
                            <i class="ti ti-activity text-default me-2"></i>Activities
                          </span>
                          <i class="ti ti-arrow-right"></i>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Settings Shortcut Button -->
            <router-link to="/settings" class="btn btn-menubar">
              <i class="ti ti-settings-cog"></i>
            </router-link>
          </div>

          <!-- Right side items -->
          <div class="d-flex align-items-center">
            <div class="me-1">
              <a href="javascript:void(0);" class="btn btn-menubar" @click="toggleFullscreen">
                <i class="ti ti-maximize"></i>
              </a>
            </div>
            <div class="me-1">
              <router-link to="/chat" class="btn btn-menubar position-relative">
                <i class="ti ti-message"></i>
                <span class="msg-status-dot"></span>
              </router-link>
            </div>
            <div class="me-1">
              <router-link to="/email" class="btn btn-menubar">
                <i class="ti ti-mail"></i>
              </router-link>
            </div>
            <div class="me-2 notification_item">
              <a href="javascript:void(0);" class="btn btn-menubar position-relative me-1" data-bs-toggle="dropdown">
                <i class="ti ti-bell"></i>
                <span class="notification-status-dot"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end notification-dropdown p-4">
                <div class="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                  <h4 class="notification-title">Notifications (2)</h4>
                  <a href="javascript:void(0);" class="text-primary fs-15 me-3 lh-1">Mark all as read</a>
                </div>
                <div class="noti-content">
                  <div class="d-flex flex-column">
                    <div class="border-bottom mb-3 pb-3">
                      <router-link to="/activity">
                        <div class="d-flex">
                          <span class="avatar avatar-lg me-2 flex-shrink-0">
                            <img src="/assets/img/profiles/avatar-27.jpg" alt="Profile" />
                          </span>
                          <div class="flex-grow-1">
                            <p class="mb-1"><span class="text-dark fw-semibold">Shawn</span> performance in Math is below threshold.</p>
                            <span>Just Now</span>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Dropdown -->
            <div class="dropdown profile-dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                <span class="avatar avatar-md online">
                  <img :src="authStore.userAvatar" alt="Img" class="img-fluid rounded-circle" />
                </span>
              </a>
              <div class="dropdown-menu shadow-none">
                <div class="card mb-0">
                  <div class="card-header">
                    <div class="d-flex align-items-center">
                      <span class="avatar avatar-lg me-2 avatar-rounded">
                        <img :src="authStore.userAvatar" alt="img" />
                      </span>
                      <div>
                        <h5 class="mb-0">{{ authStore.userName }}</h5>
                        <p class="fs-12 fw-medium mb-0 text-muted">{{ authStore.userEmail }}</p>
                        <span class="badge bg-primary-subtle text-primary badge-xs mt-1">{{ authStore.userRole }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2" to="/profile">
                      <i class="ti ti-user-circle me-1"></i>My Profile
                    </router-link>
                    <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2" to="/settings">
                      <i class="ti ti-settings me-1"></i>Settings
                    </router-link>
                    <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2" to="/account">
                      <i class="ti ti-circle-arrow-up me-1"></i>My Account
                    </router-link>
                  </div>
                  <div class="card-footer">
                    <a class="dropdown-item d-inline-flex align-items-center p-0 py-2 text-danger" href="javascript:void(0);" @click="handleLogout">
                      <i class="ti ti-login me-2"></i>Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div class="dropdown mobile-user-menu">
        <a href="javascript:void(0);" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa fa-ellipsis-v"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <router-link class="dropdown-item" to="/profile">My Profile</router-link>
          <router-link class="dropdown-item" to="/settings">Settings</router-link>
          <a class="dropdown-item text-danger" href="javascript:void(0);" @click="handleLogout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSidebarStore } from '../../stores/sidebar';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const sidebarStore = useSidebarStore();
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
</script>
