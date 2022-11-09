const asyncHandler = require('express-async-handler');

// @desc Get campaigns
// @route GET /api/campaigns
const getCampaigns = asyncHandler(async (req, res) => {
    res.send(`Campaigns list`);
});

// @desc Create campaign
// @route POST /api/campaigns
const postCampaign = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Add a text field');
    }
});

// @desc Update campaign
// @route PUT /api/campaigns/:id
const updateCampaign = asyncHandler(async (req, res) => {
    res.send(`updated campaign`);
});

// @desc Delete campaign
// @route DELETE /api/campaigns/:id
const deleteCampaign = asyncHandler(async (req, res) => {
    res.send(`deleted campaign`);
});

module.exports = {
    getCampaigns,
    postCampaign,
    updateCampaign,
    deleteCampaign,
};
