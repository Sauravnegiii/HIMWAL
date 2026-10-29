import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Custom plugin to serve Images and PDFs from the parent HIMWAL root directly in dev
const serveRootAssetsPlugin = () => ({
  name: 'serve-root-assets',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
      if (
        decodedUrl.startsWith('/Images/') ||
        decodedUrl.startsWith('/PDFs/') ||
        decodedUrl === '/LOGO.jpeg'
      ) {
        // Resolve to root HIMWAL directory
        const filePath = path.resolve(__dirname, '..' + decodedUrl);
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.webp': 'image/webp',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.svg': 'image/svg+xml',
              '.pdf': 'application/pdf'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), serveRootAssetsPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
