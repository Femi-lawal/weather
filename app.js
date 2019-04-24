var http = require('http');
var weather = require('openweather-apis');
var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const expressLayouts = require('express-ejs-layouts');
var city = 'Lagos'
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=fa0556d24689741a55687d4cc997bc9c`


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');




app.get('/', function(req, res) {
    request(url, function(error, response, body) {
        weather_json = JSON.parse(body);
        console.log(weather_json);
        var weather = {
            city: city,
            temperature: weather_json.main.temp,
            description: weather_json.weather[0].description,
            icon: weather_json.weather[0].icon
        };
        var weather_data = { weather: weather }


        res.render('homepage', weather_data);
    })

});
app.post('/signup', function(req, res) {
    res.render('signup');
});
app.get('/signup', function(req, res) {
    res.render('signup');
});
app.post('/login', function(req, res) {
    res.render('login');
});
app.get('/users/login', function(req, res) {
    res.render('login');
});
const PORT = process.env.PORT || 8181;

app.listen(PORT, console.log(`Server started on port ${PORT}`));