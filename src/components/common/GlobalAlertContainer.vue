<template>
  <div>
    <!-- Floating Toast Stack (Top Right) -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1090;">
      <TransitionGroup name="toast">
        <div
          v-for="toast in alertStore.activeToasts"
          :key="toast.id"
          :class="['toast-card', `toast-${getThemeClass(toast.theme)}`]"
          role="alert"
        >
          <div class="toast-card-icon">
            <i :class="getIconClass(toast.theme)"></i>
          </div>
          <div class="toast-card-content">
            <h6 class="toast-card-title">{{ toast.title }}</h6>
            <p v-if="toast.message" class="toast-card-msg">{{ toast.message }}</p>
          </div>
          <button type="button" class="toast-card-close" @click="alertStore.removeToast(toast.id)">
            <i class="ti ti-x"></i>
          </button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Alert Modal Dialog (Center Screen) -->
    <div v-if="alertStore.activeModal" class="modal fade show d-block alert-modal-backdrop" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow-lg border-0 rounded-4">
          <div class="modal-body text-center p-4">
            <div :class="['alert-modal-icon mb-3', `text-${getThemeClass(alertStore.activeModal.theme)}`]">
              <i :class="getIconClass(alertStore.activeModal.theme)"></i>
            </div>
            <h4 class="fw-bold mb-2">{{ alertStore.activeModal.title }}</h4>
            <p class="text-muted mb-4">{{ alertStore.activeModal.message }}</p>
            <button
              type="button"
              :class="['btn', `btn-${getThemeClass(alertStore.activeModal.theme)}`, 'px-4 rounded-pill']"
              @click="alertStore.closeModal()"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();

function getThemeClass(theme) {
  switch (theme) {
    case 'success': return 'success';
    case 'danger':
    case 'error': return 'danger';
    case 'warning': return 'warning';
    case 'info': return 'info';
    default: return 'primary';
  }
}

function getIconClass(theme) {
  switch (theme) {
    case 'success': return 'ti ti-circle-check-filled fs-2';
    case 'danger':
    case 'error': return 'ti ti-alert-circle-filled fs-2';
    case 'warning': return 'ti ti-alert-triangle-filled fs-2';
    default: return 'ti ti-info-circle-filled fs-2';
  }
}
</script>

<style scoped>
.toast-container {
  max-width: 380px;
  width: 100%;
}

.toast-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #ffffff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border-left: 5px solid #0d6efd;
  transition: all 0.3s ease;
}

.toast-card-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-card-content {
  flex-grow: 1;
}

.toast-card-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}

.toast-card-msg {
  font-size: 0.825rem;
  color: #64748b;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.toast-card-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.toast-card-close:hover {
  color: #1e293b;
}

/* Toast Themes */
.toast-success {
  border-left-color: #10b981;
}
.toast-success .toast-card-icon {
  color: #10b981;
}

.toast-danger {
  border-left-color: #ef4444;
}
.toast-danger .toast-card-icon {
  color: #ef4444;
}

.toast-warning {
  border-left-color: #f59e0b;
}
.toast-warning .toast-card-icon {
  color: #f59e0b;
}

.toast-info {
  border-left-color: #06b6d4;
}
.toast-info .toast-card-icon {
  color: #06b6d4;
}

/* Modal backdrop */
.alert-modal-backdrop {
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
}

.alert-modal-icon i {
  font-size: 3.5rem;
}

/* Vue Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
