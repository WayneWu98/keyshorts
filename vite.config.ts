import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
  plugins: [
    dts({ insertTypesEntry: true })
  ]
})