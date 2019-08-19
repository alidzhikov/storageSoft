const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = './product';

const orderSchema = new Schema({
    products: [ProductSchema],
    customerID: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    {timestamps:true }
);

module.exports = mongoose.model('Order', orderSchema);