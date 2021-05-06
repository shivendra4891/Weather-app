const request = require('request')

const getGeoCode = (address, callback) => {
    console.log(address)
    const centerURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoia2lzaG9yZXNoaXZpNCIsImEiOiJja28xOWkwdjYwY3F5MnVqbmR0cHF5YXluIn0.7CPvT4uOJBValvmB1O7f_w`
    request({ url: centerURL, json: true }, (error, response) => {
        console.log('error'+ response.body)
        if(response.body === undefined){
            return console.log('Please provide valid location')
        }
        const longitute = response.body.features[0].center[0]
        const latitute = response.body.features[0].center[1]
        const geoCode = {
            longitute,
            latitute
        }
        callback(undefined, geoCode)
    })
}

const forecast = (latitude, longitute, callback) =>{
   /// console.log(latitude)
    const url = `http://api.weatherstack.com/current?access_key=8600c1d82326d82de7f56aee15575e28&query=${longitute},${latitude}&units=m`
    //console.log(url)
    request({ url, json: true }, (error, { body }) => {
        //console.log(response.body)
        callback(undefined,body)
    })
}
module.exports = {
    getGeoCode,
    forecast
}