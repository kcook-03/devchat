var router = require("express").Router();
var home = require('./endpoints/home');
var auth = require('./endpoints/auth');
var ep = require('./util/ep-utils');
module.exports = function(app) { //Pass the main server.js file into router.js
    app.use('/', router);
    //home page
    router.get('/', home.index);
    //login page
    router.get('/login', auth.renderLogin);
    router.post('/login', auth.login);
    router.get('/signup', auth.renderSignup);
    router.post('/signup', auth.signup);
    router.post('/logout', auth.logout);
    router.post('/update:attr', auth.update);
    router.get('/:any', auth.any);
}