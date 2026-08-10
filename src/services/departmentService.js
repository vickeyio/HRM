import { useApi } from '../composables/useApi';
import { unwrapList, unwrapRecord, unwrapPagination, mapStatus } from '../utils/apiResponseHelper';

/**
 * Department Service — aligned with Afya365 HR backend
 *
 * Backend schema (Department):
 *   department_id, facility_id, name, code, description, is_deleted, created_at, updated_at
 *
 * Endpoints:
 *   GET    /hr/departments          — paginated list
 *   GET    /hr/department/search    — search
 *   POST   /hr/department           — create
 *   GET    /hr/department/{id}      — view
 *   PUT    /hr/department/{id}      — update
 *   DELETE /hr/department/{id}      — soft delete
 *   PATCH  /hr/department/{id}      — restore
 */
export const departmentService = {
  /**
   * Fetch all departments
   */
  async getAll(params = {}) {
    const api = useApi('/hr/departments', { autoFetch: false, enableCache: true, pagination: true });
    await api.request(null, params);
    const records = unwrapList(api.data.value).map(normalizeDepartment);
    const pagination = unwrapPagination(api.data.value);
    records.pagination = pagination;
    return records;
  },

  /**
   * Search departments
   */
  async search(query) {
    const api = useApi('/hr/department/search', { autoFetch: false });
    await api.request(null, { q: query });
    const records = unwrapList(api.data.value);
    return records.map(normalizeDepartment);
  },

  /**
   * Get a single department by ID
   */
  async getById(id) {
    const api = useApi(`/hr/department/${id}`, { autoFetch: false });
    await api.request();
    const record = unwrapRecord(api.data.value);
    return record ? normalizeDepartment(record) : null;
  },

  /**
   * Create a new department
   */
  async create(data) {
    const api = useApi('/hr/department', { method: 'POST', autoFetch: false });
    await api.request(toDepartmentPayload(data));
    const record = unwrapRecord(api.data.value);
    return record ? normalizeDepartment(record) : data;
  },

  /**
   * Update an existing department
   */
  async update(id, data) {
    const api = useApi(`/hr/department/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(toDepartmentPayload(data));
    const record = unwrapRecord(api.data.value);
    return record ? normalizeDepartment(record) : { ...data, department_id: id };
  },

  /**
   * Soft-delete a department
   */
  async delete(id) {
    const api = useApi(`/hr/department/${id}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    return true;
  },

  /**
   * Restore a soft-deleted department
   */
  async restore(id) {
    const api = useApi(`/hr/department/${id}`, { method: 'PATCH', autoFetch: false });
    await api.request();
    return true;
  }
};

/**
 * Normalize a backend department record to frontend-friendly shape.
 */
function normalizeDepartment(raw) {
  const id = raw.department_id ?? raw.id;
  return {
    id: id,
    department_id: id,
    name: raw.department_name || raw.name || '',
    code: raw.department_code || raw.code || '',
    description: raw.description || '',
    status: mapStatus(raw.status ?? 1, raw.is_deleted),
    is_deleted: raw.is_deleted || false,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}

/**
 * Transform frontend form data to backend-expected payload.
 */
function toDepartmentPayload(data) {
  return {
    department_name: data.name || data.department_name || '',
    department_code: data.code || data.department_code || '',
    name: data.name || data.department_name || '',
    code: data.code || data.department_code || '',
    description: data.description || '',
  };
}

export default departmentService;
