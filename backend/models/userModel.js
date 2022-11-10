const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        user_name: {
            type: String,
            required: [true, 'Please enter a name'],
        },
        user_password: {
            type: String,
            required: [true, 'Please enter a password'],
        },
        user_email: {
            type: String,
            required: [true, 'Please enter an email'],
        },
        user_campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
        user_dmAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
