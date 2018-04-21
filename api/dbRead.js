var User = require('/models/user.js');
var fs = require('fs');

var findUser = function (data, select, callback) {
    return User.findOne(data, select, function(err,docs) {
        if(err) {
            fs.writeFile('../../logs/log.txt', err, function(err){});
        }
        if(callback) {
            callback(err,docs);
        }
    })
}

module.exports = findUser