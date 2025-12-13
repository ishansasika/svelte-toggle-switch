import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: './src/lib/Switch.svelte',
      name: 'SvelteToggleSwitch'
    }
  }
})
