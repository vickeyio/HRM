<template>
  <div>
    <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 fs-14">
      <i class="ti ti-alert-circle me-1"></i>
      {{ typeof error === 'string' ? error : (error.message || 'Validation error') }}
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Department Name <span class="text-danger">*</span></label>
          <input
            type="text"
            v-model="formData.name"
            class="form-control"
            :class="{ 'is-invalid': !!fieldError('name') || !!fieldError('department_name') }"
            placeholder="e.g. Finance"
            required
            :disabled="loading"
          />
          <div v-if="fieldError('name') || fieldError('department_name')" class="invalid-feedback">
            {{ fieldError('name') || fieldError('department_name') }}
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Department Code</label>
          <input
            type="text"
            v-model="formData.code"
            class="form-control"
            :class="{ 'is-invalid': !!fieldError('code') || !!fieldError('department_code') }"
            placeholder="e.g. FIN"
            :disabled="loading"
          />
          <div v-if="fieldError('code') || fieldError('department_code')" class="invalid-feedback">
            {{ fieldError('code') || fieldError('department_code') }}
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            v-model="formData.description"
            class="form-control"
            :class="{ 'is-invalid': !!fieldError('description') }"
            rows="3"
            placeholder="Brief description of the department"
            :disabled="loading"
          ></textarea>
          <div v-if="fieldError('description')" class="invalid-feedback">
            {{ fieldError('description') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  departmentData: { type: Object, default: null },
  error: { type: [String, Object], default: '' },
  fieldErrors: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['save']);

const isEditMode = computed(() => !!props.departmentData);

function fieldError(key) {
  const val = props.fieldErrors?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

const formData = ref({
  name: '',
  code: '',
  description: ''
});

watch(
  () => props.departmentData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        name: newVal.name || newVal.department_name || '',
        code: newVal.code || newVal.department_code || '',
        description: newVal.description || ''
      };
    } else {
      formData.value = {
        name: '',
        code: '',
        description: ''
      };
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
