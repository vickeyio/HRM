<template>
  <div v-if="isOpen" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.6); z-index: 1050;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ isEditMode ? 'Edit Holiday' : 'Add Holiday' }}</h4>
          <button type="button" class="btn-close custom-btn-close" @click="closeModal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Title <span class="text-danger">*</span></label>
                  <input type="text" v-model="formData.title" class="form-control" placeholder="e.g. New Year" required />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Date <span class="text-danger">*</span></label>
                  <div class="input-icon-end position-relative">
                    <input type="date" v-model="formData.date" class="form-control" required />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea v-model="formData.description" class="form-control" rows="3" placeholder="Holiday description..."></textarea>
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
            <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Save Changes' : 'Add Holiday' }}</button>
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
  holidayData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.holidayData);

const formData = ref({
  title: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  status: 'Active'
});

watch(
  () => props.holidayData,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    } else {
      formData.value = {
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
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
  if (!formData.value.title) return;
  emit('save', { ...formData.value });
  closeModal();
}
</script>
