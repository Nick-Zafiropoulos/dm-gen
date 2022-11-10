const asyncHandler = require('express-async-handler');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');

// @desc Get campaigns
// @route GET /api/campaigns
const getCampaigns = asyncHandler(async (req, res) => {
    const campaigns = await Campaign.find({ dungeon_master: req.user.id });

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
        dungeon_master: req.user.id,
    });

    res.send(createCampaign);
});

// @desc Update campaign
// @route PUT /api/campaigns/:id
const updateCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
        res.status(400).json('Campaign Not Found');
    }

    const user = await User.findById(req.user.id);

    // check to find user at all
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // checking if current user is campaign dungeon master
    if (campaign.dungeon_master.toString() !== user.id) {
        res.status(401);
        throw new Error('The user is not authorized');
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.send(updatedCampaign);
});

// @desc Delete campaign
// @route DELETE /api/campaigns/:id
const deleteCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
        res.status(400).json('Campaign Not Found');
    }

    const user = await User.findById(req.user.id);

    // check to find user at all
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // checking if current user is campaign dungeon master
    if (campaign.dungeon_master.toString() !== user.id) {
        res.status(401);
        throw new Error('The user is not authorized');
    }

    await campaign.remove();

    res.send(`Campaign ${req.params.id} has been removed`);
});

module.exports = {
    getCampaigns,
    postCampaign,
    updateCampaign,
    deleteCampaign,
};
