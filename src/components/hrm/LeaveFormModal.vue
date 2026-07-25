<template>
  <div v-if="isOpen" class="modal fade show d-block" style="background: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-3">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title fw-bold">
            <i :class="isEditMode ? 'ti ti-edit text-primary me-2' : 'ti ti-circle-plus text-primary me-2'"></i>
            {{ isEditMode ? 'Edit Leave Request' : 'Apply for Leave' }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12" v-if="!isEditMode">
                <label class="form-label fw-semibold">Employee Name <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.employeeName" class="form-control" placeholder="e.g. Anthony Lewis" required />
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Leave Type <span class="text-danger">*</span></label>
                <select v-model="formData.leaveType" class="form-select" required>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">From Date <span class="text-danger">*</span></label>
                <input type="date" v-model="formData.fromDate" class="form-control" required />
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">To Date <span class="text-danger">*</span></label>
                <input type="date" v-model="formData.toDate" class="form-control" required />
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Reason for Leave</label>
                <textarea v-model="formData.reason" class="form-control" rows="3" placeholder="Provide a brief explanation..."></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0 pt-0">
            <button type="button" class="btn btn-light" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary px-4">
              {{ isEditMode ? 'Update Request' : 'Submit Leave Request' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  leaveData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.leaveData);

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

function closeModal() {
  emit('close');
}

function handleSubmit() {
  emit('save', { ...formData.value });
  closeModal();
}
</script>
