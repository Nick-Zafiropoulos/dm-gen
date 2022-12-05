const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: [true],
    },
    item_desc: {
        type: String,
    },
    equipment_category: {
        type: String,
    },
    item_rarity: {
        type: String,
    },
    item_price: {
        type: Number,
    },
    item_visible: {
        type: Boolean,
    },
    item_cursed: {
        type: Boolean,
    },
    item_curses: [{ type: String }],
    item_shop: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
    item_quantity: {
        type: Number,
    },
});

module.exports = mongoose.model('Item', itemSchema);
