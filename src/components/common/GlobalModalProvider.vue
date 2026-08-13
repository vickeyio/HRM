<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modalStore.isOpen"
        ref="modalRef"
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="modalStore.title ? modalStore.titleId : null"
        :aria-describedby="modalStore.bodyId"
        aria-hidden="false"
        @click.self="backdropClick"
        style="background-color: rgba(0, 0, 0, 0.5)"
      >
        <div
          :class="['modal-dialog', sizeClass, modalStore.centered ? 'modal-dialog-centered' : '', modalStore.scrollable ? 'modal-dialog-scrollable' : '', modalStore.fullscreen ? 'modal-fullscreen' : '']"
          role="document"
          ref="dialogRef"
          tabindex="-1"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 :id="modalStore.titleId" class="modal-title">{{ modalStore.title }}</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                :disabled="isCloseDisabled"
                :aria-disabled="isCloseDisabled"
                @click="modalStore.closeModal"
              ></button>
            </div>

            <div v-if="modalStore.isLoading" class="modal-body text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-2 text-muted mb-0">Loading data...</p>
            </div>

            <div
              v-else
              :id="modalStore.bodyId"
              :class="['modal-body', modalStore.bodyClass]"
            >
              <component
                v-if="modalStore.component"
                ref="componentRef"
                :is="modalStore.component"
                v-bind="modalStore.props"
                :loading="modalStore.isSubmitting"
                :error="modalStore.props.error || ''"
                :field-errors="modalStore.props.fieldErrors || {}"
                @submit="handleComponentSubmit"
                @save="handleComponentSubmit"
                @confirm="handleComponentConfirm"
              />
              <div v-else class="text-center py-4 text-muted">
                <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                No content to display
              </div>
            </div>

            <div v-if="shouldShowFooter && !modalStore.isLoading" class="modal-footer gap-2">
              <button
                v-if="shouldShowCancelButton"
                type="button"
                class="btn btn-light"
                :disabled="isCloseDisabled"
                @click="handleCancel"
              >
                {{ modalStore.cancelText }}
              </button>
              <button
                v-if="modalStore.showConfirm"
                type="button"
                class="btn btn-primary"
                :disabled="isCloseDisabled"
                @click="handleConfirm"
              >
                <span
                  v-if="modalStore.isSubmitting"
                  class="spinner-border spinner-border-sm me-1"
                  role="status"
                ></span>
                {{ modalStore.confirmText }}
              </button>
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal">
      <div v-if="modalStore.isOpen" class="modal-backdrop fade show"></div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useModalStore } from '@/stores/modal';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError } from '@/utils/apiResponseHelper';

const modalStore = useModalStore();
const alertStore = useAlertStore();
const modalRef = ref(null);
const dialogRef = ref(null);
const componentRef = ref(null);

const sizeClass = computed(() => {
  if (!modalStore.modalSize || modalStore.modalSize === 'md') return '';
  return `modal-${modalStore.modalSize}`;
});

const isCloseDisabled = computed(
  () => modalStore.isSubmitting && modalStore.disableCloseWhileSubmitting
);

const shouldShowFooter = computed(() => {
  if (modalStore.component && typeof modalStore.onConfirm === 'function') return true;
  if (modalStore.showConfirm || modalStore.showCancel) return true;
  if (typeof modalStore.onConfirm === 'function' || typeof modalStore.onCancel === 'function') return true;
  return modalStore.showFooter;
});

const shouldShowCancelButton = computed(
  () => modalStore.showCancel && (modalStore.showConfirm || typeof modalStore.onCancel === 'function')
);

function backdropClick() {
  if (modalStore.closeOnBackdrop && !isCloseDisabled.value) {
    modalStore.closeModal();
  }
}

async function handleConfirm(payload) {
  if (isCloseDisabled.value) return;

  let dataToSubmit = payload;
  if (!dataToSubmit || dataToSubmit instanceof Event || (typeof dataToSubmit === 'object' && ('target' in dataToSubmit || dataToSubmit._isVue))) {
    if (componentRef.value) {
      if (typeof componentRef.value.getFormData === 'function') {
        dataToSubmit = componentRef.value.getFormData();
      } else if (componentRef.value.formData) {
        dataToSubmit = componentRef.value.formData;
      }
    }
  }

  if (typeof modalStore.onConfirm !== 'function') {
    modalStore.closeModal();
    return;
  }

  modalStore.setSubmitting(true);
  let shouldClose = modalStore.closeOnConfirm;

  try {
    const result = await modalStore.onConfirm(dataToSubmit);
    if (result === false) shouldClose = false;
  } catch (err) {
    const parsed = parseBackendError(err);
    if (parsed.isValidation) {
      modalStore.props = {
        ...modalStore.props,
        fieldErrors: parsed.fieldErrors,
        error: parsed.message,
      };
    } else {
      const message = parsed.message || 'Operation failed. Please try again.';
      alertStore.error(message);
    }
    shouldClose = false;
  } finally {
    modalStore.setSubmitting(false);
  }

  if (shouldClose) {
    modalStore.closeModal();
  }
}

async function handleCancel() {
  if (isCloseDisabled.value) return;

  if (typeof modalStore.onCancel === 'function') {
    const result = await modalStore.onCancel();
    if (result === false) return;
  }

  if (modalStore.closeOnCancel) {
    modalStore.closeModal();
  }
}

async function handleComponentSubmit(payload) {
  if (isCloseDisabled.value) return;
  await handleConfirm(payload);
}

async function handleComponentConfirm(payload) {
  if (isCloseDisabled.value) return;
  await handleConfirm(payload);
}

function handleKeydown(event) {
  if (!modalStore.isOpen) return;

  if (event.key === 'Escape' && modalStore.closeOnEsc && !isCloseDisabled.value) {
    event.preventDefault();
    modalStore.closeModal();
  }
}

watch(
  () => modalStore.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.removeEventListener('keydown', handleKeydown);
    }
  }
);

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
