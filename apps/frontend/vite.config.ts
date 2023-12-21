import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

const env = loadEnv('development', process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    })

  ],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_POCKETBASE_URL,
        changeOrigin: true,
        ws: true
      },
      '/_/': {
        target: env.VITE_POCKETBASE_URL,
        changeOrigin: true,
        ws: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
