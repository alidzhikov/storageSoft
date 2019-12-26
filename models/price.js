const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    // customer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Customer',
    //     required: true
    // },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
},
    {timestamps:true }
);

exports.PriceSchema = priceSchema;
exports.Price = mongoose.model('Price', priceSchema);