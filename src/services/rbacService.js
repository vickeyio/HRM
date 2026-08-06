import apiClient from './api';

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
      const res = await apiClient.get('/iam/rbac/roles');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /iam/rbac/roles unavailable, using mock fallback:', err.message);
    }
    return initialRoles;
  },

  async getPermissions() {
    try {
      const res = await apiClient.get('/iam/rbac/permissions');
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      if (res.data?.dataPayload?.data && Array.isArray(res.data.dataPayload.data)) return res.data.dataPayload.data;
    } catch (err) {
      console.warn('API /iam/rbac/permissions unavailable, using mock fallback:', err.message);
    }
    return initialPermissions;
  },

  async createRole(roleData) {
    try {
      const res = await apiClient.post('/iam/rbac/role', roleData);
      return res.data;
    } catch (err) {
      console.warn('API create role failed, using local mock creation:', err.message);
      return { id: String(Date.now()), permissionsCount: 0, ...roleData };
    }
  },

  async assignRole(userId, roleId) {
    try {
      const res = await apiClient.post(`/iam/rbac/role/assign/${roleId}`, { userId });
      return res.data;
    } catch (err) {
      console.warn(`API assign role ${roleId} failed:`, err.message);
      return true;
    }
  }
};

export default rbacService;
