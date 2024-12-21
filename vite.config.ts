import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '.',
  plugins: [react()],
  server: {
    port: 5678,
  },
  resolve: {
    alias: [
      { find: '@pages', replacement: path.join(process.cwd(), 'src/pages') },
      {
        find: '@components',
        replacement: path.join(process.cwd(), 'src/components'),
      },
      { find: '@theme', replacement: path.join(process.cwd(), 'src/theme') },
      {
        find: '@contexts',
        replacement: path.join(process.cwd(), 'src/contexts'),
      },
      { find: '@utils', replacement: path.join(process.cwd(), 'src/utils') },
      { find: '@features', replacement: path.join(process.cwd(), 'src/features') },
      { find: '@hooks', replacement: path.join(process.cwd(), 'src/hooks') },
      { find: '@stores', replacement: path.join(process.cwd(), 'src/stores') },
      { find: '@locales', replacement: path.join(process.cwd(), 'src/locales') },
      { find: '@data', replacement: path.join(process.cwd(), 'src/data') },
    ],
  },
});
