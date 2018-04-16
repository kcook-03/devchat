var User = require('/models/user.js');

var delUser = function(data, callback) {
    User.remove(data, function(err) {
        if (err) {
            
        }
    });
}

module.exports = delUser