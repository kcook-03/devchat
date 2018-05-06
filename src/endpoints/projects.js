var dbFind = require('../core/dbFind');
var ObjectID = require('mongodb').ObjectID;
module.exports = {
    show: async function(req,res){
        var website = await dbFind.findSite({'_id':req.params.websiteId, 'closed':true});
        if(website){
            if(website.members.map(function(member){return member.name}).indexOf(req.session.user) != -1 || req.session.user == website.author){
                var tasks = await dbFind.searchTasks({'websiteId':req.params.websiteId});
                var jobs = await dbFind.searchJobs({'websiteId':req.params.websiteId});
                req.session.chatId = req.params.websiteId;
                res.render('project', {session:req.session, website:website, jobs:jobs, tasks:tasks})
            }else{
                res.redirect('/home')
            }
        }else{
            res.redirect('/home')
        }
    }
}