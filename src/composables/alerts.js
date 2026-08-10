import { useAlertStore } from '../stores/alert';

export function useAlert() {
  const alertStore = useAlertStore();

  const safeMessage = (msg) => {
    if (msg === null || msg === undefined) return '';
    if (typeof msg === 'object') return JSON.stringify(msg);
    return String(msg);
  };

  const toastSuccess = (title, message) => {
    if (message === undefined) { message = title; title = 'Success'; }
    alertStore.show({ theme: 'success', title, message: safeMessage(message) });
  };

  const toastError = (title, message) => {
    if (message === undefined) { message = title; title = 'Error'; }
    alertStore.show({ theme: 'danger', title, message: safeMessage(message) });
  };

  const toastWarning = (title, message) => {
    if (message === undefined) { message = title; title = 'Warning'; }
    alertStore.show({ theme: 'warning', title, message: safeMessage(message) });
  };

  const toastInfo = (title, message) => {
    if (message === undefined) { message = title; title = 'Info'; }
    alertStore.show({ theme: 'info', title, message: safeMessage(message) });
  };

  const showAlert = (options) => {
    alertStore.show(options);
  };

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
    showAlert,
  };
}

export default useAlert;
