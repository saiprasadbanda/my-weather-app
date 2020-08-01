const req = require('request')
const chalk = require('chalk')

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FpcHJhc2FkMjYwMyIsImEiOiJja2Q5dWZtaDEwaDltMnptaTRxc3Qxd3JnIn0.ZFgU6YWkrJmXe4rIszF8AA'
    // console.log('URL 1:', url);
    req({url, json:true},(error, response, body) => {
        if(error){
            callback(chalk.red('Error.! in Connecting the Service: api.mapbox.com'), undefined)
        }else{
            if(body.features == undefined || body.features.length == 0){
                callback(chalk.red('Error: In finding Geocodes with the given city name'), undefined)
            }else{
                callback(undefined,{
                    latlong: body.features[0].center.reverse().toString(),
                    place_name: body.features[0].place_name})
            }
        }
    })
}

module.exports.geoCode = geoCode