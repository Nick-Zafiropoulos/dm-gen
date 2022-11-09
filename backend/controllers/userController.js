const asyncHandler = require('express-async-handler');

// @desc Get user
// @route GET /api/users
const getUsers = asyncHandler(async (req, res) => {
    res.send(`User list`);
});

// @desc Create user
// @route POST /api/users
const postUser = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Add a text field');
    }
});

// @desc Update user
// @route PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
    res.send(`updated User`);
});

// @desc Delete user
// @route DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    res.send(`deleted User`);
});

module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser,
};
