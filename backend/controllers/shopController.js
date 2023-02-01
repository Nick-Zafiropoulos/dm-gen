const asyncHandler = require('express-async-handler');
const Shop = require('../models/shopModel');
const Campaign = require('../models/campaignModel');
const Item = require('../models/itemModel');

// @desc Get shop
// @route GET /api/shops
const getShops = asyncHandler(async (req, res) => {
    const shops = await Shop.find({ shop_campaign: req.query.currentCampaign });

    res.send(shops);
});

// @desc Create shop
// @route POST /api/shops
const postShop = asyncHandler(async (req, res) => {
    if (!req.body.shopData.shopData.shop_name) {
        res.status(400);
        throw new Error('Please add a shop name');
    }

    //shop data variables
    let shopRarities = req.body.shopData.shopData.shop_rarities;
    let shopCategories = req.body.shopData.shopData.shop_categories;

    // initializing the shop list
    const itemList = [];
    let i = 0;

    const randomNumbersChecked = [];

    // get database list of item URLs
    const itemFetch = await Item.find();
    itemArray = itemFetch.map((object) => object);
    itemQuantity = Number(req.body.shopData.shopData.shop_itemCount);

    while (i < itemQuantity) {
        // pick random item

        let randomNumber = Math.floor(Math.random() * itemArray.length);
        let randomItem = itemArray[randomNumber];

        // check if retrieved item matches criteria for shop, if yes then add to the list
        if (shopRarities.includes(randomItem.item_rarity) && shopCategories.includes(randomItem.equipment_category)) {
            if (itemList.includes(randomItem._id) === false) {
                itemList.push(randomItem);

                // removes item from pool
                itemArray.splice(randomNumber, 1);

                let categoryStillExists = 0;
                let categoryIndex = shopCategories.indexOf(randomItem.equipment_category);

                // checks for any more of currently pulled item's category
                for (let i = 0; i < itemArray.length; i++) {
                    if (
                        itemArray[i].equipment_category == randomItem.equipment_category &&
                        itemArray[i].item_rarity == randomItem.item_rarity
                    ) {
                        categoryStillExists++;
                    }
                }

                // if none with same category left, then remove category from pool
                if (categoryStillExists == 0) {
                    shopCategories.splice(categoryIndex, 1);
                }

                // if no more categories, end list creation
                if (shopCategories.length == 0) {
                    break;
                }

                i++;
            }
        }
    }

    const createShop = await Shop.create({
        shop_name: req.body.shopData.shopData.shop_name,
        shop_owner: req.body.shopData.shopData.shop_owner,
        shop_location: req.body.shopData.shopData.shop_location,
        shop_campaign: req.body.currentCampaign,
        shop_list: itemList,
    });

    res.send(createShop);
});

// @desc Update shop
// @route PUT /api/shops/:id
const updateShop = asyncHandler(async (req, res) => {
    res.send(`updated Shop`);
});

// @desc Delete shop
// @route DELETE /api/shops/:id
const deleteShop = asyncHandler(async (req, res) => {
    const willDelete = await Shop.deleteOne({ _id: req.query.shopToDelete });
    res.send(willDelete);
});

module.exports = {
    getShops,
    postShop,
    updateShop,
    deleteShop,
};
