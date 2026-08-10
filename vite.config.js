import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
    server: {
      port: Number(env.VITE_DEV_PORT) || 5173,
      proxy: {
        '/v2': {
          target: env.VITE_API_TARGET || 'http://localhost:9364',
          changeOrigin: true,
        },
      },
    },
  }
})
