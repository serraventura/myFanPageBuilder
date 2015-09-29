var mongoose = require('mongoose');

var userSchema = mongoose.model('User', {
    name:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    facebookUserId:{
        type: String,
        require: true
    },
    facebookPageId:{
        type: String,
        require: true
    },
    active:   {
        type: Boolean
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

exports.userSchema = userSchema;