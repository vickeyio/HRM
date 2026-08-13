<template>
  <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
    <div class="mx-auto mb-4 text-center">
      <img src="/assets/img/logo.svg" class="img-fluid" alt="SmartHR Logo" style="max-height: 48px;" />
    </div>

    <div class="mx-auto w-100" style="max-width: 480px;">
      <div class="card shadow-sm border-0 rounded-4 text-center p-4">
        <!-- Loading State -->
        <div v-if="loading" class="py-5">
          <div class="spinner-border text-danger mb-3" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Activating...</span>
          </div>
          <h4 class="fw-bold text-dark mb-1">Verifying Your Account</h4>
          <p class="text-muted fs-14 mb-0">Please wait while we activate your account...</p>
        </div>

        <!-- Success State -->
        <div v-else-if="status === 'success'" class="py-4">
          <div class="avatar avatar-xl rounded-circle bg-success-light text-success mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 64px; height: 64px; background-color: rgba(22, 192, 152, 0.15);">
            <i class="ti ti-circle-check fs-1 text-success"></i>
          </div>
          <h3 class="fw-bold text-dark mb-2">Account Activated!</h3>
          <p class="text-muted fs-14 mb-4">{{ message || 'Your account has been successfully verified. You can now log in.' }}</p>
          <router-link
            to="/login"
            class="btn w-100 py-2 text-white fw-bold shadow-sm"
            style="background-color: #f26522; border-color: #f26522;"
          >
            Sign In Now
          </router-link>
        </div>

        <!-- Error State -->
        <div v-else class="py-4">
          <div class="avatar avatar-xl rounded-circle bg-danger-light text-danger mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 64px; height: 64px; background-color: rgba(239, 68, 68, 0.15);">
            <i class="ti ti-alert-triangle fs-1 text-danger"></i>
          </div>
          <h3 class="fw-bold text-dark mb-2">Activation Failed</h3>
          <p class="text-muted fs-14 mb-4">{{ message || 'The activation link is invalid or has expired.' }}</p>
          <div class="d-flex gap-2">
            <router-link to="/register" class="btn btn-outline-secondary flex-fill py-2">
              Register Again
            </router-link>
            <router-link to="/login" class="btn btn-primary flex-fill py-2" style="background-color: #f26522; border-color: #f26522;">
              Back to Sign In
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 pb-3 text-center">
      <p class="mb-0 text-muted fs-13">Copyright &copy; 2026 - Smarthr</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useAlertStore } from '../../stores/alert';
import { parseBackendError } from '../../utils/apiResponseHelper';

const route = useRoute();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const loading = ref(true);
const status = ref('loading'); // 'loading' | 'success' | 'error'
const message = ref('');

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    loading.value = false;
    status.value = 'error';
    message.value = 'No activation token was provided in the link.';
    return;
  }

  try {
    const res = await authStore.activateAccount(token);
    status.value = 'success';
    message.value =
      res?.dataPayload?.alertify?.message ||
      'Your account has been successfully activated! You can now log in.';
    alertStore.success('Account Activated', message.value);
  } catch (err) {
    status.value = 'error';
    const parsed = parseBackendError(err);
    message.value = parsed.message || 'Invalid or expired activation link.';
    alertStore.error('Activation Failed', message.value);
  } finally {
    loading.value = false;
  }
});
</script>
