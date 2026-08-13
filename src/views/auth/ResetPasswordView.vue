<template>
  <form @submit.prevent="handleResetPassword" class="vh-100">
    <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
      <div class="mx-auto mb-4 text-center">
        <img src="/assets/img/logo.svg" class="img-fluid" alt="SmartHR Logo" style="max-height: 48px;" />
      </div>

      <div class="mx-auto w-100" style="max-width: 440px;">
        <div class="text-center mb-4">
          <h2 class="mb-2 fw-bold text-dark fs-24">Reset Password</h2>
          <p class="mb-0 text-muted fs-14">Create a new secure password for your account.</p>
        </div>

        <div v-if="!token" class="alert alert-warning py-2 px-3 small mb-3" role="alert">
          <i class="ti ti-alert-triangle me-1"></i>
          Missing reset token in link. Please use the link sent to your email.
        </div>

        <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-3" role="alert">
          <i class="ti ti-circle-check me-1"></i>
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small mb-3" role="alert">
          <i class="ti ti-alert-circle me-1"></i>
          {{ errorMessage }}
        </div>

        <!-- New Password -->
        <div class="mb-3">
          <label class="form-label text-dark fw-medium fs-14 mb-1">New Password</label>
          <div class="input-group has-validation">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control border-end-0 py-2"
              :class="{ 'is-invalid': !!fieldError('password') }"
              placeholder="••••••••"
              required
              :disabled="loading || !token"
              @input="clearFieldError('password')"
            />
            <span
              class="input-group-text border-start-0 bg-white text-muted"
              :class="{ 'border-danger': !!fieldError('password') }"
              @click="showPassword = !showPassword"
              style="cursor: pointer;"
            >
              <i :class="['ti', showPassword ? 'ti-eye' : 'ti-eye-off']"></i>
            </span>
            <div v-if="fieldError('password')" class="invalid-feedback d-block">
              {{ fieldError('password') }}
            </div>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <label class="form-label text-dark fw-medium fs-14 mb-1">Confirm New Password</label>
          <div class="input-group has-validation">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="form-control border-end-0 py-2"
              :class="{ 'is-invalid': !!fieldError('confirmPassword') || !!fieldError('confirm_password') }"
              placeholder="••••••••"
              required
              :disabled="loading || !token"
              @input="clearFieldError('confirmPassword', 'confirm_password')"
            />
            <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('confirmPassword') || !!fieldError('confirm_password') }">
              <i class="ti ti-lock"></i>
            </span>
            <div v-if="fieldError('confirmPassword') || fieldError('confirm_password')" class="invalid-feedback d-block">
              {{ fieldError('confirmPassword') || fieldError('confirm_password') }}
            </div>
          </div>
        </div>

        <div class="mb-3">
          <button
            type="submit"
            class="btn w-100 py-2 text-white fw-bold shadow-sm"
            style="background-color: #f26522; border-color: #f26522;"
            :disabled="loading || !token"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            Reset Password
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useAlertStore } from '../../stores/alert';
import { parseBackendError } from '../../utils/apiResponseHelper';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const token = computed(() => route.query.token || '');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const fieldErrors = ref({});

function fieldError(key) {
  const val = fieldErrors.value?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

function clearFieldError(...keys) {
  keys.forEach((k) => {
    if (fieldErrors.value[k]) delete fieldErrors.value[k];
  });
  if (Object.keys(fieldErrors.value).length === 0) {
    errorMessage.value = '';
  }
}

async function handleResetPassword() {
  if (!token.value) {
    errorMessage.value = 'Invalid or missing reset token.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    fieldErrors.value = {
      confirmPassword: 'Passwords do not match.'
    };
    return;
  }

  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  fieldErrors.value = {};

  try {
    const res = await authStore.resetPassword(token.value, {
      password: password.value,
      confirmPassword: confirmPassword.value
    });

    const msg = res?.dataPayload?.alertify?.message || 'Password reset successfully! Redirecting to login...';
    successMessage.value = msg;
    alertStore.success('Password Reset', msg);

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    const parsed = parseBackendError(err);
    if (parsed.isValidation && Object.keys(parsed.fieldErrors).length > 0) {
      fieldErrors.value = parsed.fieldErrors;
      errorMessage.value = parsed.message || 'Please correct the errors above.';
    } else {
      errorMessage.value = parsed.message || 'Failed to reset password. The link may have expired.';
      alertStore.error('Error', errorMessage.value);
    }
  } finally {
    loading.value = false;
  }
}
</script>
