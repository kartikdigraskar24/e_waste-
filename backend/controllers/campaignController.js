// Campaign Controller — handles CRUD operations for e-waste awareness campaigns
const Campaign = require('../models/Campaign');

// GET /api/campaigns — return all approved campaigns (public)
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: 'approved' }).sort({ date: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching campaigns', error: err.message });
  }
};

// GET /api/campaigns/all — return all campaigns including pending (admin only)
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/campaigns — upload a new campaign (public, requires file upload)
const createCampaign = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Basic validation
    if (!title || !description || !location) {
      return res.status(400).json({ message: 'Title, description, and location are required' });
    }

    // Save the relative URL for the uploaded image
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const campaign = new Campaign({ title, description, location, imageUrl });
    await campaign.save();

    res.status(201).json({ message: 'Campaign submitted for review!', campaign });
  } catch (err) {
    res.status(500).json({ message: 'Server error creating campaign', error: err.message });
  }
};

// PATCH /api/campaigns/:id/approve — admin approves a campaign
const approveCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json({ message: 'Campaign approved', campaign });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/campaigns/:id — admin deletes a campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCampaigns, getAllCampaigns, createCampaign, approveCampaign, deleteCampaign };
