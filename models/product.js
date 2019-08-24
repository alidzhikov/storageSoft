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
    size: {
        type: String,
        reqired: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    }
},
    {timestamps:true }
);

productSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.basePrice = ret.basePrice.toString();
      return ret;
    },
});
  
module.exports = mongoose.model('Product', productSchema);