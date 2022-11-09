const asyncHandler = require('express-async-handler');

// @desc Get item
// @route GET /api/items
const getItems = asyncHandler(async (req, res) => {
    res.send(`Item list`);
});

// @desc Create item
// @route POST /api/items
const postItem = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Add a text field');
    }
});

// @desc Update item
// @route PUT /api/items/:id
const updateItem = asyncHandler(async (req, res) => {
    res.send(`updated Item`);
});

// @desc Delete item
// @route DELETE /api/items/:id
const deleteItem = asyncHandler(async (req, res) => {
    res.send(`deleted Item`);
});

module.exports = {
    getItems,
    postItem,
    updateItem,
    deleteItem,
};
