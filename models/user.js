const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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
    phoneNumber: {
        type: String,
        required: false
    }
},
    {timestamps:true }
);

module.exports = mongoose.model('User', userSchema);