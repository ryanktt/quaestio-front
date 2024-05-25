import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@constainers': path.resolve(__dirname, './src/constainers/'),
      '@scss': path.resolve(__dirname, './src/scss/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@hoc': path.resolve(__dirname, './src/hoc/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
});
