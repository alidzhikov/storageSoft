const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PriceSchema = './price';

const customerSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prices: [PriceSchema]
},
    {timestamps:true }
);

module.exports = mongoose.model('Customer', customerSchema);