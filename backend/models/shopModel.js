const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    shop_name: {
        type: String,
        required: [true],
    },
    shop_owner: {
        type: String,
    },
    shop_location: {
        type: String,
    },
    shop_campaign: {
        type: String,
        required: [true],
    },
    shop_list: {
        type: Array,
    },
    shop_hidden_list: {
        type: Array,
    },
});

module.exports = mongoose.model('Shop', shopSchema);

// shop_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
//     shop_hidden_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
