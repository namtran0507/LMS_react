import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Địa chỉ IP cụ thể
    port: 8001,           // Cổng tùy chỉnh
  },
})
