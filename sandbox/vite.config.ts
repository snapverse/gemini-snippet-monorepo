import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  define: {
    MONOREPO_ROOT: JSON.stringify(path.resolve(__dirname, '../'))
  }
});
