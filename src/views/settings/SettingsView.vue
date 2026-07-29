<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Settings</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Administration</li>
            <li class="breadcrumb-item active" aria-current="page">Settings</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="card">
      <div class="card-body">
        <!-- Navigation Tabs -->
        <ul class="nav nav-tabs nav-tabs-bottom mb-4">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'profile' }" href="javascript:void(0);" @click="activeTab = 'profile'">
              <i class="ti ti-user me-1"></i>Profile Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'company' }" href="javascript:void(0);" @click="activeTab = 'company'">
              <i class="ti ti-building me-1"></i>Company Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'notifications' }" href="javascript:void(0);" @click="activeTab = 'notifications'">
              <i class="ti ti-bell me-1"></i>Notifications
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'security' }" href="javascript:void(0);" @click="activeTab = 'security'">
              <i class="ti ti-shield-lock me-1"></i>Security
            </a>
          </li>
        </ul>

        <!-- Profile Tab Content -->
        <div v-if="activeTab === 'profile'">
          <form @submit.prevent="saveSettings">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">First Name</label>
                <input type="text" class="form-control" v-model="profile.firstName">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-control" v-model="profile.lastName">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" v-model="profile.email">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Phone Number</label>
                <input type="text" class="form-control" v-model="profile.phone">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save Profile</button>
          </form>
        </div>

        <!-- Company Tab Content -->
        <div v-else-if="activeTab === 'company'">
          <form @submit.prevent="saveSettings">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Company Name</label>
                <input type="text" class="form-control" v-model="company.name">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Contact Person</label>
                <input type="text" class="form-control" v-model="company.contactPerson">
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label">Address</label>
                <input type="text" class="form-control" v-model="company.address">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">City</label>
                <input type="text" class="form-control" v-model="company.city">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Country</label>
                <input type="text" class="form-control" v-model="company.country">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save Company Info</button>
          </form>
        </div>

        <!-- Notifications Tab -->
        <div v-else-if="activeTab === 'notifications'">
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="emailNotif" v-model="notifications.email">
            <label class="form-check-label" for="emailNotif">Email Notifications for Leave Requests</label>
          </div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="payrollNotif" v-model="notifications.payroll">
            <label class="form-check-label" for="payrollNotif">Monthly Payroll Generation Alert</label>
          </div>
          <button class="btn btn-primary mt-2" @click="saveSettings">Save Preferences</button>
        </div>

        <!-- Security Tab -->
        <div v-else-if="activeTab === 'security'">
          <form @submit.prevent="saveSettings">
            <div class="mb-3">
              <label class="form-label">Current Password</label>
              <input type="password" class="form-control" v-model="security.currentPassword">
            </div>
            <div class="mb-3">
              <label class="form-label">New Password</label>
              <input type="password" class="form-control" v-model="security.newPassword">
            </div>
            <button type="submit" class="btn btn-primary">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('profile');

const profile = ref({
  firstName: 'Anthony',
  lastName: 'Lewis',
  email: 'anthony@smarthr.co.in',
  phone: '+1 987 654 3210'
});

const company = ref({
  name: 'SmartHR SaaS Technologies',
  contactPerson: 'Anthony Lewis',
  address: '3099 Kennedy Court',
  city: 'Framingham',
  country: 'United States'
});

const notifications = ref({
  email: true,
  payroll: true
});

const security = ref({
  currentPassword: '',
  newPassword: ''
});

function saveSettings() {
  alert('Settings saved successfully!');
}
</script>
