var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes');
app.use(helmet({frameguard: {action: 'deny'}}));
mongoose.connect('mongodb://127.0.0.1:27017/devchat');
mongoose.connection.on('open', function(err) {
    if(err) {
        fs.writeFile('../logs/log.txt', function(err){});
    }
});
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(session({
    secret: 'UU;ddAk}}cK!/{;lejJ+3:KO;34$Qp',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true}
}));
app.listen(app.get('port'), function(err) {
  if(err){
      fs.writeFile('../../logs/app.json', err, function(err){})
  }
});
routes(app)