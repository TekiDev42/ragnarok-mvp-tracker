import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/Components') },
      { find: '@store', replacement: resolve(__dirname, 'src/Store') },
      { find: '@constants', replacement: resolve(__dirname, 'src/Constants') },
      { find: '@utils', replacement: resolve(__dirname, 'src/Utils') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@socket', replacement: resolve(__dirname, 'src/Socket') },
    ]
  },
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          luxon: ['luxon'],
          redux: ['react-redux', '@reduxjs/toolkit'],
          tablerIcons: ['@tabler/icons-react'],
          mantineCore: ['@mantine/core'],
          mantineNotifications: ['@mantine/notifications'],
          mantineCharts: ['@mantine/charts'],
          mantineDates: ['@mantine/dates'],
          mantineForm: ['@mantine/form'],
          mantineHooks: ['@mantine/hooks'],
          mantineModals: ['@mantine/modals'],
        }
      }
    },
  }
})
