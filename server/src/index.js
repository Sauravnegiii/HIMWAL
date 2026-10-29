require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getDBStatus } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Images, PDFs, and LOGO directly from root folders
const rootDir = path.resolve(__dirname, '../../');
app.use('/Images', express.static(path.join(rootDir, 'Images')));
app.use('/PDFs', express.static(path.join(rootDir, 'PDFs')));
app.get('/LOGO.jpeg', (req, res) => res.sendFile(path.join(rootDir, 'LOGO.jpeg')));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/team', require('./routes/team'));
app.use('/api/news', require('./routes/news'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/stats', require('./routes/stats'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    organization: 'HIMWAL Society (Himalayan Women Awareness & Livelihood Society)',
    database: getDBStatus()
  });
});

// Production: serve static build from client/dist
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// 404 handler for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🌲 HIMWAL Society API Server running on port ${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});
