import alertUtil from '@/utils/alerts';

export function useAlert() {
  const safeMessage = (msg) => {
    if (msg === null || msg === undefined) return '';
    if (typeof msg === 'object') return JSON.stringify(msg);
    return String(msg);
  };

  const toastSuccess = (title, message) => {
    if (message === undefined) {
      message = title;
      title = 'Success';
    }
    alertUtil.toast.success({ title, message: safeMessage(message) });
  };

  const toastError = (title, message) => {
    if (message === undefined) {
      message = title;
      title = 'Error';
    }
    alertUtil.toast.error({ title, message: safeMessage(message) });
  };

  const toastWarning = (title, message) => {
    if (message === undefined) {
      message = title;
      title = 'Warning';
    }
    alertUtil.toast.warning({ title, message: safeMessage(message) });
  };

  const toastInfo = (title, message) => {
    if (message === undefined) {
      message = title;
      title = 'Info';
    }
    alertUtil.toast.info({ title, message: safeMessage(message) });
  };

  const confirmAction = async (title, text, options) => {
    return await alertUtil.dialog.confirm(title, text, options);
  };

  const showAlert = (options) => {
    alertUtil.dialog.fire(options);
  };

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
    confirmAction,
    showAlert,
  };
}
