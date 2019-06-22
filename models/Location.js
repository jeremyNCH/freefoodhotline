const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },

    longitude: {
        type: Number,
        required: true,
    },

    lattitude: {
        type: Number,
        required: true,
    }
});

var Location = mongoose.model('location', LocationSchema);

module.exports = Location;