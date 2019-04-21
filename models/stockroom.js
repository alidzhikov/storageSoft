const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockRoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    isDefault:{
        type: Boolean,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {timestamps:true }
);

module.exports = mongoose.model('StockRoom', stockRoomSchema);