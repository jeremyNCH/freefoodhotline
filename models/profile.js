const mongoose = require('mongoose');
const User = require('./User.js');
const Location = require('./Location');

const FoodSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const ProfileSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    foods: [{
        type: FoodSchema
    }]
})


var Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;