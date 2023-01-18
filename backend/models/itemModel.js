const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: [true],
    },
    item_desc: {
        type: Array,
    },
    equipment_category: {
        type: String,
    },
    item_rarity: {
        type: String,
    },
    item_cursed: {
        type: Boolean,
    },
    item_curses: [{ type: String }],
});

module.exports = mongoose.model('Item', itemSchema);
