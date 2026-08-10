import { useApi } from '../composables/useApi';
import { unwrapList, unwrapRecord, mapStatus } from '../utils/apiResponseHelper';

/**
 * Designation (JobTitle) Service — aligned with Afya365 HR backend
 *
 * Backend schema (JobTitle):
 *   job_title_id, facility_id, department_id, reports_to_title_id, job_group_id,
 *   status, title_name, title_code, title_description,
 *   requires_license, license_type, is_clinical, is_supervisory
 *
 * Endpoints:
 *   GET    /hr/job-titles           — paginated list
 *   GET    /hr/job-title/search     — search
 *   POST   /hr/job-title            — create
 *   GET    /hr/job-title/{id}       — view
 *   PUT    /hr/job-title/{id}       — update
 *   DELETE /hr/job-title/{id}       — soft delete
 *   PATCH  /hr/job-title/{id}       — restore
 */
export const designationService = {
  async getAll() {
    const api = useApi('/hr/job-titles', { autoFetch: false, enableCache: true });
    await api.request();
    const records = unwrapList(api.data.value);
    return records.map(normalizeJobTitle);
  },

  async search(query) {
    const api = useApi('/hr/job-title/search', { autoFetch: false });
    await api.request(null, { q: query });
    const records = unwrapList(api.data.value);
    return records.map(normalizeJobTitle);
  },

  async getById(id) {
    const api = useApi(`/hr/job-title/${id}`, { autoFetch: false });
    await api.request();
    const record = unwrapRecord(api.data.value);
    return record ? normalizeJobTitle(record) : null;
  },

  async create(data) {
    const api = useApi('/hr/job-title', { method: 'POST', autoFetch: false });
    await api.request(toJobTitlePayload(data));
    const record = unwrapRecord(api.data.value);
    return record ? normalizeJobTitle(record) : data;
  },

  async update(id, data) {
    const api = useApi(`/hr/job-title/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(toJobTitlePayload(data));
    const record = unwrapRecord(api.data.value);
    return record ? normalizeJobTitle(record) : { ...data, job_title_id: id };
  },

  async delete(id) {
    const api = useApi(`/hr/job-title/${id}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    return true;
  },

  async restore(id) {
    const api = useApi(`/hr/job-title/${id}`, { method: 'PATCH', autoFetch: false });
    await api.request();
    return true;
  }
};

/**
 * Normalize backend JobTitle to frontend-friendly shape.
 * The view/store use `name` for display — we alias `title_name` → `name`.
 */
function normalizeJobTitle(raw) {
  const id = raw.job_title_id ?? raw.id;
  return {
    id: id,
    job_title_id: id,
    name: raw.title_name || raw.name || '',
    title_name: raw.title_name || raw.name || '',
    title_code: raw.title_code || '',
    title_description: raw.title_description || '',
    department_id: raw.department_id || null,
    department: raw.department_name || raw.department || '',
    job_group_id: raw.job_group_id || null,
    reports_to_title_id: raw.reports_to_title_id || null,
    requires_license: raw.requires_license || false,
    license_type: raw.license_type || '',
    is_clinical: raw.is_clinical || false,
    is_supervisory: raw.is_supervisory || false,
    status: mapStatus(raw.status ?? 1, raw.is_deleted),
    is_deleted: raw.is_deleted || false,
  };
}

/**
 * Transform frontend form data to backend payload.
 */
function toJobTitlePayload(data) {
  return {
    title_name: data.title_name || data.name,
    title_code: data.title_code || '',
    title_description: data.title_description || data.description || '',
    department_id: data.department_id || null,
    job_group_id: data.job_group_id || null,
    reports_to_title_id: data.reports_to_title_id || null,
    requires_license: data.requires_license || false,
    license_type: data.license_type || '',
    is_clinical: data.is_clinical || false,
    is_supervisory: data.is_supervisory || false,
  };
}

export default designationService;
