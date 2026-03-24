// Campaign Routes
const express = require('express');
const router = express.Router();
const {
  getCampaigns,
  getAllCampaigns,
  createCampaign,
  approveCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public: get approved campaigns
router.get('/', getCampaigns);

// Public: submit a campaign with an image
router.post('/', upload.single('image'), createCampaign);

// Admin-only routes (require JWT)
router.get('/all', authMiddleware, getAllCampaigns);
router.patch('/:id/approve', authMiddleware, approveCampaign);
router.delete('/:id', authMiddleware, deleteCampaign);

module.exports = router;
