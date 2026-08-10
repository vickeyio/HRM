/**
 * Shared helper to unwrap the Afya365 backend `dataPayload` response envelope.
 *
 * Backend responses follow this structure:
 *   List:   { dataPayload: { data: [...], totalCount, perPage, currentPage, ... } }
 *   Single: { dataPayload: { data: { ... } } }
 *   Alert:  { alertifyPayload: { ... } }
 *   Error:  { errorPayload: { errors: { ... } } }
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
