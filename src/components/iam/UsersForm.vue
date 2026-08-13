<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <!-- Top Alert for General Errors -->
    <div
      v-if="errorMessage"
      class="alert alert-danger d-flex align-items-center gap-2 mb-3 py-2 px-3 fs-13"
      role="alert"
    >
      <i class="ti ti-alert-circle fs-16"></i>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Account Information Section -->
    <div class="mb-4">
      <h6 class="fs-12 fw-bold text-uppercase text-muted tracking-wider mb-3 d-flex align-items-center gap-1">
        <i class="ti ti-user-circle fs-15 text-primary"></i> Account Details
      </h6>
      <div class="row g-3">
        <!-- Username -->
        <div class="col-md-6">
          <label class="form-label fw-medium fs-13" for="uf-username">
            Username <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-muted border-end-0">
              <i class="ti ti-at"></i>
            </span>
            <input
              id="uf-username"
              v-model="form.username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': fieldError('username') }"
              placeholder="e.g. jdoe"
              :disabled="readonly || !isCreateMode || isSubmitting"
              @input="clearFieldError('username')"
            />
            <div v-if="fieldError('username')" class="invalid-feedback d-block">
              {{ fieldError('username') }}
            </div>
          </div>
        </div>

        <!-- Email Address -->
        <div class="col-md-6">
          <label class="form-label fw-medium fs-13" for="uf-email">
            Email Address <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-muted border-end-0">
              <i class="ti ti-mail"></i>
            </span>
            <input
              id="uf-email"
              v-model="form.email_address"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': fieldError('email_address') }"
              placeholder="name@company.com"
              :disabled="readonly || isSubmitting"
              @input="clearFieldError('email_address')"
            />
            <div v-if="fieldError('email_address')" class="invalid-feedback d-block">
              {{ fieldError('email_address') }}
            </div>
          </div>
        </div>

        <!-- Mobile Number -->
        <div class="col-md-6">
          <label class="form-label fw-medium fs-13" for="uf-mobile">
            Mobile Number <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-muted border-end-0">
              <i class="ti ti-phone"></i>
            </span>
            <input
              id="uf-mobile"
              v-model="form.mobile_number"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': fieldError('mobile_number') }"
              placeholder="+254 7XX XXX XXX"
              :disabled="readonly || isSubmitting"
              @input="clearFieldError('mobile_number')"
            />
            <div v-if="fieldError('mobile_number')" class="invalid-feedback d-block">
              {{ fieldError('mobile_number') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-3 opacity-10" />

    <!-- Personal Information Section -->
    <div class="mb-4">
      <h6 class="fs-12 fw-bold text-uppercase text-muted tracking-wider mb-3 d-flex align-items-center gap-1">
        <i class="ti ti-id fs-15 text-primary"></i> Personal Details
      </h6>
      <div class="row g-3">
        <!-- First Name -->
        <div class="col-md-4">
          <label class="form-label fw-medium fs-13" for="uf-firstname">
            First Name <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <input
            id="uf-firstname"
            v-model="form.first_name"
            type="text"
            class="form-control form-control-sm"
            :class="{ 'is-invalid': fieldError('first_name') }"
            placeholder="John"
            :disabled="readonly || isSubmitting"
            @input="clearFieldError('first_name')"
          />
          <div v-if="fieldError('first_name')" class="invalid-feedback d-block">
            {{ fieldError('first_name') }}
          </div>
        </div>

        <!-- Middle Name -->
        <div class="col-md-4">
          <label class="form-label fw-medium fs-13" for="uf-middlename">
            Middle Name <span class="text-muted fw-normal fs-11">(optional)</span>
          </label>
          <input
            id="uf-middlename"
            v-model="form.middle_name"
            type="text"
            class="form-control form-control-sm"
            :class="{ 'is-invalid': fieldError('middle_name') }"
            placeholder="Middle"
            :disabled="readonly || isSubmitting"
            @input="clearFieldError('middle_name')"
          />
          <div v-if="fieldError('middle_name')" class="invalid-feedback d-block">
            {{ fieldError('middle_name') }}
          </div>
        </div>

        <!-- Last Name -->
        <div class="col-md-4">
          <label class="form-label fw-medium fs-13" for="uf-lastname">
            Last Name <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <input
            id="uf-lastname"
            v-model="form.last_name"
            type="text"
            class="form-control form-control-sm"
            :class="{ 'is-invalid': fieldError('last_name') }"
            placeholder="Doe"
            :disabled="readonly || isSubmitting"
            @input="clearFieldError('last_name')"
          />
          <div v-if="fieldError('last_name')" class="invalid-feedback d-block">
            {{ fieldError('last_name') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Password Section (Create Mode Only) -->
    <template v-if="!readonly && isCreateMode">
      <hr class="my-3 opacity-10" />

      <div class="mb-4">
        <h6 class="fs-12 fw-bold text-uppercase text-muted tracking-wider mb-3 d-flex align-items-center gap-1">
          <i class="ti ti-lock fs-15 text-primary"></i> Security Credentials
        </h6>
        <div class="row g-3">
          <!-- Password -->
          <div class="col-md-6">
            <label class="form-label fw-medium fs-13" for="uf-password">
              Password <span class="text-danger">*</span>
            </label>
            <div class="input-group input-group-sm">
              <input
                id="uf-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': fieldError('password') }"
                placeholder="New password"
                autocomplete="new-password"
                :disabled="isSubmitting"
                @input="clearFieldError('password')"
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <i class="ti fs-14" :class="showPassword ? 'ti-eye-off' : 'ti-eye'"></i>
              </button>
              <div v-if="fieldError('password')" class="invalid-feedback d-block">
                {{ fieldError('password') }}
              </div>
            </div>
            <div class="form-text text-muted fs-11 mt-1">
              Minimum 8 characters with upper, lower, numbers & symbols.
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="col-md-6">
            <label class="form-label fw-medium fs-13" for="uf-confirm-password">
              Confirm Password <span class="text-danger">*</span>
            </label>
            <div class="input-group input-group-sm">
              <input
                id="uf-confirm-password"
                v-model="form.confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': fieldError('confirm_password') }"
                placeholder="Repeat password"
                autocomplete="new-password"
                :disabled="isSubmitting"
                @input="clearFieldError('confirm_password')"
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
              >
                <i class="ti fs-14" :class="showConfirmPassword ? 'ti-eye-off' : 'ti-eye'"></i>
              </button>
              <div v-if="fieldError('confirm_password')" class="invalid-feedback d-block">
                {{ fieldError('confirm_password') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Modal Footer Actions (when not managed externally by GlobalModalProvider) -->
    <div v-if="!hideSubmit" class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
      <button type="submit" class="btn btn-primary px-4" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1" role="status"></span>
        <i v-else class="ti ti-check me-1"></i>
        {{ isSubmitting ? 'Saving...' : isCreateMode ? 'Create User' : 'Save Changes' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  },
  fieldErrors: {
    type: Object,
    default: () => ({})
  },
  error: {
    type: [String, Object],
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  hideSubmit: {
    type: Boolean,
    default: false
  },
  isCreateMode: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['submit', 'save']);

const form = reactive({
  username: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email_address: '',
  mobile_number: '',
  password: '',
  confirm_password: ''
});

const localFieldErrors = reactive({});
const submitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const isSubmitting = computed(() => props.isLoading || submitting.value);

const errorMessage = computed(() => {
  if (typeof props.error === 'string') return props.error;
  return props.error?.message || null;
});

// Initialize / Sync form data
watch(
  () => props.formData,
  (val) => {
    if (!val) return;
    const profile = val.profile || {};
    form.username = val.username || '';
    form.first_name = val.first_name || profile.first_name || '';
    form.middle_name = val.middle_name || profile.middle_name || '';
    form.last_name = val.last_name || profile.last_name || '';
    form.email_address = val.email_address || profile.email_address || '';
    form.mobile_number = val.mobile_number || profile.mobile_number || '';
    form.password = '';
    form.confirm_password = '';
  },
  { immediate: true, deep: true }
);

function fieldError(field) {
  return localFieldErrors[field] || props.fieldErrors?.[field] || null;
}

function clearFieldError(field) {
  if (localFieldErrors[field]) delete localFieldErrors[field];
  if (props.fieldErrors?.[field]) delete props.fieldErrors[field];
}

async function handleSubmit() {
  if (props.readonly) return;
  const payload = {
    username: form.username.trim(),
    first_name: form.first_name.trim(),
    middle_name: form.middle_name.trim(),
    last_name: form.last_name.trim(),
    email_address: form.email_address.trim(),
    mobile_number: form.mobile_number.trim()
  };

  if (props.isCreateMode) {
    payload.password = form.password;
    payload.confirm_password = form.confirm_password;
  }

  if (typeof props.onSubmit === 'function') {
    submitting.value = true;
    try {
      await props.onSubmit(payload);
    } catch (err) {
      if (err?.errorPayload?.errors) {
        Object.assign(localFieldErrors, err.errorPayload.errors);
      }
    } finally {
      submitting.value = false;
    }
  } else {
    emit('submit', payload);
    emit('save', payload);
  }
}

defineExpose({
  getFormData: () => ({ ...form }),
  submit: handleSubmit
});
</script>

<style scoped>
.user-form .input-group-text {
  width: 36px;
  justify-content: center;
}
</style>
