import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

// Même configuration de test que le projet EventHub.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // describe / it / expect / vi sans import (comme Jest)
    environment: 'jsdom', // un faux navigateur (document, window...)
    setupFiles: ['./src/setupTests.ts'],
    css: false, // les imports .css sont ignorés pendant les tests
    exclude: [...configDefaults.exclude, 'src/demos/**'], // les démos se lancent à part : npm run demo:...
  },
})