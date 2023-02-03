const express = require('express');
const router = express.Router();
const {
    getCampaigns,
    postCampaign,
    updateCampaign,
    leaveCampaign,
    deleteCampaign,
} = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCampaigns);

router.post('/', protect, postCampaign);

router.put('/', protect, updateCampaign);

router.put('/leave', protect, leaveCampaign);

router.delete('/', protect, deleteCampaign);

module.exports = router;
