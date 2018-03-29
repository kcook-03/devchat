var User = require('/models/user.js');
var fs = require('fs');
var logger = require('/endpoints/logger.js');

var newUser = function(data, callback) {
    User.create(data, function(err, saved) {
        if (err) {
            logger.error('Creation Error');
        }
        if (callback) {
            callback(err, saved)
        }

    });
}

module.exports = newUser