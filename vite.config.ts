import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'vite-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy([
      { src: 'src/assets/images', dest: 'dist/assets/images' },
    ]),
  ],
})
