const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    amount: {
        type: Number,
        reqired: true
    },
    sold: {
        type: Number
    },
    stockroom: {
        type: Schema.Types.ObjectId,
        ref: 'Stockroom',
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
},
    {timestamps:true }
);

exports.Stock = mongoose.model('Stock', stockSchema);
