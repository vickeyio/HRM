<template>
  <BaseModal
    :model-value="isOpen"
    @update:model-value="$emit('close')"
    :title="isEditMode ? 'Edit Designation' : 'Add Designation'"
    :save-label="isEditMode ? 'Save Changes' : 'Add Designation'"
    @save="handleSubmit"
  >
    <form @submit.prevent="handleSubmit" id="designation-form">
      <div class="row">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Designation Name <span class="text-danger">*</span></label>
            <input type="text" v-model="formData.name" class="form-control" placeholder="e.g. Senior Software Engineer" required />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Department Name <span class="text-danger">*</span></label>
            <select v-model="formData.department" class="form-select" required>
              <option value="Finance">Finance</option>
              <option value="Application Development">Application Development</option>
              <option value="IT Management">IT Management</option>
              <option value="Web Development">Web Development</option>
              <option value="Sales">Sales</option>
              <option value="UI / UX">UI / UX</option>
              <option value="Account Management">Account Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Administration">Administration</option>
              <option value="Business Development">Business Development</option>
            </select>
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
  designationData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.designationData);

const formData = ref({
  name: '',
  department: 'Application Development',
  employeeCount: 0,
  status: 'Active'
});

watch(
  () => props.designationData,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    } else {
      formData.value = {
        name: '',
        department: 'Application Development',
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
