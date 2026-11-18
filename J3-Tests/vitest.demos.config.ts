import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Configuration des démos (src/demos) : npm run demo:... et npm run erreur:...
// Les fichiers de src/demos/erreurs contiennent un test ROUGE (ou un warning) et sa version corrigée, exprès.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/demos/**/*.test.{ts,tsx}'],
    silent: false, // toujours afficher les console.error (le warning act), même pour un test vert
  },
})