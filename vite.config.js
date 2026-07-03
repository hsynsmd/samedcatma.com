import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // React'in tek kopya olmasını garantile (motion ile çakışmayı önler)
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['motion/react', 'react', 'react-dom', 'lenis', 'gsap'],
  },
})
