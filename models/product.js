const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    basePrice: {
        type: Schema.Types.Decimal128,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    }
},
    {timestamps:true }
);

module.exports = mongoose.model('Product', productSchema);