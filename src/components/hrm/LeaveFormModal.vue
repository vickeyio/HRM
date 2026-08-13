<template>
  <BaseModal
    as-modal="false"
    :show-header="false"
    :show-footer="false"
    :loading="loading"
    @save="handleSubmit"
  >
    <form @submit.prevent="handleSubmit" id="leave-form">
      <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 fs-14">
        <i class="ti ti-alert-circle me-1"></i>
        {{ typeof error === 'string' ? error : (error.message || 'Validation error') }}
      </div>

      <div class="row g-3">
        <div class="col-12" v-if="!isEditMode">
          <label class="form-label fw-semibold">Employee Name <span class="text-danger">*</span></label>
          <input
            type="text"
            v-model="formData.employeeName"
            class="form-control"
            :class="{ 'is-invalid': !!fieldError('employeeName') || !!fieldError('employee_id') }"
            placeholder="e.g. Anthony Lewis"
            required
            :disabled="loading"
          />
          <div v-if="fieldError('employeeName') || fieldError('employee_id')" class="invalid-feedback">
            {{ fieldError('employeeName') || fieldError('employee_id') }}
          </div>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">Leave Type <span class="text-danger">*</span></label>
          <select v-model="formData.leaveType" class="form-select" :class="{ 'is-invalid': !!fieldError('leaveType') || !!fieldError('leave_type_id') }" required :disabled="loading">
            <option value="Medical Leave">Medical Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
          <div v-if="fieldError('leaveType') || fieldError('leave_type_id')" class="invalid-feedback">
            {{ fieldError('leaveType') || fieldError('leave_type_id') }}
          </div>
        </div>
        <div class="col-6">
          <label class="form-label fw-semibold">From Date <span class="text-danger">*</span></label>
          <input type="date" v-model="formData.fromDate" class="form-control" :class="{ 'is-invalid': !!fieldError('fromDate') || !!fieldError('from_date') }" required :disabled="loading" />
          <div v-if="fieldError('fromDate') || fieldError('from_date')" class="invalid-feedback">
            {{ fieldError('fromDate') || fieldError('from_date') }}
          </div>
        </div>
        <div class="col-6">
          <label class="form-label fw-semibold">To Date <span class="text-danger">*</span></label>
          <input type="date" v-model="formData.toDate" class="form-control" :class="{ 'is-invalid': !!fieldError('toDate') || !!fieldError('to_date') }" required :disabled="loading" />
          <div v-if="fieldError('toDate') || fieldError('to_date')" class="invalid-feedback">
            {{ fieldError('toDate') || fieldError('to_date') }}
          </div>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">Reason for Leave</label>
          <textarea v-model="formData.reason" class="form-control" :class="{ 'is-invalid': !!fieldError('reason') }" rows="3" placeholder="Provide a brief explanation..." :disabled="loading"></textarea>
          <div v-if="fieldError('reason')" class="invalid-feedback">
            {{ fieldError('reason') }}
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
  leaveData: { type: Object, default: null },
  error: { type: [String, Object], default: '' },
  fieldErrors: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.leaveData);

function fieldError(key) {
  const val = props.fieldErrors?.[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

const formData = ref({
  employeeName: 'Anthony Lewis',
  department: 'Finance',
  leaveType: 'Medical Leave',
  fromDate: new Date().toISOString().split('T')[0],
  toDate: new Date().toISOString().split('T')[0],
  reason: ''
});

watch(
  () => props.leaveData,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    } else {
      formData.value = {
        employeeName: 'Anthony Lewis',
        department: 'Finance',
        leaveType: 'Medical Leave',
        fromDate: new Date().toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0],
        reason: ''
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


