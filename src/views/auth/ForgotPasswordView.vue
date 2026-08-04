<template>
  <form @submit.prevent="handleReset" class="vh-100">
    <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
      <div class="mx-auto mb-4 text-center">
        <img src="/assets/img/logo.svg" class="img-fluid" alt="Logo" style="max-height: 45px;" />
      </div>

      <div>
        <div class="text-center mb-3">
          <h2 class="mb-2">Forgot Password?</h2>
          <p class="mb-0 text-muted">Enter your email address and we'll send you a password reset link.</p>
        </div>

        <div v-if="submitted" class="alert alert-success py-2 small mb-3">
          Password reset instructions have been sent to your email!
        </div>

        <div class="mb-3">
          <label class="form-label">Email Address</label>
          <div class="input-group">
            <input type="email" v-model="email" class="form-control border-end-0" placeholder="admin@smarthr.co.in" required />
            <span class="input-group-text border-start-0">
              <i class="ti ti-mail"></i>
            </span>
          </div>
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            Send Reset Link
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-primary fw-semibold d-inline-flex align-items-center">
            <i class="ti ti-arrow-left me-1"></i> Back to Sign In
          </router-link>
        </div>
      </div>

      <div class="mt-4 pb-4 text-center">
        <p class="mb-0 text-gray-9 small">Copyright &copy; 2026 - SmartHR Portal</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
const submitted = ref(false);

function handleReset() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    submitted.value = true;
  }, 1000);
}
</script>
