<template>
  <form @submit.prevent="handleSubmit">
    <!-- General Error Banner -->
    <div v-if="generalError" class="alert alert-danger py-2 px-3 small mb-3">
      <i class="ti ti-alert-circle me-1"></i>
      {{ generalError }}
    </div>

    <!-- Permission Name Field -->
    <div class="mb-3">
      <label class="form-label text-dark fw-medium fs-13 mb-1">
        Permission Name <span class="text-danger" v-if="!readonly">*</span>
      </label>
      <input
        type="text"
        v-model="localForm.name"
        class="form-control"
        :class="{ 'is-invalid': !!fieldErrors?.name || !!fieldErrors?.permission_name }"
        placeholder="e.g. manage_employees or payroll_process"
        :disabled="readonly || isLoading"
        required
      />
      <div v-if="fieldErrors?.name || fieldErrors?.permission_name" class="invalid-feedback">
        {{ fieldErrors?.name || fieldErrors?.permission_name }}
      </div>
    </div>

    <!-- Description Field -->
    <div class="mb-3">
      <label class="form-label text-dark fw-medium fs-13 mb-1">Description</label>
      <textarea
        v-model="localForm.description"
        class="form-control"
        :class="{ 'is-invalid': !!fieldErrors?.description }"
        rows="3"
        placeholder="Description of what this permission grants..."
        :disabled="readonly || isLoading"
      ></textarea>
      <div v-if="fieldErrors?.description" class="invalid-feedback">
        {{ fieldErrors.description }}
      </div>
    </div>

    <!-- Rule Name Field (Optional) -->
    <div class="mb-3">
      <label class="form-label text-dark fw-medium fs-13 mb-1">Rule Name (Optional)</label>
      <input
        type="text"
        v-model="localForm.ruleName"
        class="form-control"
        :class="{ 'is-invalid': !!fieldErrors?.ruleName }"
        placeholder="e.g. is_owner"
        :disabled="readonly || isLoading"
      />
      <div v-if="fieldErrors?.ruleName" class="invalid-feedback">
        {{ fieldErrors.ruleName }}
      </div>
    </div>

    <!-- Modal Footer Actions (if not hidden) -->
    <div v-if="!hideSubmit && !readonly" class="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
      <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')" :disabled="isLoading">
        Cancel
      </button>
      <button
        type="submit"
        class="btn text-white fw-bold shadow-sm"
        style="background-color: #f26522; border-color: #f26522;"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>
        {{ submitLabel || 'Save Permission' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  },
  fieldErrors: {
    type: Object,
    default: () => ({})
  },
  generalError: {
    type: String,
    default: ''
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
  submitLabel: {
    type: String,
    default: 'Save Permission'
  },
  onSubmit: Function
});

const emit = defineEmits(['submit', 'cancel']);

const localForm = ref({
  name: props.formData.name || props.formData.permission_name || '',
  description: props.formData.description || '',
  ruleName: props.formData.ruleName || ''
});

watch(
  () => props.formData,
  (newVal) => {
    localForm.value = {
      name: newVal?.name || newVal?.permission_name || '',
      description: newVal?.description || '',
      ruleName: newVal?.ruleName || ''
    };
  },
  { deep: true }
);

function getFormData() {
  return { ...localForm.value };
}

async function handleSubmit() {
  if (props.onSubmit) {
    await props.onSubmit({ ...localForm.value });
  } else {
    emit('submit', { ...localForm.value });
  }
}

defineExpose({
  getFormData,
  handleSubmit
});
</script>
