const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88f5537f93aa8316044692e5019c8541&query='+latitude+','+longitude+'&limit=1'

    request({url:url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }else if (response.body===undefined){
            callback('Unable to find location try another search',undefined)
        }else{
            data  = response.body.current
            fcst = "The temperature is "+data.temperature+"C, humidity is "+data.humidity+"%, and wind speed is "+ data.wind_speed+"Kmph. There is "+data.cloudcover+"% chance of rain. It feels like "+data.feelslike+"C outside."
            callback(undefined,fcst)
        }
    })
}

module.exports = forecast