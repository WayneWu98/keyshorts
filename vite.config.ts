import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  mode: 'production',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'keyshorts',
      fileName: format => `keyshorts.${format}.js`,
    },
    sourcemap: true,
  },
})