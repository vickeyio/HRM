<template>
  <BaseModal
    as-modal="false"
    :show-header="false"
    :show-footer="false"
    :loading="loading"
    @save="handleSubmit"
  >
    <form @submit.prevent="handleSubmit" id="holiday-form">
      <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 fs-14">
        <i class="ti ti-alert-circle me-1"></i>
        {{ typeof error === 'string' ? error : (error.message || 'Validation error') }}
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Holiday Name <span class="text-danger">*</span></label>
            <input
              type="text"
              v-model="formData.holiday_name"
              class="form-control"
              :class="{ 'is-invalid': !!fieldError('holiday_name') || !!fieldError('name') }"
              placeholder="e.g. New Year"
              required
              :disabled="loading"
            />
            <div v-if="fieldError('holiday_name') || fieldError('name')" class="invalid-feedback">
              {{ fieldError('holiday_name') || fieldError('name') }}
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Date <span class="text-danger">*</span></label>
            <div class="input-icon-end position-relative">
              <input
                type="date"
                v-model="formData.holiday_date"
                class="form-control"
                :class="{ 'is-invalid': !!fieldError('holiday_date') || !!fieldError('date') }"
                required
                :disabled="loading"
              />
              <div v-if="fieldError('holiday_date') || fieldError('date')" class="invalid-feedback">
                {{ fieldError('holiday_date') || fieldError('date') }}
              </div>
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
              placeholder="Holiday description..."
              :disabled="loading"
            ></textarea>
            <div v-if="fieldError('description')" class="invalid-feedback">
              {{ fieldError('description') }}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_recurring" id="is_recurring" :disabled="loading" />
            <label class="form-check-label" for="is_recurring">Recurring</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_paid" id="is_paid" :disabled="loading" />
            <label class="form-check-label" for="is_paid">Paid</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.double_pay_if_worked" id="double_pay" :disabled="loading" />
            <label class="form-check-label" for="double_pay">Double Pay</label>
          </div>
        </div>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import BaseModal from '../common/BaseModal.vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  holidayData: { type: Object, default: null },
  error: { type: [String, Object], default: '' },
  fieldErrors: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.holidayData);

function fieldError(key) {
  const val = props.fieldErrors?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

const defaultForm = () => ({
  holiday_name: '',
  holiday_date: new Date().toISOString().split('T')[0],
  description: '',
  is_recurring: false,
  is_paid: true,
  double_pay_if_worked: false,
});

const formData = ref(defaultForm());

watch(
  () => props.holidayData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        holiday_name: newVal.holiday_name || newVal.title || '',
        holiday_date: newVal.holiday_date || newVal.date || new Date().toISOString().split('T')[0],
        description: newVal.description || '',
        is_recurring: newVal.is_recurring || false,
        is_paid: newVal.is_paid ?? true,
        double_pay_if_worked: newVal.double_pay_if_worked || false,
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


