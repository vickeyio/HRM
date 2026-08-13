<template>
  <BaseModal
    as-modal="false"
    :show-header="false"
    :show-footer="false"
    :loading="loading"
    @save="handleSubmit"
  >
    <form @submit.prevent="handleSubmit" id="designation-form">
      <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 fs-14">
        <i class="ti ti-alert-circle me-1"></i>
        {{ typeof error === 'string' ? error : (error.message || 'Validation error') }}
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Job Title Name <span class="text-danger">*</span></label>
            <input
              type="text"
              v-model="formData.title_name"
              class="form-control"
              :class="{ 'is-invalid': !!fieldError('title_name') || !!fieldError('name') }"
              placeholder="e.g. Senior Software Engineer"
              required
              :disabled="loading"
            />
            <div v-if="fieldError('title_name') || fieldError('name')" class="invalid-feedback">
              {{ fieldError('title_name') || fieldError('name') }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Title Code</label>
            <input
              type="text"
              v-model="formData.title_code"
              class="form-control"
              :class="{ 'is-invalid': !!fieldError('title_code') }"
              placeholder="e.g. SSE"
              :disabled="loading"
            />
            <div v-if="fieldError('title_code')" class="invalid-feedback">
              {{ fieldError('title_code') }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Department</label>
            <select v-model="formData.department_id" class="form-select" :disabled="loading">
              <option :value="null">— Select Department —</option>
              <option v-for="dept in departments" :key="dept.department_id" :value="dept.department_id">
                {{ dept.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea
              v-model="formData.title_description"
              class="form-control"
              :class="{ 'is-invalid': !!fieldError('title_description') }"
              rows="3"
              placeholder="Brief description of this designation"
              :disabled="loading"
            ></textarea>
            <div v-if="fieldError('title_description')" class="invalid-feedback">
              {{ fieldError('title_description') }}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_supervisory" id="is_supervisory" :disabled="loading" />
            <label class="form-check-label" for="is_supervisory">Supervisory Role</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_clinical" id="is_clinical" :disabled="loading" />
            <label class="form-check-label" for="is_clinical">Clinical Role</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.requires_license" id="requires_license" :disabled="loading" />
            <label class="form-check-label" for="requires_license">Requires License</label>
          </div>
        </div>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import BaseModal from '../common/BaseModal.vue';
import { useDepartmentStore } from '../../stores/departments';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  designationData: { type: Object, default: null },
  error: { type: [String, Object], default: '' },
  fieldErrors: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'save']);

const departmentStore = useDepartmentStore();
const departments = computed(() => departmentStore.departments);

const isEditMode = computed(() => !!props.designationData);

function fieldError(key) {
  const val = props.fieldErrors?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

const defaultForm = () => ({
  title_name: '',
  title_code: '',
  title_description: '',
  department_id: null,
  is_supervisory: false,
  is_clinical: false,
  requires_license: false,
});

const formData = ref(defaultForm());

watch(
  () => props.designationData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        title_name: newVal.title_name || newVal.name || '',
        title_code: newVal.title_code || '',
        title_description: newVal.title_description || '',
        department_id: newVal.department_id || null,
        is_supervisory: newVal.is_supervisory || false,
        is_clinical: newVal.is_clinical || false,
        requires_license: newVal.requires_license || false,
      };
    } else {
      formData.value = defaultForm();
    }
  },
  { immediate: true }
);

function handleSubmit() {
  emit('save', { ...formData.value });
}

defineExpose({
  handleSubmit,
  getFormData: () => formData.value,
  formData
});
</script>


