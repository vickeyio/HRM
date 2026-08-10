import { useApi } from '../composables/useApi';
import { unwrapList, unwrapRecord, mapStatus } from '../utils/apiResponseHelper';

/**
 * Holiday (PublicHoliday) Service — aligned with Afya365 HR backend
 *
 * Backend schema (PublicHoliday):
 *   holiday_id, facility_id, holiday_name, holiday_date,
 *   is_recurring, is_paid, double_pay_if_worked, description,
 *   status, is_deleted, created_at, updated_at, created_by, updated_by
 *
 * Endpoints:
 *   GET    /hr/public-holidays          — paginated list
 *   GET    /hr/public-holiday/search    — search
 *   POST   /hr/public-holiday           — create
 *   GET    /hr/public-holiday/{id}      — view
 *   PUT    /hr/public-holiday/{id}      — update
 *   DELETE /hr/public-holiday/{id}      — soft delete
 *   PATCH  /hr/public-holiday/{id}      — restore
 */
export const holidayService = {
  async getAll() {
    const api = useApi('/hr/public-holidays', { autoFetch: false, enableCache: true });
    await api.request();
    const records = unwrapList(api.data.value);
    return records.map(normalizeHoliday);
  },

  async search(query) {
    const api = useApi('/hr/public-holiday/search', { autoFetch: false });
    await api.request(null, { q: query });
    const records = unwrapList(api.data.value);
    return records.map(normalizeHoliday);
  },

  async getById(id) {
    const api = useApi(`/hr/public-holiday/${id}`, { autoFetch: false });
    await api.request();
    const record = unwrapRecord(api.data.value);
    return record ? normalizeHoliday(record) : null;
  },

  async create(data) {
    const api = useApi('/hr/public-holiday', { method: 'POST', autoFetch: false });
    await api.request(toHolidayPayload(data));
    const record = unwrapRecord(api.data.value);
    return record ? normalizeHoliday(record) : data;
  },

  async update(id, data) {
    const api = useApi(`/hr/public-holiday/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(toHolidayPayload(data));
    const record = unwrapRecord(api.data.value);
    return record ? normalizeHoliday(record) : { ...data, holiday_id: id };
  },

  async delete(id) {
    const api = useApi(`/hr/public-holiday/${id}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    return true;
  },

  async restore(id) {
    const api = useApi(`/hr/public-holiday/${id}`, { method: 'PATCH', autoFetch: false });
    await api.request();
    return true;
  }
};

/**
 * Normalize a backend PublicHoliday to frontend-friendly shape.
 */
function normalizeHoliday(raw) {
  return {
    holiday_id: raw.holiday_id,
    title: raw.holiday_name || '',
    holiday_name: raw.holiday_name || '',
    date: raw.holiday_date || '',
    holiday_date: raw.holiday_date || '',
    description: raw.description || '',
    is_recurring: raw.is_recurring || false,
    is_paid: raw.is_paid || false,
    double_pay_if_worked: raw.double_pay_if_worked || false,
    status: mapStatus(raw.status ?? 1, raw.is_deleted),
    is_deleted: raw.is_deleted || false,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}

/**
 * Transform frontend form data to backend payload.
 */
function toHolidayPayload(data) {
  return {
    holiday_name: data.holiday_name || data.title,
    holiday_date: data.holiday_date || data.date,
    description: data.description || '',
    is_recurring: data.is_recurring || false,
    is_paid: data.is_paid || false,
    double_pay_if_worked: data.double_pay_if_worked || false,
  };
}

export default holidayService;
