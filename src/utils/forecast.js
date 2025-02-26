const request = require('request')
const log = console.log

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=a74fd090ba4adc0476398af3263f29b3&query=' + latitude + ',' + longitude + ''
    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if(body.error) {
            callback('Cant find location', undefined)  
        } else {
            log(body.current.temperature)
            callback(undefined, {
                Temp: body.current.temperature,
                feels_like: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast