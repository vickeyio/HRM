import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '../composables/useApi';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null);
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'));

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || user.value?.role_name || 'Admin');
  const userName = computed(() => user.value?.name || user.value?.username || 'Adrian Montero');
  const userEmail = computed(() => user.value?.email || 'adrian@smarthr.co.in');
  const userAvatar = computed(() => user.value?.avatar || '/assets/img/profiles/avatar-12.jpg');

  async function login({ email, password, username, role = 'Admin' }) {
    const loginApi = useApi('/iam/auth/login', { method: 'POST', autoFetch: false });
    await loginApi.request({
      username: username || email,
      password: password
    });

    if (loginApi.error.value) {
      throw loginApi.error.value;
    }

    const data = loginApi.data.value;

    // Extract token — backend returns { dataPayload: { data: { access_token: '...' } } }
    const apiToken =
      data?.dataPayload?.data?.access_token ||
      data?.dataPayload?.token ||
      data?.access_token ||
      data?.token;

    if (!apiToken) {
      throw new Error('Authentication failed: No token returned from server');
    }

    // Extract user info from token claims or response
    const apiUser = data?.dataPayload?.data?.user || data?.user || {
      name: username || email,
      email: email,
      role: role
    };

    token.value = apiToken;
    user.value = apiUser;
    localStorage.setItem('auth_token', apiToken);
    localStorage.setItem('auth_user', JSON.stringify(apiUser));
    return apiUser;
  }

  async function fetchCurrentUser() {
    if (!token.value) return;
    try {
      const meApi = useApi('/iam/auth/me', { autoFetch: false, enableCache: true });
      await meApi.request();
      if (meApi.data.value) {
        user.value = { ...user.value, ...meApi.data.value };
        localStorage.setItem('auth_user', JSON.stringify(user.value));
      }
    } catch (err) {
      console.warn('Could not fetch user profile from /iam/auth/me:', err.message);
    }
  }

  function logout() {
    if (token.value) {
      const logoutApi = useApi('/iam/auth/logout', { method: 'POST', autoFetch: false });
      logoutApi.request().catch(() => {});
    }
    token.value = null;
    user.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  return {
    token,
    user,
    isAuthenticated,
    userRole,
    userName,
    userEmail,
    userAvatar,
    login,
    logout,
    fetchCurrentUser
  };
});
