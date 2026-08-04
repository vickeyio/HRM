<template>
  <BaseModal
    :model-value="isOpen"
    @update:model-value="$emit('close')"
    :title="isEditMode ? 'Edit Department' : 'Add Department'"
    :save-label="isEditMode ? 'Save Department' : 'Add Department'"
    @save="handleSubmit"
  >
    <form @submit.prevent="handleSubmit" id="department-form">
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
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import BaseModal from '../common/BaseModal.vue';

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
