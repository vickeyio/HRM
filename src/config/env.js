const env = import.meta.env || {};

export const config = {
  apiBaseUrl: env.VITE_API_BASE_URL,
  appName: env.VITE_APP_NAME || 'SmartHR Management',
  useMock: env.VITE_USE_MOCK === 'true',
  timeout: 15000
};

export default config;
