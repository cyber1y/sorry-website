import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/sorry-website/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.trycloudflare.com', '.githubpreview.dev', '.localtest.me'],
  },
  preview: {
    allowedHosts: ['.trycloudflare.com', '.githubpreview.dev', '.localtest.me'],
  },
})