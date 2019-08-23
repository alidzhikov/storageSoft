const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderProductSchema = './orderProduct';

const orderSchema = new Schema({
    products: [OrderProductSchema],
    customerID: {
        type: Schema.Types.ObjectId,
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