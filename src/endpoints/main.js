var dbFind = require('../core/dbFind');
module.exports = {
    home: async function(req,res){
        if(req.session.dev){
            var jobs = await dbFind.search('Job', {'applicants':{$elemMatch:{'name':req.session.user, 'chosen':true}}});
            var websites = await dbFind.search('Website', {'closed':true});
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
        }else{
            var websites = await dbFind.search('Website', {'author':req.session.user, 'closed':true});
            res.render('home', {websites:websites, session:req.session})
        }
    }
}