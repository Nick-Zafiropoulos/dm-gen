const asyncHandler = require('express-async-handler');
const Campaign = require('../models/campaignModel');

// @desc Get campaigns
// @route GET /api/campaigns
const getCampaigns = asyncHandler(async (req, res) => {
    const campaigns = await Campaign.find();

    res.send(campaigns);
});

// @desc Create campaign
// @route POST /api/campaigns
const postCampaign = asyncHandler(async (req, res) => {
    if (!req.body.campaign_name) {
        res.status(400);
        throw new Error('Add a text field');
    }
    const createCampaign = await Campaign.create({
        campaign_name: req.body.campaign_name,
    });

    res.send(createCampaign);
});

// @desc Update campaign
// @route PUT /api/campaigns/:id
const updateCampaign = asyncHandler(async (req, res) => {
    const findCampaign = await Campaign.findById(req.params.id);

    if (!findCampaign) {
        res.status(400).json('Campaign Not Found');
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.send(updatedCampaign);
});

// @desc Delete campaign
// @route DELETE /api/campaigns/:id
const deleteCampaign = asyncHandler(async (req, res) => {
    const findCampaign = await Campaign.findById(req.params.id);

    if (!findCampaign) {
        res.status(400).json('Campaign Not Found');
    }

    await findCampaign.remove();

    res.send(`Campaign ${req.params.id} has been removed`);
});

module.exports = {
    getCampaigns,
    postCampaign,
    updateCampaign,
    deleteCampaign,
};
