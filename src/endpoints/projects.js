module.exports = {
    read: function(req,res){
        res.render('project', {session:req.session})
    }
}