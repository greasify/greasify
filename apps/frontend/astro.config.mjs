import { loadEnv } from "vite";
import vue from '@astrojs/vue'
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config'

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    server: {
      proxy: {
        '/api': {
          target: env.POCKETBASE_URL,
          changeOrigin: true,
          ws: true
        },
        '/_/': {
          target: env.POCKETBASE_URL,
          changeOrigin: true,
          ws: true
        }
      }
    }
  },
  integrations: [
    vue({
      appEntrypoint: '/src/_app',
    }),
  ]
})
