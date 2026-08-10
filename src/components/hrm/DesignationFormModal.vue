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
            <label class="form-label">Job Title Name <span class="text-danger">*</span></label>
            <input type="text" v-model="formData.title_name" class="form-control" placeholder="e.g. Senior Software Engineer" required />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Title Code</label>
            <input type="text" v-model="formData.title_code" class="form-control" placeholder="e.g. SSE" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Department</label>
            <select v-model="formData.department_id" class="form-select">
              <option :value="null">— Select Department —</option>
              <option v-for="dept in departments" :key="dept.department_id" :value="dept.department_id">
                {{ dept.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="formData.title_description" class="form-control" rows="3" placeholder="Brief description of this designation"></textarea>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_supervisory" id="is_supervisory" />
            <label class="form-check-label" for="is_supervisory">Supervisory Role</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_clinical" id="is_clinical" />
            <label class="form-check-label" for="is_clinical">Clinical Role</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.requires_license" id="requires_license" />
            <label class="form-check-label" for="requires_license">Requires License</label>
          </div>
        </div>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import BaseModal from '../common/BaseModal.vue';
import { useDepartmentStore } from '../../stores/departments';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  designationData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const departmentStore = useDepartmentStore();
const departments = computed(() => departmentStore.departments);

const isEditMode = computed(() => !!props.designationData);

const defaultForm = () => ({
  title_name: '',
  title_code: '',
  title_description: '',
  department_id: null,
  is_supervisory: false,
  is_clinical: false,
  requires_license: false,
});

const formData = ref(defaultForm());

watch(
  () => props.designationData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        title_name: newVal.title_name || newVal.name || '',
        title_code: newVal.title_code || '',
        title_description: newVal.title_description || '',
        department_id: newVal.department_id || null,
        is_supervisory: newVal.is_supervisory || false,
        is_clinical: newVal.is_clinical || false,
        requires_license: newVal.requires_license || false,
      };
    } else {
      formData.value = defaultForm();
    }
  },
  { immediate: true }
);

function closeModal() {
  emit('close');
}

function handleSubmit() {
  if (!formData.value.title_name) return;
  emit('save', { ...formData.value });
  closeModal();
}
</script>
