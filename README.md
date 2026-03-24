# Smart E-Waste Management System 🌱♻️

A full-stack CEP project built with **React.js**, **Node.js/Express**, and **MongoDB**.

---

## 📁 Project Structure

```
e_waste/
├── backend/          # Node.js + Express REST API
│   ├── models/       # Mongoose models (Campaign, Location, Admin)
│   ├── routes/       # API route definitions
│   ├── controllers/  # Business logic
│   ├── middleware/   # JWT auth + Multer file upload
│   ├── uploads/      # Uploaded campaign images (auto-created)
│   ├── server.js     # Main Express server
│   ├── seed.js       # Database seeder (run once)
│   └── .env          # Environment variables
│
└── frontend/         # React + Vite SPA
    └── src/
        ├── pages/    # All 10 pages
        ├── components/ # Navbar, Footer
        └── index.css # Global design system
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm

---

### 1. Set up MongoDB

**Option A: Local MongoDB**
Install MongoDB Community: https://www.mongodb.com/try/download/community

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud — Recommended)**
1. Create a free cluster at https://cloud.mongodb.com
2. Get your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/ewaste`)
3. Paste it into `backend/.env` as `MONGO_URI`

---

### 2. Configure Backend

Edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ewaste
JWT_SECRET=ewaste_super_secret_key_2024
ADMIN_EMAIL=admin@ewaste.com
```

---

### 3. Start Backend

```bash
cd backend
npm install      # (already done)
node seed.js     # Seed DB (run ONCE to populate locations & admin)
npm start        # Start Express server on port 5000
```

The backend API will be available at `http://localhost:5000`

---

### 4. Start Frontend

```bash
cd frontend
npm install      # (already done)
npm run dev      # Start Vite dev server on port 5173
```

Open `http://localhost:5173` in your browser.

---

## 🔑 Admin Credentials

Created by the seed script:
- **Email:** `admin@ewaste.com`
- **Password:** `Admin@123`

Go to `http://localhost:5173/admin/login` to sign in.

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/campaigns` | Public | Get approved campaigns |
| POST | `/api/campaigns` | Public | Submit new campaign (multipart) |
| GET | `/api/campaigns/all` | Admin | Get ALL campaigns |
| PATCH | `/api/campaigns/:id/approve` | Admin | Approve a campaign |
| DELETE | `/api/campaigns/:id` | Admin | Delete a campaign |
| GET | `/api/locations` | Public | Get all disposal locations |
| POST | `/api/locations` | Admin | Add new disposal location |
| DELETE | `/api/locations/:id` | Admin | Delete a location |
| POST | `/api/admin/login` | Public | Admin login → JWT token |
| GET | `/api/health` | Public | Health check |

---

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, stats, CTAs |
| `/about` | About E-Waste |
| `/types` | Types of E-Waste (9 categories) |
| `/impact` | Environmental Impact |
| `/recycling` | Recycling Process (5 steps) |
| `/locations` | Disposal Locations (from DB) |
| `/campaigns` | Awareness Campaigns (from DB) |
| `/upload` | Upload Campaign Form |
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Admin Dashboard |

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React Router v6, Axios, plain CSS
- **Backend:** Node.js, Express.js, Mongoose, JWT, Multer, bcryptjs
- **Database:** MongoDB
