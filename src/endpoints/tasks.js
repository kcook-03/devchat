var dbFind = require('../core/dbFind');
var ObjectID = require('mongodb').ObjectID;
module.exports = {
    renderAdd: async function(req,res){
        var websiteId = ObjectID(req.params.websiteId);
        var website = await dbFind.findSite({'_id':websiteId});
        res.render('addTask', {session:req.session, website:website})
    }
}