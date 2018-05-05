var dbFind = require('../core/dbFind');
var ObjectID = require('mongodb').ObjectID;
module.exports = {
    read: async function(req,res){
        var website = await dbFind.findSite({'_id':req.params.websiteId, 'closed':true});
        var jobs = await dbFind.searchJobs({'websiteId':req.params.websiteId});
        req.session.chatId = req.params.websiteId;
        res.render('project', {session:req.session, website:website, jobs:jobs})
    }
}