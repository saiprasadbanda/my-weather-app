
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/forecast')

//Define paths for experess fonfig
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Partials Configuration
hbs.registerPartials(partialsPath)

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

const port = 3000

app.get('', (req, res) => {
    res.render('index',{title: 'Weather app', name: 'Saiprasad'})
})

app.get('/about', (req, res) => {
    res.render('about',{
        pageTitle: 'About Page.',
        title: 'Title of About Page.',
        name: 'Saiprasad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Help Page.',
        title: 'Title of help Page.',
        name: 'Saiprasad'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Address is required.'})
    }
    geoCode.geoCode(req.query.address, (error,{latlong, place_name}={}) => {
        if(error){
            return res.send({error})
        }
        foreCast.foreCast(latlong, place_name, (error, foreCast) => {
            if(error){
                return res.send({error})
            }
            // console.log(foreCast); 
            res.send({
                place: req.query.address,
                weather: foreCast
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({error: 'You must provide search value'})
    }
    console.log('query params: ', req.query);
    res.send({products:[]})
})

app.get('/help/*', (req, res) => {
    res.render('404', {message: 'The Article you are looking is not found.'})
})

//404 Whatever after the defined above.
app.get('*', (req, res) => {
    res.render('404', {message: 'The page you are looking is not found on this server'})
})

app.listen(port,() => {
    console.log(`server is up @${port}`);
})