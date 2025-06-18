import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // importante si vas a usar subdirectorios
  build: {
    outDir: 'dist'
  }
})
