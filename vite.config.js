import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
plugins: [react()],
base: '/cf-as-ab-es-calculator/' // update if repo name differs
});
