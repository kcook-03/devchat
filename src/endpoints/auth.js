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
        if(user){
            req.session.userId = user._id;
            req.session.user = user.username;
            req.session.dev = user.dev;
            res.redirect('/home')
        }else{
            req.session.err = ['Incorrect credentials'];
            res.redirect('/login')
        }
    },
    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/login')
    },
    any: function(req, res) {
        res.render('404', {session:req.session});
    }
}