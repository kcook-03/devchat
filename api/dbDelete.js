var User = require('/models/user.js');
var logger = require('/endpoints/logger.js');

var delUser = function(data, callback) {
    User.remove(data, function(err) {
        if (err) {
            logger.error('Deletion Error');
        }
    });
}

module.exports = delUser