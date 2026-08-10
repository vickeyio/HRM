import axios from 'axios';
import config from '../config/env';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: Attach JWT Bearer Token
apiClient.interceptors.request.use(
  (reqConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && !reqConfig.headers.Authorization) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }
    return reqConfig;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401 Unauthorized and auto-logout
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const { useAuthStore } = await import('../stores/auth');
        const authStore = useAuthStore();
        authStore.logout();
      } catch (e) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }

      if (window.location.pathname !== '/login' && window.location.pathname !== '/index') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
