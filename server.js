var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
// IMPORTANT VARIABLE
var router = require(__dirname + '/router.js');
var port = process.env.PORT || 8080;


// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('src', path.join(__dirname + 'src'));



app.listen(port, function() {
    if (port) {
        console.log('Port ' + port + ' is the magic port');
    } else {
        console.log('ERROR');
    }
});


module.exports = app;
