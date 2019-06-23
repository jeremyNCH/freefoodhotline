var rp = require('request-promise');
var request = require('request');

var axios = require('axios');

const kylesAttempt = async (address) => {
    //const url = 'https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=';
    const url = 'https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=155 yorkville avenue, toronto'
    console.log('req sent');
    const res = await axios.get(url);

    console.log(res.body);

}

async function AddressToCoordinate (address) {
    // address check
    var lat, lon;
    var result;
    
    const url = 'https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=';
    
    rp(url+address).then((body) => {
        const bodyJson = JSON.parse(body);
        console.log('body: ', bodyJson);
        result = bodyJson;
    }).catch((err) => {
        console.log(err);
    });
    console.log('result:', result);
    console.log("lat:", result.results[0].position.lat);
    return {'lat': result.results[0].position.lat, 'lon': result.results[0].position.lon};
};

async function CoordinateToAddress (coord) {
    const lon = coord.lon;
    const lat = coord.lat;
    var address;

    const url = 'https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=';
    request.get(url + lat.toString() + ',' + lon.toString(), function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            try {
                const bodyJson = JSON.parse(body);
                address = bodyJson.addresses[0].freeformAddress;
            } catch (e) {
                console.log('ERROR, Coordinates to Address: address assignment error');
            }
        }
    });
    return address;
};

async function closetCoordinates (curCoord, availableCoords) {

}

module.exports = {AddressToCoordinate, CoordinateToAddress, closetCoordinates, kylesAttempt};