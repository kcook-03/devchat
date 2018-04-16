var User = require('.models/user.js');

var findUser = function(data, select, callback) {
    return User.findOne(data, select, function(err, docs) {
        if(err) {
            
        }
    })
}