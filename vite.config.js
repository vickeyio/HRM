import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
    server: {
      port: Number(env.VITE_DEV_PORT) || 5173,
    },
  }
})
