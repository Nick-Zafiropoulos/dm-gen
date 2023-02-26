const asyncHandler = require('express-async-handler');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');
const { createId } = require('@paralleldrive/cuid2');
const NPC = require('../models/npcModel');
const Shop = require('../models/shopModel');

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
// @route PUT /api/campaigns
const updateCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findOne({ campaign_link: req.body.code });

    if (!campaign) {
        res.status(400).json('Campaign Not Found');
    }

    const user = await User.findById(req.user.id);

    // check to find user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // check if current user is campaign dungeon master or already a player
    if (campaign.campaign_players.includes(req.user.id) || campaign.dungeon_master.includes(req.user.id)) {
        res.status(400);
        throw new Error('User is already a part of that campaign');
    } else {
        await campaign.updateOne({ $push: { campaign_players: req.user.id } });
    }

    res.send(campaign);
});

// @desc Leave campaign
// @route PUT /api/campaigns/leave
const leaveCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findOne({ campaign_link: req.body.code });

    if (!campaign) {
        res.status(400).json('Campaign Not Found');
    }

    const user = await User.findById(req.user.id);

    // check to find user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // check if current user is a player in the campaign, then pull them
    if (campaign.campaign_players.includes(req.user.id)) {
        await campaign.updateOne({ $pull: { campaign_players: req.user.id } });
    } else {
        res.status(400);
        throw new Error('User is not a part of that campaign');
    }

    res.send(campaign);
});

// @desc Delete campaign
// @route DELETE /api/campaigns
const deleteCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.query.campaignId);
    console.log(campaign._id.toString());

    if (!campaign) {
        res.status(400).json('Campaign Not Found');
    }

    const user = await User.findById(req.user.id);

    // check to find user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // check if current user is campaign dungeon master
    if (campaign.dungeon_master[0].toString() !== user.id) {
        res.status(401);
        throw new Error('The user is not authorized');
    }

    const shopsDel = await Shop.deleteMany({ shop_campaign: campaign._id.toString() });
    const npcsDel = await NPC.deleteMany({ npc_campaign: campaign._id.toString() });
    const campaignDel = await Campaign.deleteOne({ _id: campaign._id });

    res.send(campaign);
});

module.exports = {
    getCampaigns,
    postCampaign,
    updateCampaign,
    leaveCampaign,
    deleteCampaign,
};
