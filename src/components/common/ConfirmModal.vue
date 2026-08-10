<template>
  <BaseModal
    :model-value="isOpen"
    @update:model-value="$emit('close')"
    :title="title"
    :save-label="confirmLabel"
    :loading="loading"
    size-class="modal-dialog-centered modal-sm"
    @save="handleConfirm"
  >
    <div class="text-center py-2">
      <div class="avatar avatar-xl rounded-circle bg-danger-light text-danger mb-3 mx-auto d-flex align-items-center justify-content-center">
        <i class="ti ti-trash fs-24"></i>
      </div>
      <h6 class="fw-semibold text-dark mb-2">{{ heading }}</h6>
      <p class="text-muted fs-13 mb-0">{{ message }}</p>
    </div>

    <template #footer>
      <div class="d-flex align-items-center justify-content-center gap-2 w-100">
        <button type="button" class="btn btn-light flex-fill" @click="$emit('close')" :disabled="loading">
          Cancel
        </button>
        <button type="button" class="btn btn-danger flex-fill" @click="handleConfirm" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
          {{ confirmLabel }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm Action' },
  heading: { type: String, default: 'Are you sure?' },
  message: { type: String, default: 'This action cannot be undone.' },
  confirmLabel: { type: String, default: 'Delete' },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'confirm']);

function handleConfirm() {
  emit('confirm');
}
</script>
