const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc Get user
// @route GET /api/users/me
const getUser = asyncHandler(async (req, res) => {
    const { _id, user_name, user_email } = await User.findById(req.user.id);

    res.json({
        id: _id,
        name: user_name,
        email: user_email,
    });
});

// @desc Create user
// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    // destructure data from body of req
    const { user_name, user_password, user_email } = req.body;

    // check to see if all fields are filled
    if (!user_name || !user_password || !user_email) {
        res.status(400);
        throw new Error('Please complete all fields');
    }

    // check for duplicate email
    const foundEmail = await User.findOne({ user_email });

    if (foundEmail) {
        res.status(400);
        throw new Error('This email is already in use');
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user_password, salt);

    // create user account
    const user = await User.create({
        user_name,
        user_email,
        user_password: hashedPass,
    });

    // check to see if user created successfully
    if (user) {
        res.status(201).json({
            _id: user.id,
            user_name: user.user_name,
            user_email: user.user_email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Login user
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { user_email, user_password } = req.body;

    // check for existing user and get user data
    const userExists = await User.findOne({ user_email });

    // check entered password against user data stored password
    if (userExists && (await bcrypt.compare(user_password, userExists.user_password))) {
        res.json({
            _id: userExists.id,
            user_name: userExists.user_name,
            user_email: userExists.user_email,
            token: generateToken(userExists._id),
        });
    } else {
        res.status(400);
        throw new Error('User credentials do not match');
    }
});

// JWT generation function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
    getUser,
    registerUser,
    loginUser,
};
