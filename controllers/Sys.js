var rp = require('request-promise');
const Profile = require('../models/Profile');

// Get the closet address based on homeless person's address
async function main(address) {
    const address = req.param.address;
    // get homeless person's coordinates
    const coord = await helper.getAddressFromCoord(address);

    // get all profiles available
    const availableProfiles = await rp('http://localhost:5000/api/profile/all').then((body) => {
        return body;
    })

    // get the address of a food giver whose location is closet to the homeless person
    var minDist, curDist;
    var closetProfile;
    availableProfiles.forEach(function(profile) {
        if (profile.foods.length == 0) {
            continue;
        }
        var profileCoord = {'lat': profile.location.lattitude, 'lon': profile.location.longitude};
        if (!minDist) {
            minDist = helper.getDistBtwnCoords(coord, profileCoord);
            closetProfile = profile;
            continue;
        }

        var curDist = helper.getDistBtwnCoords(coord, profileCoord);
        if (minDist > curDist) {
            minDist = curDist;
            closetProfile = profile;
        }
    });

    if (!closetProfile) {
        const message = 'No food is available';
        return message;
    }

    const result = {'address': profile.location.address, 'id': profile.id};
        
    return result;

}

async function getCoordFromAddress (address) {
    // address check
    var result;
    
    const url = 'https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=';
    
    result = await rp(url+address).then((body) => {
        const bodyJson = JSON.parse(body);
        return bodyJson;
    }).catch((err) => {
        console.log(err);
    });
    return {'lat': result.results[0].position.lat, 'lon': result.results[0].position.lon};
};

async function getAddressFromCoord (coord) {
    const lon = coord.lon;
    const lat = coord.lat;

    const url = 'https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=';
    
    result = await rp(url + lat.toString() + ',' + lon.toString()).then((body) => {
        const bodyJson = JSON.parse(body);
        return bodyJson;
    }).catch((err) => {
        console.log(err);
    });
    return result.addresses[0].address.freeformAddress;
};

function getDistBtwnCoords (coord1, coord2) {
    const lat1 = coord1.lat;
    const lon1 = coord1.lon;
    const lat2 = coord2.lat;
    const lon2 = coord2.lon;

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}


module.exports = {main, getCoordFromAddress, getAddressFromCoord, getDistBtwnCoords};