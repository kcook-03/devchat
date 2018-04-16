var User = require('/models/user.js');

var newUser = function(data, callback) {
    User.create(data, function(err, saved) {
        if (err) {
            
        }
        if (callback) {
            callback(err, saved)
        }

    });
}

module.exports = newUser