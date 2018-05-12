var dbFind = require('../core/dbFind');
var dbCreate = require('../core/dbCreate');
var dbUpdate = require('../core/dbUpdate');
var ObjectID = require('mongodb').ObjectID;
module.exports = {
    renderAdd: async function(req,res){
        var websiteId = ObjectID(req.params.websiteId);
        var website = await dbFind.find('Website', {'_id':websiteId, 'author':req.session.user});
        res.render('addTask', {session:req.session, website:website})
    },
    add: function(req,res){
        var websiteId = ObjectID(req.params.websiteId);
        var auth = req.params.author;
        if(req.body.members.constructor != Array){
            req.body.members = [req.body.members]
        }
        if(auth == req.session.user){
            dbCreate.create('Task', {
                author: req.session.user,
                websiteId: websiteId,
                name:req.body.name, 
                description:req.body.description, 
                members:req.body.members.map(function(mem){return JSON.parse(mem)}), 
                subTasks:JSON.parse(req.body.taskData),
                createdAt: Date.now()
            })
        }
        res.redirect('/projects/' + req.params.websiteId)
    },
    show: async function(req,res){
        var taskId = ObjectID(req.params.taskId);
        var task = await dbFind.find('Task', {'_id':taskId, $or:[{'members.name':req.session.user}, {'author':req.session.user}]});
        res.render('task', {session:req.session, task:task})
    },
    done: function(req,res){
        var subTaskId = ObjectID(req.params.subTaskId);
        var taskId = ObjectID(req.params.taskId);
        dbUpdate.findOneAndUpdate('Task', {
            'subTasks._id':subTaskId, 
            $or:[{'members.name':req.session.user}, {'author':req.session.user}]}, 
            {'subTasks.$.done':true}, {}, function(err, doc){
                if(doc){
                    if(doc.subTasks.length -1 == doc.subTasks.filter(function(s){return s.done == true}).length){
                        dbUpdate.update('Task', {'_id':taskId, 'subTasks._id':subTaskId}, {'done':true})
                    }
                }
        });
        res.redirect('/tasks/' + req.params.taskId)
    }
}