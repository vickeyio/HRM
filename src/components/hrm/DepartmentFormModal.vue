<template>
  <div v-if="isOpen" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.6); z-index: 1050;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ isEditMode ? 'Edit Department' : 'Add Department' }}</h4>
          <button type="button" class="btn-close custom-btn-close" @click="closeModal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Department Name <span class="text-danger">*</span></label>
                  <input type="text" v-model="formData.name" class="form-control" placeholder="e.g. Finance" required />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Number of Employees</label>
                  <input type="number" v-model="formData.employeeCount" class="form-control" placeholder="0" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <select v-model="formData.status" class="form-select">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Save Department' : 'Add Department' }}</button>
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
  departmentData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.departmentData);

const formData = ref({
  name: '',
  employeeCount: 0,
  status: 'Active'
});

watch(
  () => props.departmentData,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    } else {
      formData.value = {
        name: '',
        employeeCount: 0,
        status: 'Active'
      };
    }
  },
  { immediate: true }
);

function closeModal() {
  emit('close');
}

function handleSubmit() {
  if (!formData.value.name) return;
  emit('save', { ...formData.value });
  closeModal();
}
</script>
