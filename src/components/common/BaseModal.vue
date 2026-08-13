<template>
  <Teleport v-if="asModal" to="body">
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
          <div v-if="showHeader" class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div v-if="showFooter" class="modal-footer gap-2">
            <slot name="footer">
              <button type="button" class="btn btn-light" @click="close" :disabled="loading">Cancel</button>
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

  <div v-if="!asModal">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
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
  },
  asModal: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'save', 'cancel', 'close']);

function close() {
  emit('update:modelValue', false);
  emit('cancel');
  emit('close');
}

function handleKeyDown(e) {
  if (e.key === 'Escape' && props.modelValue && props.asModal) {
    close();
  }
}

function updateScrollLock() {
  nextTick(() => {
    const openModals = document.querySelectorAll('.modal.show');
    if (openModals.length > 0) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  });
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.body.classList.add('modal-open');
    } else {
      updateScrollLock();
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  if (props.modelValue && props.asModal) {
    document.body.classList.add('modal-open');
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  updateScrollLock();
});
</script>

