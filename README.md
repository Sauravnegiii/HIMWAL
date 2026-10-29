# HIMWAL - Himalayan Women Awareness & Livelihood Society (MERN Stack)

HIMWAL is an Uttarakhand-based NGO (Registration Number: UK06008122023012444) founded under the Societies Registration Act 21, 1860, dedicated to environmental conservation, sustainable Himalayan livelihoods, and preserving Uttarakhand's intangible cultural heritage.

This repository hosts the official web application built using the full **MERN Stack** (MongoDB, Express.js, React + Vite, Node.js).

---

## 🏗️ Architecture Overview

```
HIMWAL/
├── client/                     # Frontend (React 18 + Vite + React Router DOM)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, TeamModal, LightboxModal, OrderInquiryModal, ImpactCounter
│   │   ├── pages/              # Home, About, Programs, Products, Gallery, AlbumGallery, News, Archive, AdminPortal
│   │   ├── App.jsx             # Client-side routing with ScrollToTop
│   │   ├── index.css           # Full design system preserving authentic Himalayan styles
│   │   └── main.jsx
│   ├── vite.config.js          # Vite config with zero-copy root asset streaming
│   └── package.json
│
├── server/                     # Backend API (Node.js + Express.js + Mongoose)
│   ├── src/
│   │   ├── config/db.js        # MongoDB connection with graceful fallback mode
│   │   ├── models/             # Product, Program, TeamMember, News, Gallery, ContactMessage
│   │   ├── routes/             # REST API endpoints for all collections
│   │   ├── data/seedData.js    # Comprehensive initial Himalayan dataset
│   │   ├── seeds/seed.js       # Database seeder script
│   │   └── index.js            # Express server entry point with static media serving
│   ├── .env.example
│   └── package.json
│
├── legacy/                     # Complete archive of original static HTML/JS pages
├── Images/                     # 250MB authentic photo archive (about, millet, IHBT, CULTURAL, Environment, products, etc.)
├── PDFs/                       # Official documents (finalcatalogue.pdf, mou.pdf, cultural.pdf, project.pdf)
├── LOGO.jpeg                   # Society emblem
└── package.json                # Root package with concurrent dev runner
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on v24)
- **npm** v9+
- *(Optional)* **MongoDB** running locally (`mongodb://127.0.0.1:27017/himwal`) or a MongoDB Atlas URI in `server/.env`.
  > *Note: If MongoDB is offline, the backend automatically runs in graceful fallback mode using the authentic Himalayan seed data so the frontend is immediately functional.*

### 2. Install All Dependencies
From the repository root:
```bash
npm run install:all
```
*(Or install in root, `server/`, and `client/` individually)*

### 3. Run Development Environment
To start both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

You can also run them in separate terminals:
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Frontend Client
npm run client
```

### 4. Seed the Database (Optional)
When your MongoDB instance is running:
```bash
npm run seed
```

---

## 📡 REST API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health check & database connection status |
| `/api/products` | `GET` | List all community products (`?category=...`) |
| `/api/products` | `POST` | Add a new community product |
| `/api/programs` | `GET` | Four core pillars & initiatives (`?category=...`) |
| `/api/team` | `GET` | Team members & Advisors (`?isAdvisor=true\|false`) |
| `/api/news` | `GET` | Announcements & featured reports (`?type=...`) |
| `/api/gallery` | `GET` | List all 6 photo albums |
| `/api/gallery/:albumId` | `GET` | Album metadata and full image list |
| `/api/contact` | `POST` | Submit general contact message or product order inquiry |
| `/api/contact` | `GET` | Retrieve logged inquiries (for management portal) |
| `/api/stats` | `GET` | Aggregated metrics, impact numbers, and counts |

---

## 🌟 Key Features

1. **Pixel-Perfect Aesthetic Preservation**:
   - Retains all exact fonts (`Merriweather`, `Open Sans`), Himalayan earth-toned color palettes (`#1c865c`, `#f2994a`), badges, and micro-interactions.
2. **Interactive Modals**:
   - **Team & Advisor Profile Modal**: Click on Dr. Nand Kishore Hatwal, Dr. Deepika Dimri, Shri Chandi Prasad Bhatt, etc., to read their complete biography.
   - **Order & Product Enquiry Modal**: Submit order inquiries with automated WhatsApp pre-filled messaging.
   - **Full-Screen Image Lightbox**: Accessible modal with Next/Previous navigation and keyboard controls.
3. **Dedicated Admin & Management Portal**:
   - Available at `/admin` to monitor server status, review inquiries, and publish new products.
4. **Zero Broken Assets**:
   - Built-in streaming middleware in Vite and Express serving `/Images` and `/PDFs` with zero file duplication.

---

## 👥 Credits
- **Organization**: Himalayan Women Awareness & Livelihood Society (UK06008122023012444)
- **Technical Development**: Saurav Singh Negi & Aakash Singh Mahori
