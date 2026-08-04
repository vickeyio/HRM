export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  useMock: import.meta.env.VITE_USE_MOCK === 'true',
  appName: import.meta.env.VITE_APP_NAME || 'HRM',
};
