const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./product').productSchema;

const orderProductSchema = new Schema({
    product: {
        type: productSchema,
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    qty: {
        type: Number,
        reqired: true
    }
},
    {timestamps:true }
);

orderProductSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.price = ret.price.toString();
      return ret;
    },
});

module.exports = orderProductSchema;