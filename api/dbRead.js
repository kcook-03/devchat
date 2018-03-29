var User = require('/models/user.js');
var logger = require('/endpoints/logger.js');

var readUser = function(data, select, callback) {
    return User.findOne(data, select, function(err, docs))

}