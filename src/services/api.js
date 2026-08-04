import axios from 'axios';
import { config } from '../config/env';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    requestConfig.headers['Content-Type'] = 'application/json';
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const resp = await axios.post(
            `${config.apiBaseUrl}/auth/refresh`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );
          const { token } = resp.data;
          localStorage.setItem('auth_token', token);
          processQueue(null, token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      console.warn('Access denied — insufficient permissions');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
