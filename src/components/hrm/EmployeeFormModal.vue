<template>
  <div v-if="isOpen" class="modal fade show d-block" style="background: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-3">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title fw-bold">
            <i :class="isEditMode ? 'ti ti-edit text-primary me-2' : 'ti ti-user-plus text-primary me-2'"></i>
            {{ isEditMode ? 'Edit Employee Details' : 'Add New Employee' }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-6">
                <label class="form-label fw-semibold">Full Name <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.name" class="form-control" placeholder="e.g. Jane Doe" required />
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Role / Job Title</label>
                <input type="text" v-model="formData.role" class="form-control" placeholder="e.g. Senior Frontend Dev" />
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Department</label>
                <select v-model="formData.department" class="form-select">
                  <option value="Development">Development</option>
                  <option value="Designing">Designing</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="IT Systems">IT Systems</option>
                  <option value="Marketing">Marketing</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Email Address <span class="text-danger">*</span></label>
                <input type="email" v-model="formData.email" class="form-control" placeholder="jane@smarthr.co.in" required />
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Joining Date</label>
                <input type="date" v-model="formData.joiningDate" class="form-control" />
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Employment Status</label>
                <select v-model="formData.status" class="form-select">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0 pt-0">
            <button type="button" class="btn btn-light" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary px-4">
              {{ isEditMode ? 'Save Changes' : 'Create Employee' }}
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
  employeeData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.employeeData);

const formData = ref({
  name: '',
  role: '',
  department: 'Development',
  email: '',
  joiningDate: new Date().toISOString().split('T')[0],
  status: 'Active'
});

watch(
  () => props.employeeData,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    } else {
      formData.value = {
        name: '',
        role: '',
        department: 'Development',
        email: '',
        joiningDate: new Date().toISOString().split('T')[0],
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
  if (!formData.value.name || !formData.value.email) return;
  emit('save', { ...formData.value });
  closeModal();
}
</script>
