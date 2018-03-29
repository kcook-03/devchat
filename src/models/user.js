var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a shema
var userSchema = new Schema ({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String},
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String,
    },
    created_at: Date,
    updated_at: Date,
});

//create mongoose model
var User = mongoose.model('User', userSchema);

//making this global
module.exports = User;

/* // Allowed schema types
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
*/