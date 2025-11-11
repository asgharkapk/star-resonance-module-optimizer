import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/star-resonance-module-optimizer/', // ⚠️ change to your repo name
})
