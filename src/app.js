const path = require('path')
const express  = require('express')
const hbs = require('hbs')
const getGeocode = require("./utils/geocode");
const getForecast = require("./utils/forecast");

const app = express()

const publicPagePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Конфигурация движка отображения и местонахождения файлов
app.set('view engine', 'hbs') // Показываю express что установлена библиотека для него
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Установка статичесской директивы к инициализации
app.use(express.static(publicPagePath))

app.get('', (req, res) => {
     res.render('index', {
         title: 'WeatherApp',
         name: 'Danil Makarov'
     })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Danil Makarov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Danil Makarov',
        helpText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, recusandae temporibus. Ad at debitis delectus dignissimos distinctio eligendi ipsum iste itaque, iusto laudantium magni quae quas, quasi reprehenderit soluta totam.'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        res.send({error: '⛔ No address is provided!'})
        return
    }

    getGeocode(address, (err, geocodeRes) => {
        if(err)
            res.send({error: err})

        getForecast(geocodeRes, (err, forecastData) => {
            if(err)
                res.send({error: err})

            res.send({
                forecast: forecastData,
                location: geocodeRes.location,
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        res.send({error: 'You must provide a search term'})
        return
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Danil Makarov',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Danil Makarov',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
