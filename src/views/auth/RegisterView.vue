<template>
  <form @submit.prevent="handleRegister" class="min-vh-100 py-4">
    <div class="container" style="max-width: 580px;">
      <!-- Logo Header -->
      <div class="mx-auto mb-3 text-center">
        <img src="/assets/img/logo.svg" class="img-fluid" alt="SmartHR Logo" style="max-height: 45px;" />
      </div>

      <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-4">
          <div class="text-center mb-4">
            <h2 class="mb-1 fw-bold text-dark fs-24">Create Account</h2>
            <p class="mb-0 text-muted fs-14">Please enter your details to sign up</p>
          </div>

          <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-3" role="alert">
            <i class="ti ti-circle-check me-1"></i>
            {{ successMessage }}
          </div>

          <div v-if="generalError" class="alert alert-danger py-2 px-3 small mb-3" role="alert">
            <i class="ti ti-alert-circle me-1"></i>
            {{ generalError }}
          </div>

          <div class="row">
            <!-- First Name -->
            <div class="col-md-6 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">First Name <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  v-model="form.first_name"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('first_name') }"
                  placeholder="e.g. John"
                  required
                  :disabled="loading"
                  @input="clearFieldError('first_name')"
                />
                <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('first_name') }">
                  <i class="ti ti-user"></i>
                </span>
                <div v-if="fieldError('first_name')" class="invalid-feedback d-block">
                  {{ fieldError('first_name') }}
                </div>
              </div>
            </div>

            <!-- Last Name -->
            <div class="col-md-6 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">Last Name <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  v-model="form.last_name"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('last_name') }"
                  placeholder="e.g. Doe"
                  required
                  :disabled="loading"
                  @input="clearFieldError('last_name')"
                />
                <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('last_name') }">
                  <i class="ti ti-user"></i>
                </span>
                <div v-if="fieldError('last_name')" class="invalid-feedback d-block">
                  {{ fieldError('last_name') }}
                </div>
              </div>
            </div>

            <!-- Username -->
            <div class="col-md-12 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">Username <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  v-model="form.username"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('username') }"
                  placeholder="e.g. johndoe"
                  required
                  :disabled="loading"
                  @input="clearFieldError('username')"
                />
                <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('username') }">
                  <i class="ti ti-at"></i>
                </span>
                <div v-if="fieldError('username')" class="invalid-feedback d-block">
                  {{ fieldError('username') }}
                </div>
              </div>
            </div>

            <!-- Email Address -->
            <div class="col-md-6 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">Email Address <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  type="email"
                  v-model="form.email_address"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('email_address') || !!fieldError('email') }"
                  placeholder="john.doe@example.com"
                  required
                  :disabled="loading"
                  @input="clearFieldError('email_address', 'email')"
                />
                <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('email_address') || !!fieldError('email') }">
                  <i class="ti ti-mail"></i>
                </span>
                <div v-if="fieldError('email_address') || fieldError('email')" class="invalid-feedback d-block">
                  {{ fieldError('email_address') || fieldError('email') }}
                </div>
              </div>
            </div>

            <!-- Mobile Number -->
            <div class="col-md-6 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">Mobile Number <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  v-model="form.mobile_number"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('mobile_number') || !!fieldError('phone') }"
                  placeholder="+254700000000"
                  required
                  :disabled="loading"
                  @input="clearFieldError('mobile_number', 'phone')"
                />
                <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('mobile_number') || !!fieldError('phone') }">
                  <i class="ti ti-phone"></i>
                </span>
                <div v-if="fieldError('mobile_number') || fieldError('phone')" class="invalid-feedback d-block">
                  {{ fieldError('mobile_number') || fieldError('phone') }}
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="col-md-6 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">Password <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('password') }"
                  placeholder="••••••••"
                  required
                  :disabled="loading"
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
            <div class="col-md-6 mb-3">
              <label class="form-label text-dark fw-medium fs-13 mb-1">Confirm Password <span class="text-danger">*</span></label>
              <div class="input-group has-validation">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.confirm_password"
                  class="form-control border-end-0 py-2"
                  :class="{ 'is-invalid': !!fieldError('confirm_password') }"
                  placeholder="••••••••"
                  required
                  :disabled="loading"
                  @input="clearFieldError('confirm_password')"
                />
                <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('confirm_password') }">
                  <i class="ti ti-lock"></i>
                </span>
                <div v-if="fieldError('confirm_password')" class="invalid-feedback d-block">
                  {{ fieldError('confirm_password') }}
                </div>
              </div>
            </div>
          </div>

          <!-- Terms Agreement -->
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="form-check form-check-md mb-0">
              <input class="form-check-input" id="terms" type="checkbox" v-model="agreeTerms" required :disabled="loading" />
              <label for="terms" class="form-check-label mt-0 fs-13 text-muted">
                I agree to the <a href="javascript:void(0);" class="text-danger fw-semibold">Terms & Privacy Policy</a>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mb-3">
            <button
              type="submit"
              class="btn w-100 py-2 text-white fw-bold shadow-sm"
              style="background-color: #f26522; border-color: #f26522;"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
              Create Account
            </button>
          </div>

          <div class="text-center">
            <p class="fw-normal text-muted fs-14 mb-0">
              Already have an account?
              <router-link to="/login" class="text-danger text-decoration-none fw-semibold ms-1">Sign In</router-link>
            </p>
          </div>
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useAlertStore } from '../../stores/alert';
import { parseBackendError } from '../../utils/apiResponseHelper';

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const form = ref({
  first_name: '',
  last_name: '',
  username: '',
  email_address: '',
  mobile_number: '',
  password: '',
  confirm_password: ''
});

const agreeTerms = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const successMessage = ref('');
const generalError = ref('');
const fieldErrors = ref({});

function fieldError(key) {
  const val = fieldErrors.value?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

function clearFieldError(...keys) {
  keys.forEach((key) => {
    if (fieldErrors.value[key]) {
      delete fieldErrors.value[key];
    }
  });
  if (Object.keys(fieldErrors.value).length === 0) {
    generalError.value = '';
  }
}

async function handleRegister() {
  generalError.value = '';
  successMessage.value = '';
  fieldErrors.value = {};

  if (form.value.password !== form.value.confirm_password) {
    fieldErrors.value = {
      confirm_password: 'Passwords do not match.'
    };
    return;
  }

  loading.value = true;

  try {
    const res = await authStore.register({ ...form.value });
    const successText =
      res?.dataPayload?.alertify?.message ||
      'Registration successful! Please check your email to verify your account.';

    successMessage.value = successText;
    alertStore.success('Account Created', successText);

    setTimeout(() => {
      router.push('/login');
    }, 2500);
  } catch (err) {
    const parsed = parseBackendError(err);
    if (parsed.isValidation && Object.keys(parsed.fieldErrors).length > 0) {
      fieldErrors.value = parsed.fieldErrors;
      generalError.value = parsed.message || 'Please correct the highlighted errors.';
    } else {
      generalError.value = parsed.message || 'Registration failed. Please try again.';
      alertStore.error('Registration Error', generalError.value);
    }
  } finally {
    loading.value = false;
  }
}
</script>
