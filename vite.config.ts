import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Development server configuration
  server: {
    host: "::", // Listen on all network interfaces
    port: 8080,
    strictPort: true, // Don't fall back to another port if 8080 is taken
  },
  
  // Preview server configuration (for production testing)
  preview: {
    host: true, // Allow all hosts including sueandmon.com
    port: 3000,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    }
  },

  // Build configuration
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios']
        }
      }
    }
  },

  // Plugins
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  // Module resolution
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // OptimizeDeps
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['js-big-decimal']
  }
}));
