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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign',
    },
    shop_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('Shop', shopSchema);
