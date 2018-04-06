// Variables
var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var port = process.env.PORT;

// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('src', path.join(__dirname + 'src'));
//app.use(morgan('dev')); //log requests
app.use(cookieParser()); //need for auth (reading cookies)
app.use(session({secret: 'q(-zyZ7S~Yw-W"-8v/9"$"KhrSPHvW', saveUninitialized: true, resave: true})); //Fort Knox secret key :D (if lots of traffic change resave and saveUninit)
//app.use(bodyParser()); //get info from html forms
//app.use(favicon(__dirname + '/public/images/'))
app.set('view engine', 'ejs'); //set so no need for .ejs extension in server side

//home page
router.get('/', function(req, res) {
    res.render('index.ejs');
    console.log(req.cookies);
    console.log(req.session);
});

//about page
router.get('/about', function(req, res) {
    res.render('about.ejs');
  });
  
//login page
router.get('/login', function(req, res) {
    res.render('login.ejs');
    console.log(req.cookies);
    console.log('========');
    console.log(req.session);
  });
  


app.listen(port, function() {
    if (port) {
        console.log('Port ' + port + ' is the magic port');
    } else {
        console.log('ERROR');
    }
});

