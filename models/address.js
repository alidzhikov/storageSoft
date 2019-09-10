const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    city: {
        type: String,
       // required: true
    },
    street: {
        type: String,
       // required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {timestamps:true }
);

module.exports = addressSchema;