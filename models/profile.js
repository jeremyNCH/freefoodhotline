const mongoose = require('mongoose');
const User = require('./User.js');
const Location = require('./Location');

const FoodSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
    status: {
        type: Boolean
    }
})

const ProfileSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    foods: [{
        type: FoodSchema
    }]
})

var Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;