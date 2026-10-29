const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { galleryAlbumsData } = require('../data/seedData');
const { getDBStatus } = require('../config/db');

// Helper to generate full images array for an album
const generateAlbumImages = (album) => {
  const images = [];
  const total = album.total || 0;
  const folder = album.folder || '';
  const ext = album.ext || 'webp';

  for (let i = 1; i <= total; i++) {
    const padded = String(i).padStart(3, '0');
    images.push({
      index: i,
      src: `${folder}/${padded}.${ext}`,
      alt: `${album.title} - Image ${i}`
    });
  }
  return images;
};

// GET all albums
router.get('/', async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const albums = await Gallery.find({}).sort({ createdAt: 1 });
      if (albums.length > 0) return res.json({ success: true, count: albums.length, data: albums });
    }
    res.json({ success: true, count: galleryAlbumsData.length, data: galleryAlbumsData, source: 'fallback' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single album with full paginated or complete images list
router.get('/:albumId', async (req, res) => {
  try {
    const { albumId } = req.params;
    let album = null;

    if (getDBStatus().connected) {
      album = await Gallery.findOne({ albumId });
    }
    if (!album) {
      album = galleryAlbumsData.find(a => a.albumId === albumId);
    }

    if (!album) {
      return res.status(404).json({ success: false, message: 'Gallery album not found' });
    }

    const images = generateAlbumImages(album);
    res.json({
      success: true,
      data: {
        ...album.toObject ? album.toObject() : album,
        images
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
