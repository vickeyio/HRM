import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiClient from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null);
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'));

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || user.value?.role_name || 'Admin');
  const userName = computed(() => user.value?.name || user.value?.username || 'Adrian Montero');
  const userEmail = computed(() => user.value?.email || 'adrian@smarthr.co.in');
  const userAvatar = computed(() => user.value?.avatar || '/assets/img/profiles/avatar-12.jpg');

  async function login({ email, password, username, role = 'Admin' }) {
    try {
      // Try live API login against IAM endpoint
      const response = await apiClient.post('/iam/auth/login', {
        username: username || email,
        password: password
      });

      const data = response.data;
      const apiToken = data.token || data.access_token || data.dataPayload?.token;
      const apiUser = data.user || data.dataPayload?.user || {
        name: username || email,
        email: email,
        role: role
      };

      if (apiToken) {
        token.value = apiToken;
        user.value = apiUser;
        localStorage.setItem('auth_token', apiToken);
        localStorage.setItem('auth_user', JSON.stringify(apiUser));
        return apiUser;
      }
    } catch (err) {
      console.warn('Backend API connection failed, using fallback mock authentication:', err.message);
    }

    // Fallback simulated authentication
    const mockUser = {
      id: Date.now(),
      name: role === 'Admin' ? 'Adrian Montero' : role === 'HR Manager' ? 'Sarah Connor' : 'Anthony Lewis',
      email: email || (role === 'Admin' ? 'adrian@smarthr.co.in' : role === 'HR Manager' ? 'sarah@smarthr.co.in' : 'anthony@smarthr.co.in'),
      role: role,
      avatar: role === 'Admin' ? '/assets/img/profiles/avatar-12.jpg' : role === 'HR Manager' ? '/assets/img/profiles/avatar-02.jpg' : '/assets/img/profiles/avatar-05.jpg'
    };

    const mockToken = `jwt-token-${Date.now()}`;
    token.value = mockToken;
    user.value = mockUser;

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));

    return mockUser;
  }

  async function fetchCurrentUser() {
    if (!token.value) return;
    try {
      const res = await apiClient.get('/iam/auth/me');
      if (res.data) {
        user.value = { ...user.value, ...res.data };
        localStorage.setItem('auth_user', JSON.stringify(user.value));
      }
    } catch (err) {
      console.warn('Could not fetch user profile from /iam/auth/me:', err.message);
    }
  }

  function logout() {
    if (token.value) {
      apiClient.post('/iam/auth/logout').catch(() => {});
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
