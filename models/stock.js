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
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {timestamps:true }
);

exports.Stock = mongoose.model('Stock', stockSchema);
