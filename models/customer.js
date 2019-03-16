const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
},
    {timestamps:true }
);

module.exports = mongoose.model('Customer', customerSchema);