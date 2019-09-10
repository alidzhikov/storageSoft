const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderProductSchema = require('./orderProduct');

const orderSchema = new Schema({
    orderProducts: {
        type: [OrderProductSchema]
    },
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

orderSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.orderProducts = ret.orderProducts.map(orPr => {
          orPr.price = orPr.price.toString();
          orPr.product.basePrice = orPr.product.basePrice.toString();
          return orPr;
      });
      return ret;
    },
});
module.exports = mongoose.model('Order', orderSchema);