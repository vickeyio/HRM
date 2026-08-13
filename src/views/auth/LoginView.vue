<template>
  <form @submit.prevent="handleLogin" class="vh-100">
    <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
      <!-- Logo Header -->
      <div class="mx-auto mb-4 text-center">
        <img src="/assets/img/logo.svg" class="img-fluid" alt="SmartHR Logo" style="max-height: 48px;" />
      </div>

      <div>
        <div class="text-center mb-4">
          <h2 class="mb-2 fw-bold text-dark fs-24">Sign In</h2>
          <p class="mb-0 text-muted fs-14">Please enter your details to sign in</p>
        </div>

        <!-- Quick Demo Role Switcher -->
        <div class="mb-3 p-2 bg-light rounded text-center border">
          <small class="d-block text-muted mb-1 fs-12 fw-semibold">Quick Demo Login As:</small>
          <div class="btn-group btn-group-sm w-100" role="group">
            <button
              type="button"
              :class="['btn', selectedRole === 'Admin' ? 'btn-danger' : 'btn-outline-secondary']"
              @click="selectRole('Admin', 'adrian@smarthr.co.in')"
              style="font-size: 12px;"
            >
              Admin
            </button>
            <button
              type="button"
              :class="['btn', selectedRole === 'HR Manager' ? 'btn-danger' : 'btn-outline-secondary']"
              @click="selectRole('HR Manager', 'sarah@smarthr.co.in')"
              style="font-size: 12px;"
            >
              HR Manager
            </button>
            <button
              type="button"
              :class="['btn', selectedRole === 'Employee' ? 'btn-danger' : 'btn-outline-secondary']"
              @click="selectRole('Employee', 'anthony@smarthr.co.in')"
              style="font-size: 12px;"
            >
              Employee
            </button>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="alert alert-danger py-2 small mb-3" role="alert">
          <i class="ti ti-alert-circle me-1"></i>
          {{ error }}
        </div>

        <!-- Username / Email Field -->
        <div class="mb-3">
          <label class="form-label text-dark fw-medium fs-14 mb-1">Username or Email Address</label>
          <div class="input-group has-validation">
            <input
              type="text"
              v-model="username"
              class="form-control border-end-0 py-2"
              :class="{ 'is-invalid': !!fieldError('username') || !!fieldError('email') || !!fieldError('login') }"
              placeholder="admin or admin@smarthr.co.in"
              required
              :disabled="loading"
              @input="clearFieldError('username', 'email', 'login')"
            />
            <span class="input-group-text border-start-0 bg-white text-muted" :class="{ 'border-danger': !!fieldError('username') || !!fieldError('email') || !!fieldError('login') }">
              <i class="ti ti-user"></i>
            </span>
            <div v-if="fieldError('username') || fieldError('email') || fieldError('login')" class="invalid-feedback d-block">
              {{ fieldError('username') || fieldError('email') || fieldError('login') }}
            </div>
          </div>
        </div>

        <!-- Password Field -->
        <div class="mb-3">
          <label class="form-label text-dark fw-medium fs-14 mb-1">Password</label>
          <div class="input-group has-validation">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
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

        <!-- Remember Me & Forgot Password -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="form-check form-check-md mb-0">
            <input class="form-check-input" id="remember_me" type="checkbox" v-model="rememberMe" />
            <label for="remember_me" class="form-check-label mt-0 text-muted fs-14">Remember Me</label>
          </div>
          <div class="text-end">
            <router-link to="/forgot-password" class="text-danger text-decoration-none fs-14 fw-medium">Forgot Password?</router-link>
          </div>
        </div>

        <!-- Primary Sign In Button -->
        <div class="mb-3">
          <button
            type="submit"
            class="btn w-100 py-2 text-white fw-bold shadow-sm"
            style="background-color: #f26522; border-color: #f26522;"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            Sign In
          </button>
        </div>

        <!-- Create Account Link -->
        <div class="text-center mb-3">
          <p class="fw-normal text-muted fs-14 mb-0">
            Don’t have an account?
            <router-link to="/register" class="text-danger text-decoration-none fw-semibold ms-1">Create Account</router-link>
          </p>
        </div>

        <!-- Or Divider -->
        <div class="position-relative text-center my-3">
          <hr class="text-muted opacity-25" />
          <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fs-14">Or</span>
        </div>

        <!-- Social Login Icons (Facebook, Google, Apple) -->
        <div class="mt-3">
          <div class="d-flex align-items-center justify-content-center flex-wrap gap-2">
            <!-- Facebook -->
            <a
              href="javascript:void(0);"
              class="btn flex-fill py-2 text-white d-flex align-items-center justify-content-center rounded-3"
              style="background-color: #1877f2;"
            >
              <i class="ti ti-brand-facebook fs-20"></i>
            </a>

            <!-- Google -->
            <a
              href="javascript:void(0);"
              class="btn btn-white border flex-fill py-2 d-flex align-items-center justify-content-center rounded-3 shadow-2xs"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </a>

            <!-- Apple -->
            <a
              href="javascript:void(0);"
              class="btn btn-dark flex-fill py-2 text-white d-flex align-items-center justify-content-center rounded-3"
              style="background-color: #111111;"
            >
              <i class="ti ti-brand-apple fs-20"></i>
            </a>
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
import { parseBackendError } from '../../utils/apiResponseHelper';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('admin');
const password = ref('@dmiN123');
const selectedRole = ref('Admin');
const rememberMe = ref(true);
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');
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
    error.value = '';
  }
}

function selectRole(role, defaultUser) {
  selectedRole.value = role;
  username.value = defaultUser;
  error.value = '';
  fieldErrors.value = {};
}

async function handleLogin() {
  loading.value = true;
  error.value = '';
  fieldErrors.value = {};

  try {
    await authStore.login({
      username: username.value,
      email: username.value,
      password: password.value,
      role: selectedRole.value
    });
    router.push('/');
  } catch (err) {
    const parsed = parseBackendError(err);
    if (parsed.isValidation && Object.keys(parsed.fieldErrors).length > 0) {
      fieldErrors.value = parsed.fieldErrors;
      error.value = parsed.message || 'Please correct the highlighted errors.';
    } else {
      const msg = parsed.message || 'Invalid login credentials';
      error.value = msg;
      
      const lower = msg.toLowerCase();
      if (lower.includes('password')) {
        fieldErrors.value = { password: msg };
      } else if (lower.includes('username') || lower.includes('email') || lower.includes('user') || lower.includes('account')) {
        fieldErrors.value = { username: msg };
      } else if (lower.includes('invalid') || lower.includes('credential')) {
        fieldErrors.value = {
          username: msg,
          password: msg
        };
      }
    }
  } finally {
    loading.value = false;
  }
}
</script>
