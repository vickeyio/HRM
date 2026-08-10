import { useApi } from '../composables/useApi';

export const initialRoles = [
  { id: '1', name: 'Administrator', description: 'Full access to all system modules and settings', permissionsCount: 45 },
  { id: '2', name: 'HR Manager', description: 'Access to Core HR, Time Off, Payroll, and Recruitment', permissionsCount: 32 },
  { id: '3', name: 'Employee', description: 'Employee Self-Service access for personal requests', permissionsCount: 12 }
];

export const initialPermissions = [
  { id: '1', name: 'manage_employees', module: 'Employees', description: 'Create, update, and delete employee records' },
  { id: '2', name: 'manage_departments', module: 'Departments', description: 'Manage company organizational hierarchy' },
  { id: '3', name: 'approve_leaves', module: 'Leaves', description: 'Approve or reject employee leave requests' },
  { id: '4', name: 'manage_payroll', module: 'Payroll', description: 'Process monthly salaries and payslips' },
  { id: '5', name: 'view_reports', module: 'Analytics', description: 'Access executive HR reports and analytics' }
];

export const rbacService = {
  async getRoles() {
    try {
      const api = useApi('/iam/rbac/roles', { autoFetch: false, enableCache: true });
      await api.request();
      const res = api.data.value;
      if (res && Array.isArray(res)) return res;
      if (res?.data && Array.isArray(res.data)) return res.data;
      if (res?.dataPayload?.data && Array.isArray(res.dataPayload.data)) return res.dataPayload.data;
    } catch (err) {
      console.warn('API /iam/rbac/roles unavailable, using mock fallback:', err.message);
    }
    return initialRoles;
  },

  async getPermissions() {
    try {
      const api = useApi('/iam/rbac/permissions', { autoFetch: false, enableCache: true });
      await api.request();
      const res = api.data.value;
      if (res && Array.isArray(res)) return res;
      if (res?.data && Array.isArray(res.data)) return res.data;
      if (res?.dataPayload?.data && Array.isArray(res.dataPayload.data)) return res.dataPayload.data;
    } catch (err) {
      console.warn('API /iam/rbac/permissions unavailable, using mock fallback:', err.message);
    }
    return initialPermissions;
  },

  async createRole(roleData) {
    try {
      const api = useApi('/iam/rbac/role', { method: 'POST', autoFetch: false });
      await api.request(roleData);
      return api.data.value;
    } catch (err) {
      console.warn('API create role failed, using local mock creation:', err.message);
      return { id: String(Date.now()), permissionsCount: 0, ...roleData };
    }
  },

  async assignRole(userId, roleId) {
    try {
      const api = useApi(`/iam/rbac/role/assign/${roleId}`, { method: 'POST', autoFetch: false });
      await api.request({ userId });
      return api.data.value;
    } catch (err) {
      console.warn(`API assign role ${roleId} failed:`, err.message);
      return true;
    }
  }
};

export default rbacService;
