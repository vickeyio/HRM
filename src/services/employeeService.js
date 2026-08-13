import { useApi } from '../composables/useApi';
import { unwrapList, unwrapRecord, mapStatus } from '../utils/apiResponseHelper';

/**
 * Employee Service — aligned with Afya365 HR backend
 *
 * Backend schema (Employee):
 *   employee_id, facility_id, employee_number, department_id, job_title_id,
 *   job_group_id, employment_type_id, employment_status_id, employer_type_id,
 *   employment_date, termination_date, termination_reason, notes
 *
 * Nested profile (Profile):
 *   title, first_name, middle_name, last_name, gender, date_of_birth,
 *   physical_address, postal_address, national_id, passport_number,
 *   tax_pin, email_address, mobile_number, avatar_url
 *
 * Endpoints:
 *   GET    /hr/employees            — paginated list
 *   GET    /hr/employee/search      — search
 *   GET    /hr/employee/meta        — form metadata
 *   POST   /hr/employee             — create
 *   GET    /hr/employee/{id}        — view
 *   PUT    /hr/employee/{id}        — update
 *   DELETE /hr/employee/{id}        — soft delete
 *   PATCH  /hr/employee/{id}        — restore
 */
export const employeeService = {
  async getAll() {
    const api = useApi('/hr/employees', { autoFetch: false, enableCache: true });
    await api.request();
    const records = unwrapList(api.data.value);
    return records.map(normalizeEmployee);
  },

  async search(query) {
    const api = useApi('/hr/employee/search', { autoFetch: false });
    await api.request(null, { q: query });
    const records = unwrapList(api.data.value);
    return records.map(normalizeEmployee);
  },

  async getById(id) {
    const api = useApi(`/hr/employee/${id}`, { autoFetch: false });
    await api.request();
    const record = unwrapRecord(api.data.value);
    return record ? normalizeEmployee(record) : null;
  },

  async getMeta() {
    const api = useApi('/hr/employee/meta', { autoFetch: false, enableCache: true });
    await api.request();
    return unwrapRecord(api.data.value);
  },

  async create(data) {
    const api = useApi('/hr/employee', { method: 'POST', autoFetch: false });
    await api.request(data);
    if (api.error.value) throw api.error.value;
    const record = unwrapRecord(api.data.value);
    return record ? normalizeEmployee(record) : data;
  },

  async update(id, data) {
    const api = useApi(`/hr/employee/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(data);
    if (api.error.value) throw api.error.value;
    const record = unwrapRecord(api.data.value);
    return record ? normalizeEmployee(record) : { ...data, employee_id: id };
  },

  async delete(id) {
    const api = useApi(`/hr/employee/${id}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return true;
  },

  async restore(id) {
    const api = useApi(`/hr/employee/${id}`, { method: 'PATCH', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return true;
  }
};


/**
 * Normalize backend employee record to frontend-friendly shape.
 * Backend may return flat or nested profile fields depending on the endpoint.
 */
function normalizeEmployee(raw) {
  const profile = raw.profile || {};

  // Build a full display name from profile fields or fallback
  const firstName = profile.first_name || raw.first_name || '';
  const middleName = profile.middle_name || raw.middle_name || '';
  const lastName = profile.last_name || raw.last_name || '';
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ') || raw.name || '';

  return {
    employee_id: raw.employee_id,
    employee_number: raw.employee_number || '',
    name: fullName,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    email: profile.email_address || raw.email_address || raw.email || '',
    phone: profile.mobile_number || raw.mobile_number || raw.phone || '',
    gender: profile.gender || raw.gender || '',
    date_of_birth: profile.date_of_birth || raw.date_of_birth || '',
    national_id: profile.national_id || raw.national_id || '',
    avatar: profile.avatar_url || raw.avatar_url || raw.avatar || '/assets/img/profiles/avatar-12.jpg',

    // Relationships (IDs)
    department_id: raw.department_id || null,
    job_title_id: raw.job_title_id || null,
    job_group_id: raw.job_group_id || null,
    employment_type_id: raw.employment_type_id || null,
    employment_status_id: raw.employment_status_id || null,
    employer_type_id: raw.employer_type_id || null,

    // Expanded relationship names (if backend returns them)
    department: raw.department_name || raw.department || '',
    role: raw.job_title_name || raw.title_name || raw.role || '',
    employment_type: raw.employment_type_name || '',

    // Dates
    employment_date: raw.employment_date || '',
    termination_date: raw.termination_date || '',

    // Status
    status: mapStatus(raw.employment_status_id ?? 1, raw.is_deleted),
    is_deleted: raw.is_deleted || false,

    notes: raw.notes || '',
  };
}

export default employeeService;
