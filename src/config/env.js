const env = import.meta.env || {};

export const config = {
  apiBaseUrl: env.VITE_API_BASE_URL || 'http://localhost:8000/v2',
  appName: env.VITE_APP_NAME || 'SmartHR Management',
  timeout: 15000
};

export default config;
