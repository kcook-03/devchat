var router = require("express").Router();
module.exports = function(app) { //Pass the main server.js file into router.js
    app.use('/', router)

    //home page
    router.get('/', function(req, res) {
        res.render('index.ejs');
        req.session.hello = "hello";
        console.log(req.session);
    });

    //about page
    router.get('/about', function(req, res) {
        res.render('about.ejs');
    });
    
    //login page
    router.get('/login', function(req, res) {
        res.render('login.ejs');
        console.log('========');
        console.log(req.session);
    });
    
}