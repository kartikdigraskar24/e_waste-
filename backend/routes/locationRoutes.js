// Location Routes
const express = require('express');
const router = express.Router();
const {
  getLocations,
  createLocation,
  deleteLocation,
} = require('../controllers/locationController');
const authMiddleware = require('../middleware/authMiddleware');

// Public: get all disposal locations
router.get('/', getLocations);

// Public: submit a new disposal location
router.post('/public', createLocation);

// Admin-only: add or remove locations
router.post('/', authMiddleware, createLocation);
router.delete('/:id', authMiddleware, deleteLocation);

module.exports = router;
