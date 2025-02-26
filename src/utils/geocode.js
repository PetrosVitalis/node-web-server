const request = require('request')
const log = console.log

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoicGV0cmFuMSIsImEiOiJjbTR0MXFxZ2UwNzNyMm1xeHViNzhmZzV1In0.51hvfPISgUO8lCV6u4gbpg&limit=1'

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if(body.features.length === 0) {
            callback('Cant find location', undefined)  
        } else {
            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude
            })
        }
    })
}

module.exports = geocode