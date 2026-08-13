<template>
  <form @submit.prevent="handleReset" class="vh-100">
    <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
      <div class="mx-auto mb-4 text-center">
        <img src="/assets/img/logo.svg" class="img-fluid" alt="SmartHR Logo" style="max-height: 48px;" />
      </div>

      <div class="mx-auto w-100" style="max-width: 440px;">
        <div class="text-center mb-4">
          <h2 class="mb-2 fw-bold text-dark fs-24">Forgot Password?</h2>
          <p class="mb-0 text-muted fs-14">Enter your username or email and we'll send you a reset link.</p>
        </div>

        <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-3" role="alert">
          <i class="ti ti-circle-check me-1"></i>
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small mb-3" role="alert">
          <i class="ti ti-alert-circle me-1"></i>
          {{ errorMessage }}
        </div>

        <!-- Username / Email Input -->
        <div class="mb-3">
          <label class="form-label text-dark fw-medium fs-14 mb-1">Username or Email Address</label>
          <div class="input-group has-validation">
            <input
              type="text"
              v-model="username"
              class="form-control border-end-0 py-2"
              :class="{ 'is-invalid': !!fieldError('username') || !!fieldError('email') }"
              placeholder="e.g. admin or admin@smarthr.co.in"
              required
              :disabled="loading"
              @input="clearErrors"
            />
            <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('username') || !!fieldError('email') }">
              <i class="ti ti-mail"></i>
            </span>
            <div v-if="fieldError('username') || fieldError('email')" class="invalid-feedback d-block">
              {{ fieldError('username') || fieldError('email') }}
            </div>
          </div>
        </div>

        <div class="mb-3">
          <button
            type="submit"
            class="btn w-100 py-2 text-white fw-bold shadow-sm"
            style="background-color: #f26522; border-color: #f26522;"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            Send Reset Link
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-danger text-decoration-none fw-semibold d-inline-flex align-items-center fs-14">
            <i class="ti ti-arrow-left me-1"></i> Back to Sign In
          </router-link>
        </div>
      </div>

      <div class="mt-4 pb-3 text-center">
        <p class="mb-0 text-muted fs-13">Copyright &copy; 2026 - Smarthr</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useAlertStore } from '../../stores/alert';
import { parseBackendError } from '../../utils/apiResponseHelper';

const authStore = useAuthStore();
const alertStore = useAlertStore();

const username = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const fieldErrors = ref({});

function fieldError(key) {
  const val = fieldErrors.value?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

function clearErrors() {
  fieldErrors.value = {};
  errorMessage.value = '';
}

async function handleReset() {
  if (!username.value.trim()) return;

  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  fieldErrors.value = {};

  try {
    const res = await authStore.requestPasswordReset(username.value.trim());
    const msg =
      res?.dataPayload?.alertify?.message ||
      'Password reset instructions have been sent to your email!';
    successMessage.value = msg;
    alertStore.success('Reset Email Sent', msg);
  } catch (err) {
    const parsed = parseBackendError(err);
    if (parsed.isValidation && Object.keys(parsed.fieldErrors).length > 0) {
      fieldErrors.value = parsed.fieldErrors;
      errorMessage.value = parsed.message || 'Please check your username / email.';
    } else {
      errorMessage.value = parsed.message || 'Failed to request password reset. Please try again.';
      fieldErrors.value = { username: errorMessage.value };
      alertStore.error('Error', errorMessage.value);
    }
  } finally {
    loading.value = false;
  }
}
</script>
