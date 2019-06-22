const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const Location = require('../../models/Location');

const geocode = require('../../controllers/geocoding.js');

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
        
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile); 
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', [auth, [
    check('address', 'Address is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    const { address } = req.body;
    const { lat, lng } = await geocode(address);

    const locationFields = {};

    if (address) locationFields.address = address;
    if (lat) locationFields.lat = lat;
    if (lng) locationFields.lng = lng;
    
    const newLocation = new Location(locationFields);

    await newLocation.save();

    const profileFields = {};

    profileFields.user = req.user.id
    profileFields.location = newLocation._id

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
        profile = await Profile.findOneAndUpdate(
            {
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            }
        );

        return res.json(profile);
    }

    // Create 
    profile = new Profile(profileFields);

    await profile.save();

    res.json(profile);

});

// @route  PUT api/profile/food
// @desc   Add a food item to a profile
// @access Private
router.put('/food', [auth, [
    check('food', 'Need to enter food title').not().isEmpty(),
    check('quantity', 'Need to enter food title').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const { description, quantity } = req.body;

        const newFood = { description, quantity };

        profile.food.unshift(newFood);

        res.json(profile);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server error');
    }
});

// @route  DELETE api/profile/food/:food_id
// @desc   DELETE food from profiel
// @access Private
router.delete('/food/:food_id', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.food.map(food => food.id).indexOf(req.params.food_id);

        profile.food.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
