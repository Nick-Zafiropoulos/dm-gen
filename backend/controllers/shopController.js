const asyncHandler = require('express-async-handler');
const Shop = require('../models/shopModel');
const Campaign = require('../models/campaignModel');

// @desc Get shop
// @route GET /api/shops
const getShops = asyncHandler(async (req, res) => {
    const shops = await Shop.find({ shop_campaign: req.campaign.id });

    res.send(shops);
});

// @desc Create shop
// @route POST /api/shops
const postShop = asyncHandler(async (req, res) => {
    // if (!req.body.text) {
    //     res.status(400);
    //     throw new Error('Add a text field');
    // }
    console.log(req.body.shopData);
    res.send(`this is a post`);
});

// @desc Update shop
// @route PUT /api/shops/:id
const updateShop = asyncHandler(async (req, res) => {
    res.send(`updated Shop`);
});

// @desc Delete shop
// @route DELETE /api/shops/:id
const deleteShop = asyncHandler(async (req, res) => {
    res.send(`deleted Shop`);
});

module.exports = {
    getShops,
    postShop,
    updateShop,
    deleteShop,
};
