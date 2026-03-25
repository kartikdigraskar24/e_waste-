/**
 * Smart E-Waste Management System — Express Server Entry Point
 * Configured for both local development AND Vercel serverless deployment
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const campaignRoutes = require('./routes/campaignRoutes');
const locationRoutes = require('./routes/locationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS — allow localhost (dev) AND any Vercel/production domain ────────────
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow any localhost port for local development
    if (origin.startsWith('http://localhost:')) return callback(null, true);
    // Allow any vercel.app domain
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    // Allow explicitly configured frontend URL
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) return callback(null, true);
    // For same-origin requests in production (frontend and backend on same domain)
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded campaign images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/campaigns', campaignRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'E-Waste API is running' });
});

// 404 fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected successfully');
};

// Always connect and start listening (works on Render as a regular Node server)
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
