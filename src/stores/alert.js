import { defineStore } from 'pinia';
import { useAlert } from '@/composables/alerts';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
  }),

  actions: {
    /**
     * Show alert using alertifyPayload from API or manual options.
     * When type is "toast", displays iziToast.
     * When type is "alert", displays SweetAlert2.
     */
    show(alertifyPayload) {
      if (!alertifyPayload) return;

      const { toastSuccess, toastError, toastWarning, toastInfo, showAlert } = useAlert();

      // Unwrap payload if nested
      const raw = alertifyPayload?.alertifyPayload || alertifyPayload?.alertify || alertifyPayload;

      const theme = (raw.theme || (['toast', 'alert'].includes(raw.type) ? 'info' : raw.type) || 'info').toLowerCase();
      const displayType = raw.type === 'alert' || raw.displayType === 'alert' ? 'alert' : 'toast';
      const title = raw.title || this.getDefaultTitle(theme);
      const message = raw.message || (typeof raw === 'string' ? raw : '');
      const options = raw.options || {};

      // Keep in history log (last 50)
      this.alerts.push({
        theme,
        type: displayType,
        title,
        message,
        timestamp: new Date().toISOString(),
      });
      if (this.alerts.length > 50) {
        this.alerts.shift();
      }

      if (displayType === 'alert') {
        const iconMap = {
          success: 'success',
          danger: 'error',
          error: 'error',
          warning: 'warning',
          info: 'info',
        };
        showAlert({
          icon: iconMap[theme] || 'info',
          title: title || theme.charAt(0).toUpperCase() + theme.slice(1),
          text: message,
          confirmButtonText: 'OK',
          ...options,
        });
      } else {
        switch (theme) {
          case 'success':
            toastSuccess(title, message);
            break;
          case 'danger':
          case 'error':
            toastError(title, message);
            break;
          case 'warning':
            toastWarning(title, message);
            break;
          case 'info':
          default:
            toastInfo(title, message);
            break;
        }
      }
    },

    success(title, message) {
      this.show({
        theme: 'success',
        type: 'toast',
        title: message === undefined ? 'Success' : title,
        message: message === undefined ? title : message,
      });
    },

    error(title, message) {
      this.show({
        theme: 'danger',
        type: 'toast',
        title: message === undefined ? 'Error' : title,
        message: message === undefined ? title : message,
      });
    },

    warning(title, message) {
      this.show({
        theme: 'warning',
        type: 'toast',
        title: message === undefined ? 'Warning' : title,
        message: message === undefined ? title : message,
      });
    },

    info(title, message) {
      this.show({
        theme: 'info',
        type: 'toast',
        title: message === undefined ? 'Info' : title,
        message: message === undefined ? title : message,
      });
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
    },
  },

  getters: {
    recentAlerts: (state) => (limit = 10) => {
      return state.alerts.slice(-limit).reverse();
    },
  },
});

export default useAlertStore;
