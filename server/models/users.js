var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        require: false
    },
    _facebookUserId:{
        type: String,
        require: true
    },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: 'UserPage'
    }],
    active:   {
        type: Boolean,
        default: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

exports.userSchema = userSchema;