const mongoose = require('mongoose');

const npcSchema = mongoose.Schema({
    npc_name: {
        type: String,
    },
    npc_species: {
        type: String,
    },
    npc_age: {
        type: String,
    },
    npc_gender: {
        type: String,
    },
    npc_location: {
        type: String,
    },
    npc_occupation: {
        type: String,
    },
    npc_personality: {
        type: String,
    },
    npc_flaws: {
        type: String,
    },
    npc_notes: {
        type: [String],
    },
    npc_campaign: {
        type: String,
        required: [true],
    },
});

module.exports = mongoose.model('NPC', npcSchema);
