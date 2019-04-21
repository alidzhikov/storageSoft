const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    orgName:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    }
},
    {timestamps:true }
);

module.exports = mongoose.model('User', userSchema);