import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define:{
    'import.meta.env.VITE_APP_API_URL': process.env.NODE_ENV === 'production' ? '"https://kent-4ukg.onrender.com"' : '"http://192.168.43.17:4500"'
   },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})