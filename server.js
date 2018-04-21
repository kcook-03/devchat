var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var helmet = require('helmet');
var favicon = require('serve-favicon');
//var bodyParser = require('body-parser');
var session = require('express-session');
// IMPORTANT VARIABLE
var router = require('./router.js');
var port = process.env.PORT || 8080;
var models = require('./models/user.js');
app.use(helmet({frameguard: {action: 'deny'}}));
mongoose.connect('mongodb://127.0.0.1:27017/devchat');
mongoose.connection.on('open', function(err) {
    if(err) {
        fs.writeFile('../logs/log.txt', function(err){});
    }
});
//var auth = require('./endpoints/auth.js');

// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('src', path.join(__dirname + 'src'));
app.use(session ({
    secret: 'UU;ddAk}}cK!/{;lejJ+3:KO;34$Qp',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true}
}));


app.listen(port, function() {
    if (port) {
        console.log('Port ' + port + ' is the magic port');
    } else {
        console.log('ERROR');
    }
});


router(app);