const asyncHandler = require('express-async-handler');

// @desc Get npc
// @route GET /api/npcs
const getNpcs = asyncHandler(async (req, res) => {
    res.send(`Npc list`);
});

// @desc Create npc
// @route POST /api/npcs
const postNpc = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Add a text field');
    }
});

// @desc Update npc
// @route PUT /api/npcs/:id
const updateNpc = asyncHandler(async (req, res) => {
    res.send(`updated Npc`);
});

// @desc Delete npc
// @route DELETE /api/npcs/:id
const deleteNpc = asyncHandler(async (req, res) => {
    res.send(`deleted Npc`);
});

module.exports = {
    getNpcs,
    postNpc,
    updateNpc,
    deleteNpc,
};
