const request = require('request')

function getForecast({latitude, longitude}, callback) {
    const url = `http://api.weatherstack.com/forecast?access_key=ffec756fefa20262ed611ecee0f71691&query=${latitude},${longitude}`

    request(url, {json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body)
            callback(undefined, `The current weather in ${body.location.name} is ${body.current.temperature}°C, ${body.current.weather_descriptions[0]} with a wind speed of ${body.current.wind_speed} m/s from the ${body.current.wind_dir}. The forecast for ${body.forecast['2023-07-12'].date} predicts a temperature range of ${body.forecast['2023-07-12'].mintemp}°C - ${body.forecast['2023-07-12'].maxtemp}°C, with no snow and ${body.forecast['2023-07-12'].sunhour} hours of sunlight.`)
            console.log(`The current weather in ${body.location.name}, ${body.location.country} is ${body.current.temperature}°C, ${body.current.weather_descriptions[0]} with a wind speed of ${body.current.wind_speed} m/s from the ${body.current.wind_dir}. The forecast for ${body.forecast['2023-07-12'].date} predicts a temperature range of ${body.forecast['2023-07-12'].mintemp}°C - ${body.forecast['2023-07-12'].maxtemp}°C, with no snow and ${body.forecast['2023-07-12'].sunhour} hours of sunlight.`)
        }
    })
}
module.exports = getForecast
