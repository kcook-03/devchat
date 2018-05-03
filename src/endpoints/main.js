var dbFind = require('../core/dbFind');
module.exports = {
    home: async function(req,res){
        var jobs = await dbFind.searchJobs({'applicants':{$elemMatch:{'name':req.session.user, 'chosen':true}}});
        var websites = await dbFind.searchSites({});
        var expWeb = [];
        for(let i = 0; i < websites.length; i++){
            let exp = false;
            websites[i].jobs = [];
            for(var x = 0; x < jobs.length; x++){
                if(websites[i]._id == jobs[x].websiteId){
                    websites[i].jobs.push(jobs[x].name);
                    exp = true
                }
            }
            if(exp) expWeb.push(websites[i])
        }
        res.render('home', {session:req.session, websites:expWeb})
    }
}