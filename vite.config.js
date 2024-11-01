import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Specifies the output directory as 'build'
  },
  base: "https://irynailliukhina.github.io/tic-tac-toe/"
})
