<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Account Settings"
      :breadcrumbs="['User', 'Account Settings']"
      :show-export="false"
    />

    <div class="row">
      <div class="col-xl-8 col-lg-10 mx-auto">
        <!-- Security Settings Card -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="fw-bold mb-0"><i class="ti ti-lock text-primary me-2"></i>Change Password</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handlePasswordChange">
              <div class="mb-3">
                <label class="form-label fw-semibold">Current Password</label>
                <input type="password" v-model="currentPassword" class="form-control" placeholder="••••••••" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">New Password</label>
                <input type="password" v-model="newPassword" class="form-control" placeholder="••••••••" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Confirm New Password</label>
                <input type="password" v-model="confirmPassword" class="form-control" placeholder="••••••••" required />
              </div>
              <button type="submit" class="btn btn-primary">Update Password</button>
            </form>
          </div>
        </div>

        <!-- Preferences Card -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-header bg-transparent border-bottom">
            <h5 class="fw-bold mb-0"><i class="ti ti-bell text-primary me-2"></i>Notification Preferences</h5>
          </div>
          <div class="card-body">
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="emailNotif" v-model="emailNotif" />
              <label class="form-check-label fw-medium" for="emailNotif">Email Notifications for Leave Requests</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="smsNotif" v-model="smsNotif" />
              <label class="form-check-label fw-medium" for="smsNotif">SMS Alerts for Payroll Updates</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="twoFactor" v-model="twoFactor" />
              <label class="form-check-label fw-medium" for="twoFactor">Enable Two-Factor Authentication (2FA)</label>
            </div>
            <button class="btn btn-primary" @click="savePreferences">Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const emailNotif = ref(true);
const smsNotif = ref(false);
const twoFactor = ref(true);

function handlePasswordChange() {
  if (newPassword.value !== confirmPassword.value) {
    alert('New passwords do not match');
    return;
  }
  alert('Password updated successfully!');
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
}

function savePreferences() {
  alert('Notification preferences updated!');
}
</script>
