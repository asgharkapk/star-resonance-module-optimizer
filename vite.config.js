import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
plugins: [react()],
base: '/star-resonance-module-optimizer/' // update if repo name differs
});
