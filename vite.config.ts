import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  base: '/pulse-wear-ecommerce/', // Nombre del GitHub
  resolve: {
    alias: {
      // Esto permite que import { ... } from '@/src/...' funcione siempre
      '@': path.resolve(__dirname, './'),
    },
  },
})
/*export default defineConfig({
  plugins: [react()],
  base: './', // Esto hace que las rutas sean relativas
})*/
/*export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
*/