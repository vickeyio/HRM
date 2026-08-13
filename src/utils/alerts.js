import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2';

const defaultIziOptions = {
  position: 'topRight',
  timeout: 4500,
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
};

const alertUtil = {
  // iziToast toast implementations
  toast: {
    success: (options) => iziToast.success({ ...defaultIziOptions, ...options }),
    error: (options) => iziToast.error({ ...defaultIziOptions, ...options }),
    warning: (options) => iziToast.warning({ ...defaultIziOptions, ...options }),
    info: (options) => iziToast.info({ ...defaultIziOptions, ...options }),
  },

  // SweetAlert2 modal dialog implementations
  dialog: {
    fire: (options) =>
      Swal.fire({
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary px-4 me-2',
          cancelButton: 'btn btn-light px-4',
          popup: 'rounded-4 shadow',
        },
        ...options,
      }),

    alert: (title, text, icon = 'info') =>
      Swal.fire({
        title,
        text,
        icon,
        buttonsStyling: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary px-4',
          popup: 'rounded-4 shadow',
        },
      }),

    confirm: (title, text, options = {}) =>
      Swal.fire({
        title: title || 'Are you sure?',
        text: text || 'This action cannot be undone.',
        icon: options.icon || 'warning',
        showCancelButton: true,
        confirmButtonText: options.confirmButtonText || 'Confirm',
        cancelButtonText: options.cancelButtonText || 'Cancel',
        buttonsStyling: false,
        customClass: {
          confirmButton: options.confirmClass || 'btn btn-danger px-4 me-2',
          cancelButton: 'btn btn-light px-4',
          popup: 'rounded-4 shadow',
        },
        ...options,
      }),
  },
};

export default alertUtil;
