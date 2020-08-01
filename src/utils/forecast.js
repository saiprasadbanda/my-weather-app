const req = require('request')
const chalk = require('chalk')

const getWeather = (latlang, place_name, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=91fa8401715afe48a0f655763323a36a&query='+latlang
        
    req({url, json: true},(error, response, body) => {
        if(error){
            callback(chalk.red('Error.! in connecting the Weather Service: api.weatherstack.com'),undefined);
        }else{
            if(body.current == undefined){
                callback(chalk.red(body.error.type)+' '+body.error.info,undefined);
            }else{
                callback(undefined, body.current.weather_descriptions[0]+'. Current temperature in '+place_name+'. is '+body.current.temperature+' degrees out, and feels like '+body.current.feelslike+' degreees out.')
            }
        }
    })
}

module.exports.foreCast = getWeather