var dbCreate = require('../core/dbCreate');
var dbFind = require('../core/dbFind');
var dbUpdate = require('../core/dbUpdate');
var dbDelete = require('../core/dbDelete');
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    renderLogin: function(req, res) {
        res.render('login', {session:req.session})
    },
    login: async function(req, res) {
        var user = await dbFind.findUser({'username': req.body.username.trim(), 'password': req.body.password.trim()});
        if(user) {
            req.session.userId = user.username;
            if(user.dev) {
                res.redirect('/devhome');
            }
            else {
                res.redirect('/clients' + req.session.user);
            }
        }
        else {
            req.session.err = ['Incorrect credentials'];
            res.redirect('/login');
        }
    },
    renderSignup: function(req, res) {
        res.render('signup', {session:req.session});

    },
    signup: function(req, res) {
        var User = require('../models/user.js');
        var dev;
        if(req.body.dev == 'true') {
            var dev = true
        } else {
            var dev = false
        }
        dbCreate.newUser({username:req.body.username.trim(), password: req.body.password.trim(), dev:dev, createdAt:Date.now()}, function(err, saved) {
            if(err) {
                req.session.err = ['That username is already taken, please choose a different one!']
                res.redirect('/signup')
            } else {
                module.exports.login(req, res)
            }
        });
    },
    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/login')
    },
    update: function(req, res) {
        if(req.parrams.attr == 'lang' && req.session.dev) {
            dbUpdate.updateUser({'username':req.session.user}, {$push:{'languages':{'name':req.body.language}}});
        } else if(req.params.attr == 'bio') {
            dbUpdate.updateUser({'username':req.session.user}, {'bio':req.body.description})
        }
        var dev = req.session.dev ? 'devs' : 'clients';
        res.redirect('/' + dev + '/' + req.session.user)
    },
    any: function(req, res) {
        res.render('404', {session:req.session});
    }
}