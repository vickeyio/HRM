/**
 * Shared helper to unwrap backend response envelopes and format errors.
 *
 * Backend responses follow this structure:
 *   List:   { dataPayload: { data: [...], totalCount, perPage, currentPage, ... } }
 *   Single: { dataPayload: { data: { ... } } }
 *   Alert:  { dataPayload: { alertify: { theme: '...', type: '...', message: '...' } } } or { alertifyPayload: { ... } }
 *   Error:  { errorPayload: { errors: { ... }, message: '...' } }
 */

/**
 * Unwrap a paginated list response → returns the array of records.
 * Falls back gracefully if the shape is unexpected.
 *
 * @param {Object} response - The raw response data from useApi
 * @returns {Array} - The array of records
 */
export function unwrapList(response) {
  if (!response) return [];

  // Standard dataPayload envelope
  const payload = response?.dataPayload?.data;
  if (Array.isArray(payload)) return payload;

  // Direct array (some endpoints)
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;

  return [];
}

/**
 * Unwrap a single-record response → returns the record object.
 *
 * @param {Object} response - The raw response data from useApi
 * @returns {Object|null} - The record or null
 */
export function unwrapRecord(response) {
  if (!response) return null;

  // Standard dataPayload envelope
  const payload = response?.dataPayload?.data;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) return payload;

  // Direct object
  if (response?.data && typeof response.data === 'object') return response.data;

  return response;
}

/**
 * Unwrap pagination metadata from a list response.
 *
 * @param {Object} response - The raw response data from useApi
 * @returns {Object} - Pagination metadata
 */
export function unwrapPagination(response) {
  const dp = response?.dataPayload;
  if (!dp) return {};

  return {
    totalCount: dp.totalCount ?? 0,
    perPage: dp.perPage ?? 25,
    currentPage: dp.currentPage ?? 1,
    totalPages: dp.totalPages ?? 1,
  };
}

/**
 * Map integer status to a human-readable string.
 * Backend uses: 1 = Active, 0 = Inactive, is_deleted = soft-deleted
 *
 * @param {number|boolean} status - Integer or boolean status
 * @param {boolean} isDeleted - Whether the record is soft-deleted
 * @returns {string} - 'Active' | 'Inactive' | 'Deleted'
 */
export function mapStatus(status, isDeleted = false) {
  if (isDeleted) return 'Deleted';
  return status === 1 || status === true ? 'Active' : 'Inactive';
}

/**
 * Reverse-map a string status to integer for API submission.
 *
 * @param {string} status - 'Active' | 'Inactive'
 * @returns {number} - 1 or 0
 */
export function reverseMapStatus(status) {
  return status === 'Active' ? 1 : 0;
}

/**
 * Normalise a backend error into `{ fieldErrors, message, isValidation }`.
 * Thoroughly handles nested `errorPayload.errors` and direct field validation maps.
 *
 * @param {Object|Array|string} err - Raw error from API / service / Axios
 * @returns {{ fieldErrors: Object, message: string, isValidation: boolean }}
 */
export function parseBackendError(err) {
  if (!err) {
    return { fieldErrors: {}, message: 'An unknown error occurred.', isValidation: false };
  }

  if (typeof err === 'string') {
    return { fieldErrors: {}, message: err, isValidation: false };
  }

  const resData = err?.response?.data;
  const payload = resData?.errorPayload || resData || err?.errorPayload || err || {};

  // Check for nested errors object in various envelope layers
  let errors =
    resData?.errorPayload?.errors ??
    resData?.errors ??
    err?.errorPayload?.errors ??
    payload?.errors ??
    err?.errors;

  const looksLikeFieldErrorsObject = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    const entries = Object.entries(value);
    if (entries.length === 0) return false;
    return entries.every(([, v]) =>
      typeof v === 'string' ||
      (Array.isArray(v) && v.every((s) => typeof s === 'string'))
    );
  };

  // If payload itself is a flat mapping of field -> error string
  if (errors == null && looksLikeFieldErrorsObject(payload)) {
    errors = payload;
  }

  // Extract message from standard locations
  const rawMessage =
    resData?.errorPayload?.message ||
    resData?.message ||
    payload?.message ||
    err?.message ||
    '';

  if (Array.isArray(errors)) {
    return {
      fieldErrors: {},
      message: errors[0] || rawMessage || 'Request failed.',
      isValidation: false,
    };
  }

  if (looksLikeFieldErrorsObject(errors)) {
    const normalized = {};
    for (const [key, value] of Object.entries(errors)) {
      normalized[key] = Array.isArray(value) ? (value[0] || '') : (value ?? '');
    }

    const isValidation = Object.keys(normalized).length > 0;
    return {
      fieldErrors: normalized,
      message: rawMessage || (isValidation ? 'Please correct the highlighted errors.' : 'Validation failed.'),
      isValidation,
    };
  }

  return {
    fieldErrors: {},
    message: rawMessage || 'Request failed.',
    isValidation: false,
  };
}

/**
 * Display backend alertify payload or fallback success message.
 *
 * @param {Object} alertStore - Pinia alert store instance
 * @param {Object} response - Raw API response
 * @param {string} fallbackMessage - Fallback success text
 */
export function handleResponseAlert(alertStore, response, fallbackMessage) {
  const payload =
    response?.alertifyPayload ||
    response?.dataPayload?.alertify ||
    response?.alertify ||
    response?.data?.alertifyPayload ||
    response?.data?.dataPayload?.alertify ||
    response?.data?.alertify;

  if (payload && alertStore) {
    alertStore.show(payload);
  } else if (alertStore && fallbackMessage) {
    alertStore.show({ theme: 'success', type: 'toast', message: fallbackMessage });
  }
}
