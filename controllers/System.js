// const express = require('express');
// const router = express.Router();
// const Location = require("../models/location");
// const helper = require("./helper");
// const Profile = require('../models/Profile');

// // @route  GET api/system/ClosetAdd/:address
// // @desc   Get the closet address based on homeless person's address
// // @access Public

// router.get('ClosetAdd/:address', (req, res, next) => {
//     const address = req.param.address;
//     const coord = await helper.getAddressFromCoord(address);

//     const availableProfiles = Profile.find({}, function(err, profiles) {
//         if (err) {
//             console.log(err);
//             return
//         } 
//     });

//     var minDist, curDist;
//     var closetLocation;
//     availableProfiles.forEach(function(profile) {
//         var profileCoord = {'lat': profile.location.lattitude, 'lon': profile.location.longitude};
//         if (!misDist) {
//             misDist = helper.getDistBtwnCoords(coord, profileCoord);
//             closetAddress = 
//             continue;
//         }

//         var curDist = helper.getDistBtwnCoords(coord, profileCoord);
//         if (misDist > curDist) {

//         }

//     });

// });

// module.exports = router;
