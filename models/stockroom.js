const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    { timestamps: true }
);

exports.Stockroom = mongoose.model('Stockroom', stockroomSchema);