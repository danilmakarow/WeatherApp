const request = require('request')

function getGeocode(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnl0dWwyMjhnbWFpbG9tIiwiYSI6ImNsazB6Y2U5ZjAxeGUzbGprczZtamUwb3AifQ.vHhCsTCqHluyDrr0v1ay2g&limit=1'

    request(url,{json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(body)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeocode
