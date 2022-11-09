const asyncHandler = require('express-async-handler');

// @desc Get shop
// @route GET /api/shops
const getShops = asyncHandler(async (req, res) => {
    res.send(`Shop list`);
});

// @desc Create shop
// @route POST /api/shops
const postShop = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Add a text field');
    }
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
