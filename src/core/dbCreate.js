var User = require('../models/user.js');
var fs = require('fs');

var newUser = function(data, callback) {
    User.create(data, function(err, saved) {
        if (err) {
            fs.writeFile('../logs/log.txt', err, function(err){});
        }
        if (callback) {
            callback(err, saved)
        }

    });
}

module.exports = newUser