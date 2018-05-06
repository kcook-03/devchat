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
Date.prototype.timeAgo = function(){
  var seconds = Math.floor((new Date() - this) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if(interval > 1) return interval + ' years';
  interval = Math.floor(seconds / 2592000);
  if(interval > 1) return interval + ' months';
  interval = Math.floor(seconds / 86400);
  if(interval > 1) return interval + 'd';
  interval = Math.floor(seconds / 3600);
  if(interval > 1) return interval + 'h';
  interval = Math.floor(seconds / 60);
  if(interval > 1) return interval + 'm';
  return Math.floor(seconds) + 's';
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