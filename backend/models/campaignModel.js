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
    campaign_players: {
        type: Array,
    },
    campaign_link: {
        type: String,
        // required: true,
    },
});

module.exports = mongoose.model('Campaign', campaignSchema);
