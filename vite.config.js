import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('react-router-dom')) return 'router-vendor';
            if (id.includes('@radix-ui')) return 'radix-vendor';
            if (id.includes('lucide-react')) return 'lucide-vendor';
            if (id.includes('axios')) return 'axios-vendor';
            if (id.includes('sonner')) return 'sonner-vendor';
            if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n-vendor';
            if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) return 'shadcn-vendor';
          }
        },
      },
    },
  }
})
