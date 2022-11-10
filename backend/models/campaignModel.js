const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    campaign_name: {
        type: String,
        required: [true],
    },
    campaign_description: {
        type: String,
    },
    dungeon_master: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }],
});

module.exports = mongoose.model('Campaign', campaignSchema);
