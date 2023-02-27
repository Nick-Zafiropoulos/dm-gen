const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // getting token from the header
            token = req.headers.authorization.split(' ')[1];

            // token verification
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // get user data from token
            req.user = await User.findById(decodedToken.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('No authorization');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No token for authorization');
    }
});

module.exports = { protect };
