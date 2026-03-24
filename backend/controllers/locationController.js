// Location Controller — manages e-waste disposal plant records
const Location = require('../models/Location');

// GET /api/locations — return all disposal plant locations (public)
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching locations', error: err.message });
  }
};

// POST /api/locations — admin adds a new disposal location
const createLocation = async (req, res) => {
  try {
    const { plantName, address, contactNumber, mapsLink } = req.body;

    if (!plantName || !address || !contactNumber) {
      return res.status(400).json({ message: 'Plant name, address and contact are required' });
    }

    const location = new Location({ plantName, address, contactNumber, mapsLink });
    await location.save();
    res.status(201).json({ message: 'Location added successfully', location });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/locations/:id — admin removes a disposal location
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getLocations, createLocation, deleteLocation };
