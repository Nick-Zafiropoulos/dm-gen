const asyncHandler = require('express-async-handler');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');
const { createId } = require('@paralleldrive/cuid2');

// @desc Get all campaigns that match the dungeon_master key of the current user
// @route GET /api/campaigns
const getCampaigns = asyncHandler(async (req, res) => {
    const dmCampaigns = await Campaign.find({ dungeon_master: req.user.id });
    const playerCampaigns = await Campaign.find({ campaign_players: req.user.id });

    const usersCampaigns = dmCampaigns.concat(playerCampaigns);
    res.send(usersCampaigns);
});

// @desc Create campaign
// @route POST /api/campaigns
const postCampaign = asyncHandler(async (req, res) => {
    if (!req.body.campaignData.campaign_name) {
        res.status(400);
        throw new Error('Please enter a campaign title');
    }

    let link = createId();

    const createCampaign = await Campaign.create({
        campaign_name: req.body.campaignData.campaign_name,
        campaign_description: req.body.campaignData.campaign_description,
        dungeon_master: req.user.id,
        campaign_link: link,
    });

    res.send(createCampaign);
});

// @desc Update campaign
// @route PUT /api/campaigns/
const updateCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findOne({ campaign_link: req.body.code });

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
    // if (campaign.dungeon_master.toString() !== user.id) {
    //     res.status(401);
    //     throw new Error('The user is already the DM of this campaign');
    // }

    if (campaign.campaign_players.includes(req.user.id)) {
        res.status(400);
        throw new Error('User is already a part of that campaign');
    } else {
        await campaign.updateOne({ $push: { campaign_players: req.user.id } });
    }

    res.send(campaign);
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
