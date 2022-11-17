const request = require('request')

const geocode = (address,callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=5e26d576e4b161a1fce17d5fd73914f9&query='+address+'&limit=1'

    request({url:url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }else if (response.body.data===undefined || response.body.data.length===0){
            callback('Unable to find location try another search',undefined)
        }else{
            data  = response.body.data[0]
            callback(undefined,{latitude:data.latitude,longitude:data.longitude, place_name:data.name})
        }
    })
}

module.exports = geocode