<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      style="background-color: rgba(0, 0, 0, 0.5);"
      @click.self="close"
    >
      <div :class="['modal-dialog', sizeClass, 'modal-dialog-centered']" role="document">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-light" @click="close" :disabled="loading">
                Cancel
              </button>
              <button type="button" class="btn btn-primary" @click="$emit('save')" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
                {{ saveLabel }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Modal Title'
  },
  saveLabel: {
    type: String,
    default: 'Save'
  },
  loading: {
    type: Boolean,
    default: false
  },
  sizeClass: {
    type: String,
    default: 'modal-dialog-centered'
  }
});

const emit = defineEmits(['update:modelValue', 'save', 'cancel']);

function close() {
  emit('update:modelValue', false);
  emit('cancel');
}

// Handle ESC key press to close modal
function handleKeyDown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.classList.remove('modal-open');
});
</script>
