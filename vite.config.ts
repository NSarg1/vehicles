import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/vehicles/',
    plugins: [react()],
    resolve: { alias: { src: '/src' } },
    server: { port: 3001 },
  };
});
