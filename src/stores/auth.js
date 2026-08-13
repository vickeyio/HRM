import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '../composables/useApi';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null);
  const refreshTokenValue = ref(localStorage.getItem('auth_refresh_token') || null);
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'));

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || user.value?.role_name || 'Admin');
  const userName = computed(() => user.value?.name || user.value?.username || 'Adrian Montero');
  const userEmail = computed(() => user.value?.email || 'adrian@smarthr.co.in');
  const userAvatar = computed(() => user.value?.avatar || '/assets/img/profiles/avatar-12.jpg');

  /**
   * Login user and save tokens
   */
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

    const apiToken =
      data?.dataPayload?.data?.access_token ||
      data?.dataPayload?.token ||
      data?.access_token ||
      data?.token;

    const apiRefreshToken =
      data?.dataPayload?.data?.refresh_token ||
      data?.dataPayload?.refresh_token ||
      data?.refresh_token;

    if (!apiToken) {
      throw new Error('Authentication failed: No token returned from server');
    }

    const apiUser = data?.dataPayload?.data?.user || data?.user || {
      name: username || email,
      email: email,
      role: role
    };

    token.value = apiToken;
    if (apiRefreshToken) {
      refreshTokenValue.value = apiRefreshToken;
      localStorage.setItem('auth_refresh_token', apiRefreshToken);
    }

    user.value = apiUser;
    localStorage.setItem('auth_token', apiToken);
    localStorage.setItem('auth_user', JSON.stringify(apiUser));
    return apiUser;
  }

  /**
   * Register a new user account
   */
  async function register(registerData) {
    const registerApi = useApi('/iam/auth/register', { method: 'POST', autoFetch: false });
    await registerApi.request(registerData);

    if (registerApi.error.value) {
      throw registerApi.error.value;
    }

    return registerApi.data.value;
  }

  /**
   * Activate account with verification token from email
   */
  async function activateAccount(tokenParam) {
    const activateApi = useApi('/iam/auth/activate', { method: 'GET', autoFetch: false });
    await activateApi.request(null, { token: tokenParam });

    if (activateApi.error.value) {
      throw activateApi.error.value;
    }

    return activateApi.data.value;
  }

  /**
   * Request password reset email
   */
  async function requestPasswordReset(usernameOrEmail) {
    const resetReqApi = useApi('/iam/auth/request-password-reset', { method: 'POST', autoFetch: false });
    await resetReqApi.request({
      username: usernameOrEmail
    });

    if (resetReqApi.error.value) {
      throw resetReqApi.error.value;
    }

    return resetReqApi.data.value;
  }

  /**
   * Reset password with token from email link
   */
  async function resetPassword(tokenParam, { password, confirmPassword }) {
    const resetApi = useApi('/iam/auth/reset-password', { method: 'PUT', autoFetch: false });
    await resetApi.request({ password, confirmPassword }, { token: tokenParam });

    if (resetApi.error.value) {
      throw resetApi.error.value;
    }

    return resetApi.data.value;
  }

  /**
   * Change password for currently authenticated user
   */
  async function changePassword({ currentPassword, newPassword, confirmNewPassword }) {
    const changeApi = useApi('/iam/auth/change-password', { method: 'PUT', autoFetch: false });
    await changeApi.request({
      currentPassword,
      newPassword,
      confirmNewPassword
    });

    if (changeApi.error.value) {
      throw changeApi.error.value;
    }

    return changeApi.data.value;
  }

  /**
   * Refresh access token
   */
  async function refreshToken() {
    const currentRefresh = refreshTokenValue.value || localStorage.getItem('auth_refresh_token');
    const refreshApi = useApi('/iam/auth/refresh', { method: 'POST', autoFetch: false });
    await refreshApi.request(currentRefresh ? { refresh_token: currentRefresh } : null);

    if (refreshApi.error.value) {
      throw refreshApi.error.value;
    }

    const data = refreshApi.data.value;
    const newAccessToken =
      data?.dataPayload?.data?.access_token ||
      data?.dataPayload?.token ||
      data?.access_token ||
      data?.token;

    if (newAccessToken) {
      token.value = newAccessToken;
      localStorage.setItem('auth_token', newAccessToken);
    }

    return newAccessToken;
  }

  /**
   * Fetch logged-in user profile
   */
  async function fetchCurrentUser() {
    if (!token.value) return;
    try {
      const meApi = useApi('/iam/auth/me', { autoFetch: false, enableCache: true });
      await meApi.request();
      if (meApi.data.value) {
        const userData = meApi.data.value?.dataPayload?.data || meApi.data.value?.data || meApi.data.value;
        user.value = { ...user.value, ...userData };
        localStorage.setItem('auth_user', JSON.stringify(user.value));
      }
    } catch (err) {
      console.warn('Could not fetch user profile from /iam/auth/me:', err.message);
    }
  }

  /**
   * Logout user from device
   */
  async function logout({ device = 'web', callApi = true } = {}) {
    const currentToken = token.value || localStorage.getItem('auth_token');

    if (callApi && currentToken) {
      try {
        const logoutApi = useApi('/iam/auth/logout', { method: 'POST', autoFetch: false });
        await logoutApi.request({ device });
      } catch (e) {
        console.warn('Logout API call finished with error:', e);
      }
    }

    token.value = null;
    refreshTokenValue.value = null;
    user.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh_token');
    localStorage.removeItem('auth_user');
  }

  return {
    token,
    refreshTokenValue,
    user,
    isAuthenticated,
    userRole,
    userName,
    userEmail,
    userAvatar,
    login,
    register,
    activateAccount,
    requestPasswordReset,
    resetPassword,
    changePassword,
    refreshToken,
    logout,
    fetchCurrentUser
  };
});
