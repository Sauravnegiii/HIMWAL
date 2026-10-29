require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Product = require('../models/Product');
const Program = require('../models/Program');
const TeamMember = require('../models/TeamMember');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const {
  programsData,
  productsData,
  teamData,
  newsData,
  galleryAlbumsData
} = require('../data/seedData');

const seedAll = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('[Seed Error] Could not connect to MongoDB. Ensure your MONGODB_URI is valid and MongoDB is running.');
    process.exit(1);
  }

  try {
    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      Product.deleteMany({}),
      Program.deleteMany({}),
      TeamMember.deleteMany({}),
      News.deleteMany({}),
      Gallery.deleteMany({})
    ]);

    console.log('[Seed] Seeding Products...');
    await Product.insertMany(productsData);

    console.log('[Seed] Seeding Programs...');
    await Program.insertMany(programsData);

    console.log('[Seed] Seeding Team Members & Advisors...');
    await TeamMember.insertMany(teamData);

    console.log('[Seed] Seeding News & Reports...');
    await News.insertMany(newsData);

    console.log('[Seed] Seeding Gallery Albums...');
    await Gallery.insertMany(galleryAlbumsData);

    console.log('✅ [Seed Success] Database populated successfully with all HIMWAL data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Error]:', error);
    process.exit(1);
  }
};

seedAll();
