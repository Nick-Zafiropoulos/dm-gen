const express = require('express');
const router = express.Router();
const { getCampaigns, postCampaign, updateCampaign, deleteCampaign } = require('../controllers/campaignController');

router.get('/', getCampaigns);

router.post('/', postCampaign);

router.put('/:id', updateCampaign);

router.delete('/:id', deleteCampaign);

module.exports = router;
