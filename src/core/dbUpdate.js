var User = require('../models/user.js');
var fs = require('fs');

var updateUser = function(data, update, conditions, callback) {
    User.update(data, update, conditions, function(err, changed) {
        if(err) {
            fs.writeFile('../logs/log.txt', err, function(err){});
        }
        if(callback) {
            callback(err, changed);
        }
    })
}

module.exports = updateUser