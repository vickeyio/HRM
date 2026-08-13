import { useApi } from '../composables/useApi';

function extractDataArray(res) {
  if (!res) return [];
  const payload = res.dataPayload || res.data || res;
  const data = payload?.data !== undefined ? payload.data : payload;
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    return Object.entries(data).map(([key, val]) => {
      if (val && typeof val === 'object') {
        return { id: val.id || val.user_id || val.username || key, ...val };
      }
      return { id: key, name: val };
    });
  }
  return [];
}

export const userService = {
  /**
   * Fetch all users with query parameters (page, per-page, search, etc.)
   */
  async getUsers(params = {}) {
    const api = useApi('/iam/users', { method: 'GET', autoFetch: false });
    await api.request(null, params);
    if (api.error.value) throw api.error.value;
    const payload = api.data.value?.dataPayload || api.data.value || {};
    return {
      items: extractDataArray(api.data.value),
      totalCount: payload.totalCount || payload.count || 0,
      totalPages: payload.totalPages || 1,
      currentPage: payload.currentPage || 1,
      perPage: payload.perPage || 25,
      raw: payload
    };
  },

  /**
   * Fetch single user details including profile, status, groups, and activity
   */
  async getUser(username) {
    const api = useApi(`/iam/user/${username}`, { method: 'GET', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value?.dataPayload?.data || api.data.value?.dataPayload || api.data.value?.data || api.data.value;
  },

  /**
   * Create a new user
   */
  async createUser(userData) {
    const api = useApi('/iam/user/create', { method: 'POST', autoFetch: false });
    await api.request(userData);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Update user details
   */
  async updateUser(username, userData) {
    const api = useApi(`/iam/user/${username}`, { method: 'PUT', autoFetch: false });
    await api.request(userData);
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Delete a user
   */
  async deleteUser(username) {
    const api = useApi(`/iam/user/${username}`, { method: 'DELETE', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Toggle user active/inactive status
   */
  async toggleUserStatus(username, status) {
    const api = useApi(`/iam/user/status/${username}`, { method: 'PATCH', autoFetch: false });
    await api.request({ status });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Ban a user
   */
  async banUser(username) {
    const api = useApi(`/iam/user/ban/${username}`, { method: 'POST', autoFetch: false });
    await api.request();
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Assign groups to a user
   */
  async assignGroupsToUser(username, groups) {
    const api = useApi(`/iam/user/assign/${username}`, { method: 'POST', autoFetch: false });
    await api.request({ groups });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  },

  /**
   * Remove groups from a user
   */
  async removeGroupsFromUser(username, groups) {
    const api = useApi(`/iam/user/remove/${username}`, { method: 'POST', autoFetch: false });
    await api.request({ groups });
    if (api.error.value) throw api.error.value;
    return api.data.value;
  }
};

export default userService;
