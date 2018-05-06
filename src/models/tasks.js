var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    name: {type:String},
    websiteId: {type:String},
    members: [{name:String, gravatar:String}],
    subTasks: [{name:String, description:String, done:Boolean}],
    done: {type:Boolean},
});
var Task = mongoose.model('Task', taskSchema);
module.exports = Task;