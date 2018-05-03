var router = require("express").Router();
var home = require('./endpoints/home');
var auth = require('./endpoints/auth');
var main = require('./endpoints/main');
var projects = require('./endpoints/projects');
var ep = require('./util/ep-utils');
module.exports = function(app) { //Pass the main server.js file into router.js
    app.use('/', router);
    //home page
    router.get('/', home.index);
    //login page
    router.get('/login', ep.checkUser, auth.renderLogin);
    router.post('/login', auth.login);
    router.post('/logout', auth.logout);
    router.get('/home', ep.checkIn, main.home);
    router.get('/projects/:websiteId', projects.read);
    router.get('/:any', auth.any);
}