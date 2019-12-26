const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PriceSchema = require('./price').PriceSchema;
const AddressSchema = require('./address');

const customerSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
    },
    address: AddressSchema,
    phoneNumber: {
        type: String,
    },
    vat: {
        type: String,
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
customerSchema.set('toJSON', {
    transform: (doc, ret) => {
        if(ret.prices){
            ret.prices = ret.prices.map(price => {
                price.price = price.price.toString();
                return price;
            });
        }
      return ret;
    },
});
module.exports = mongoose.model('Customer', customerSchema);