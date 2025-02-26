const log = console.log
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../views/partials')


const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'petran'
    })
})

app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'help',
        name: 'petran',
        helpdesk: 'helppp'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'petran',
        title: 'About me',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return log(error)
        }
        forecast(longitude, latitude, (error, fdata) => {
            if (error) {
                return log('Error', error)
            }
            res.send({
                longitude,
                latitude,
                fdata
            })
        })
        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide search term'
        })
    }
    log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help 404')
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'petran',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    log('Server up on port 3000')
})