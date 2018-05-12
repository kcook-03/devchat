var express = require('express');
var app = express();
var mongoose = require('mongoose');
var ws = require('ws');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var wss = new ws.Server({noServer:true});
var path = require('path');
var server = require('http').Server(app); 
var helmet = require('helmet');
var bodyParser = require('body-parser');
var session = require('express-session');
var store = new session.MemoryStore();
var routes = require('./routes');
var sockets = require('./sockets/sockets.js');
var expressValidator = require('express-validator');
app.use(helmet({frameguard: {action: 'deny'}}));
mongoose.connect('mongodb://127.0.0.1:27017/condev');
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
app.use(session({
    secret: 'yVVma9ga',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true},
    store:store
}));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}));
Date.prototype.timeAgo = function(){
  var seconds = ((new Date() - this) / 1000);
  var interval = (seconds / 31536000);
  if(interval > 1) return Math.floor(interval) + ' years';
  interval = Math.floor(seconds / 2592000);
  if(interval > 1) return Math.floor(interval) + ' months';
  interval = (seconds / 86400);
  if(interval > 1) return Math.floor(interval) + 'd';
  interval = (seconds / 3600);
  if(interval > 1) return Math.floor(interval) + 'h';
  interval = (seconds / 60);
  if(interval > 1) return Math.floor(interval) + 'm';
  return Math.floor(seconds) + 's';
}
String.prototype.toTitle = function(){
  var str = this.split('');
  str[0] = str[0].toUpperCase();
  return str.join('')
}
server.listen(process.env.PORT || 8080, function(err) {
  if(err){
      fs.writeFile('../../logs/app.json', err, function(err){})
  }
});
server.on('upgrade', function(req,socket,head){
    var pathname = require('url').parse(req.url).pathname;
    wss.handleUpgrade(req,socket,head, function(ws){
        wss.emit('connection', {server:ws, req:req})
    })
});
var connections = [];
wss.on('connection', function connection(conn){
    var cookies = cookie.parse(conn.req.headers.cookie);
    var sid = cookieParser.signedCookie(cookies['connect.sid'], 'yVVma9ga');
    var requestSession = JSON.parse(store.returnSession(sid));
    var index = connections.push({server:conn.server, username:requestSession.user, id:requestSession.chatId}) - 1;
    conn.server.on('message', function(msg){
        sockets.message(connections, index, {message:msg, author:requestSession.user, madeAt:Date.now()})
    })
});
routes(app)