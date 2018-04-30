var User = require('../models/user.js');
var fs = require('fs');

var delUser = function(data, callback) {
    User.remove(data, function(err) {
        if(err) {
            fs.writeFile('../logs/log.txt', err, function(err){});
        }
        if(callback) {
            callback(err);
        }
    });
}

module.exports = delUser