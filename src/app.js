const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('http')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Kunal Soni'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Kunal Soni'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Kunal Soni'

    })
})

app.get('/weather',(req,res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude}={}) => {
        if (error){
            return(res.send({error}))
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return(res.send({error}))
            }

            res.send({
                forecast: forecastData,
                address: req.query.address
            })
        })

            
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Kunal Soni',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Kunal Soni',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=> {
    console.log("Server is up at port "+port)
})