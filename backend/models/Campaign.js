// Campaign Model — stores awareness campaigns uploaded by users
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Campaign description is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    imageUrl: {
      type: String, // relative path to uploaded file
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Admin can approve or reject; default is 'pending'
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
