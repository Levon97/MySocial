const mongoose = require('mongoose');
const Friends = require('./request')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    age: {
        type: Number,
        required: true,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friends'}],
    date: {
        type: Date,
        default: Date.now,
      },

});
userSchema.index({'name': 1,'lastName': 1,'age': 1}, {unique:true});


module.exports = mongoose.model("User", userSchema);