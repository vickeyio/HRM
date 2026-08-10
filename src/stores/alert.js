import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
    activeToasts: [],
    activeModal: null,
  }),

  actions: {
    /**
     * Show alert using alertifyPayload or standard parameters
     */
    show(alertifyPayload) {
      if (!alertifyPayload) return;

      const theme = (alertifyPayload.theme || alertifyPayload.type || 'info').toLowerCase();
      const title = alertifyPayload.title || this.getDefaultTitle(theme);
      const message = alertifyPayload.message || (typeof alertifyPayload === 'string' ? alertifyPayload : '');
      const displayType = alertifyPayload.displayType || alertifyPayload.type === 'alert' ? 'alert' : 'toast';

      const alertEntry = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        theme,
        title,
        message,
        timestamp: new Date().toISOString(),
        timeout: alertifyPayload.timeout || 4000,
      };

      // Add to alert history log (keep last 50)
      this.alerts.push(alertEntry);
      if (this.alerts.length > 50) {
        this.alerts.shift();
      }

      if (displayType === 'alert') {
        this.activeModal = alertEntry;
      } else {
        this.activeToasts.push(alertEntry);
        if (alertEntry.timeout > 0) {
          setTimeout(() => {
            this.removeToast(alertEntry.id);
          }, alertEntry.timeout);
        }
      }
    },

    success(title, message) {
      this.show({ theme: 'success', title: message === undefined ? 'Success' : title, message: message === undefined ? title : message });
    },

    error(title, message) {
      this.show({ theme: 'danger', title: message === undefined ? 'Error' : title, message: message === undefined ? title : message });
    },

    warning(title, message) {
      this.show({ theme: 'warning', title: message === undefined ? 'Warning' : title, message: message === undefined ? title : message });
    },

    info(title, message) {
      this.show({ theme: 'info', title: message === undefined ? 'Info' : title, message: message === undefined ? title : message });
    },

    removeToast(id) {
      this.activeToasts = this.activeToasts.filter(t => t.id !== id);
    },

    closeModal() {
      this.activeModal = null;
    },

    clearHistory() {
      this.alerts = [];
    },

    getDefaultTitle(theme) {
      switch (theme) {
        case 'success': return 'Success';
        case 'danger':
        case 'error': return 'Error';
        case 'warning': return 'Warning';
        default: return 'Notification';
      }
    }
  },

  getters: {
    recentAlerts: (state) => (limit = 10) => {
      return state.alerts.slice(-limit).reverse();
    }
  }
});

export default useAlertStore;
