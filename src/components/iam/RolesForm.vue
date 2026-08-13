<template>
  <form @submit.prevent="handleSubmit">
    <!-- General Error Banner -->
    <div v-if="generalError" class="alert alert-danger py-2 px-3 small mb-3">
      <i class="ti ti-alert-circle me-1"></i>
      {{ generalError }}
    </div>

    <!-- Role Name Field -->
    <div class="mb-3">
      <label class="form-label text-dark fw-medium fs-13 mb-1">
        Role Name <span class="text-danger" v-if="!readonly">*</span>
      </label>
      <input
        type="text"
        v-model="localForm.role_name"
        class="form-control"
        :class="{ 'is-invalid': !!fieldErrors?.role_name }"
        placeholder="e.g. hr_manager or administrator"
        :disabled="readonly || isLoading"
        required
      />
      <div v-if="fieldErrors?.role_name" class="invalid-feedback">
        {{ fieldErrors.role_name }}
      </div>
    </div>

    <!-- Rule Name Dropdown / Input -->
    <div class="mb-3">
      <label class="form-label text-dark fw-medium fs-13 mb-1">Rule Name (Optional)</label>
      <select
        v-if="rulesList && rulesList.length > 0"
        v-model="localForm.ruleName"
        class="form-select"
        :class="{ 'is-invalid': !!fieldErrors?.ruleName }"
        :disabled="readonly || isLoading"
      >
        <option value="">-- None / Default --</option>
        <option v-for="rule in rulesList" :key="rule.name || rule.rule_name || rule.id" :value="rule.name || rule.rule_name">
          {{ rule.name || rule.rule_name }}
        </option>
      </select>
      <input
        v-else
        type="text"
        v-model="localForm.ruleName"
        class="form-control"
        :class="{ 'is-invalid': !!fieldErrors?.ruleName }"
        placeholder="e.g. is_admin or is_author"
        :disabled="readonly || isLoading"
      />
      <div v-if="fieldErrors?.ruleName" class="invalid-feedback">
        {{ fieldErrors.ruleName }}
      </div>
      <small class="text-muted fs-11">System rule associated with this role for access evaluation.</small>
    </div>

    <!-- Description Field -->
    <div class="mb-3">
      <label class="form-label text-dark fw-medium fs-13 mb-1">Description</label>
      <textarea
        v-model="localForm.description"
        class="form-control"
        :class="{ 'is-invalid': !!fieldErrors?.description }"
        rows="3"
        placeholder="Brief description of the role's responsibilities..."
        :disabled="readonly || isLoading"
      ></textarea>
      <div v-if="fieldErrors?.description" class="invalid-feedback">
        {{ fieldErrors.description }}
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
        {{ submitLabel || 'Save Role' }}
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
  rulesList: {
    type: Array,
    default: () => []
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
    default: 'Save Role'
  },
  onSubmit: Function
});

const emit = defineEmits(['submit', 'cancel']);

const localForm = ref({
  role_name: props.formData.role_name || props.formData.name || '',
  ruleName: props.formData.ruleName || '',
  description: props.formData.description || ''
});

watch(
  () => props.formData,
  (newVal) => {
    localForm.value = {
      role_name: newVal?.role_name || newVal?.name || '',
      ruleName: newVal?.ruleName || '',
      description: newVal?.description || ''
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
