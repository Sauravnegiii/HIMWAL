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

// Plugin to copy Images, PDFs, and LOGO to dist directory on build and set up 404.html for GitHub Pages
const copyAssetsPlugin = () => ({
  name: 'copy-assets',
  closeBundle() {
    const distDir = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(distDir)) return;

    // 1. Copy Images
    const distImages = path.resolve(distDir, 'Images');
    const rootImages = path.resolve(__dirname, '../Images');
    if (fs.existsSync(rootImages) && !fs.existsSync(distImages)) {
      console.log('Copying Images to dist...');
      fs.cpSync(rootImages, distImages, { recursive: true });
    }

    // 2. Copy PDFs
    const distPdfs = path.resolve(distDir, 'PDFs');
    const rootPdfs = path.resolve(__dirname, '../PDFs');
    if (fs.existsSync(rootPdfs) && !fs.existsSync(distPdfs)) {
      console.log('Copying PDFs to dist...');
      fs.cpSync(rootPdfs, distPdfs, { recursive: true });
    }

    // 3. Copy LOGO.jpeg
    const distLogo = path.resolve(distDir, 'LOGO.jpeg');
    const rootLogo = path.resolve(__dirname, '../LOGO.jpeg');
    if (fs.existsSync(rootLogo) && !fs.existsSync(distLogo)) {
      fs.copyFileSync(rootLogo, distLogo);
    }

    // 4. Create 404.html for GitHub Pages SPA fallback
    const distIndex = path.resolve(distDir, 'index.html');
    const dist404 = path.resolve(distDir, '404.html');
    if (fs.existsSync(distIndex)) {
      fs.copyFileSync(distIndex, dist404);
    }
  }
});

const base = process.env.GITHUB_PAGES === 'true' ? '/Himwal/' : (process.env.VITE_BASE_PATH || '/');

export default defineConfig({
  base,
  plugins: [react(), serveRootAssetsPlugin(), copyAssetsPlugin()],
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
