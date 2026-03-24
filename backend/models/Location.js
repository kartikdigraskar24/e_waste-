// Location Model — stores e-waste disposal plant details
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    plantName: {
      type: String,
      required: [true, 'Plant name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    // Google Maps link for navigation
    mapsLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
