<template>
  <form @submit.prevent="handleRegister" class="vh-100">
    <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
      <div class="mx-auto mb-4 text-center">
        <img src="/assets/img/logo.svg" class="img-fluid" alt="Logo" style="max-height: 45px;" />
      </div>

      <div>
        <div class="text-center mb-3">
          <h2 class="mb-2">Sign Up</h2>
          <p class="mb-0 text-muted">Please enter your details to create an account</p>
        </div>

        <div v-if="success" class="alert alert-success py-2 small mb-3">
          Account created successfully! Redirecting to login...
        </div>

        <!-- Name Field -->
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <div class="input-group">
            <input type="text" v-model="name" class="form-control border-end-0" placeholder="e.g. John Doe" required />
            <span class="input-group-text border-start-0">
              <i class="ti ti-user"></i>
            </span>
          </div>
        </div>

        <!-- Email Field -->
        <div class="mb-3">
          <label class="form-label">Email Address</label>
          <div class="input-group">
            <input type="email" v-model="email" class="form-control border-end-0" placeholder="name@company.com" required />
            <span class="input-group-text border-start-0">
              <i class="ti ti-mail"></i>
            </span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="mb-3">
          <label class="form-label">Password</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" class="form-control border-end-0" placeholder="••••••••" required />
            <span class="input-group-text border-start-0" @click="showPassword = !showPassword" style="cursor: pointer;">
              <i :class="['ti', showPassword ? 'ti-eye' : 'ti-eye-off']"></i>
            </span>
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" class="form-control border-end-0" placeholder="••••••••" required />
            <span class="input-group-text border-start-0">
              <i class="ti ti-lock"></i>
            </span>
          </div>
        </div>

        <!-- Terms Agreement -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="form-check form-check-md mb-0">
            <input class="form-check-input" id="terms" type="checkbox" v-model="agreeTerms" required />
            <label for="terms" class="form-check-label mt-0 small text-muted">
              I agree to the <a href="javascript:void(0);" class="text-primary">Terms & Privacy Policy</a>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            Sign Up
          </button>
        </div>

        <div class="text-center">
          <h6 class="fw-normal text-dark mb-0">
            Already have an account?
            <router-link to="/login" class="hover-a text-primary fw-semibold">Sign In</router-link>
          </h6>
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
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);

function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    success.value = true;
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  }, 1000);
}
</script>
