import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      fs: {
        allow: [path.resolve(__dirname), 'src', 'public', 'node_modules'],
      },
    },
    // Exclude server-side dependencies from optimization
    optimizeDeps: {
      exclude: ['@supabase/supabase-js'],
    },
    // Expose ONLY safe client-side variables (anon key is safe, service_role is NOT)
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY || ''),
    },
  };
});
