import { useApi } from '../composables/useApi';

function extractDataArray(res) {
  if (!res) return [];
  const payload = res.dataPayload || res.data || res;
  const data = payload?.data !== undefined ? payload.data : payload;
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    // If it's a map like { sa: { ... }, user: { ... } }
    return Object.entries(data).map(([key, val]) => {
      if (val && typeof val === 'object') {
        return { id: val.id || val.role_id || val.group_id || val.permission_id || key, ...val };
      }
      return { id: key, name: val };
    });
  }
  return [];
}

export const rbacService = {
  /**
   * Fetch all roles with optional query parameters
   */
  async getRoles(params = {}) {
    const api = useApi('/iam/rbac/roles', { method: 'GET', autoFetch: false });
    await api.request(null, params);
    if (api.error.value) throw api.error.value;
    return extractDataArray(api.data.value);
  },

  /**
   * Fetch single role details including available and assigned items
   */
  async getRole(id) {
    const api = useApi(`/iam/rbac/role/${id}`, { method: 'GET', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value?.dataPayload?.data || api.data.value?.data || api.data.value;
  },

  /**
   * Create a new role
   */
  async createRole(roleData) {
    const api = useApi('/iam/rbac/role', { method: 'POST', autoFetch: false });
    await api.request(roleData);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Update an existing role
   */
  async updateRole(id, roleData) {
    const api = useApi(`/iam/rbac/role/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(roleData);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Delete a role
   */
  async deleteRole(id) {
    const api = useApi(`/iam/rbac/role/${id}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Assign permissions to a role
   */
  async assignPermissionsToRole(roleId, permissions) {
    const api = useApi(`/iam/rbac/role/assign/${roleId}`, { method: 'POST', autoFetch: false });
    await api.request({ permissions });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Remove permissions from a role
   */
  async removePermissionsFromRole(roleId, permissions) {
    const api = useApi(`/iam/rbac/role/remove/${roleId}`, { method: 'POST', autoFetch: false });
    await api.request({ permissions });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Fetch all permissions
   */
  async getPermissions(params = {}) {
    const api = useApi('/iam/rbac/permissions', { method: 'GET', autoFetch: false });
    await api.request(null, params);
    if (api.error.value) throw api.error.value;
    return extractDataArray(api.data.value);
  },

  /**
   * Fetch single permission details
   */
  async getPermission(id) {
    const api = useApi(`/iam/rbac/permission/${id}`, { method: 'GET', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value?.dataPayload?.data || api.data.value?.data || api.data.value;
  },

  /**
   * Update a permission
   */
  async updatePermission(id, data) {
    const api = useApi(`/iam/rbac/permission/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(data);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Fetch all groups
   */
  async getGroups(params = {}) {
    const api = useApi('/iam/rbac/groups', { method: 'GET', autoFetch: false });
    await api.request(null, params);
    if (api.error.value) throw api.error.value;
    return extractDataArray(api.data.value);
  },

  /**
   * Fetch single group details including assigned roles
   */
  async getGroup(id) {
    const api = useApi(`/iam/rbac/group/${id}`, { method: 'GET', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value?.dataPayload?.data || api.data.value?.data || api.data.value;
  },

  /**
   * Create a new group
   */
  async createGroup(data) {
    const api = useApi('/iam/rbac/group', { method: 'POST', autoFetch: false });
    await api.request(data);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Update an existing group
   */
  async updateGroup(id, data) {
    const api = useApi(`/iam/rbac/group/${id}`, { method: 'PUT', autoFetch: false });
    await api.request(data);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Delete a group
   */
  async deleteGroup(id) {
    const api = useApi(`/iam/rbac/group/${id}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Assign roles to a group
   */
  async assignRolesToGroup(groupId, roles) {
    const api = useApi(`/iam/rbac/group/assign/${groupId}`, { method: 'POST', autoFetch: false });
    await api.request({ roles });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Remove roles from a group
   */
  async removeRolesFromGroup(groupId, roles) {
    const api = useApi(`/iam/rbac/group/remove/${groupId}`, { method: 'POST', autoFetch: false });
    await api.request({ roles });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Fetch system rules list for dropdowns
   */
  async getRules() {
    try {
      const api = useApi('/iam/rbac/rules', { method: 'GET', autoFetch: false });
      await api.request();
      return extractDataArray(api.data.value);
    } catch (e) {
      return [];
    }
  }
};

export default rbacService;
