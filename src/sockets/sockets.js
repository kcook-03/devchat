var helpers = require('./helpers');
var dbUpdate = require('../core/dbUpdate');
var dbFind = require('../core/dbFind');
module.exports = {
    open: function(connections, index, data){
        helpers.broadcast(JSON.stringify(data), connections, function(msg, user){
            if(user.id.toString().trim() == connections[index].id.toString().trim()){
                user.server.send(msg)
            }
        })
    },
    message: async function(connections, index, data){
        dbUpdate.updateSite({'_id':connections[index].id}, {$push:{'chats':data}});
        helpers.broadcast(JSON.stringify(data), connections, function(msg, user){
            if(user.id.toString().trim() == connections[index].id.toString().trim()){
                user.server.send(msg)
            }
        })
    },
    close: function(connections, index, data){
        helpers.broadcast(JSON.stringify(data), connections, function(msg, user){
            if(user.id.toString().trim() == connections[index].id.toString().trim()){
                user.server.send(msg)
            }
        })
    }
}