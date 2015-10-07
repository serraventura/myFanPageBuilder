var mongoose = require('mongoose');

var userPageSchema = mongoose.model('UserPage', {
    _facebookUserId:{
        type: String,
        require: true
    },
    facebookPageId:{
        type: Number,
        require: true
    },
    templateName:{
        type: String,
        require: true
    },
    active:   {
        type: Boolean,
        default: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

exports.userPageSchema = userPageSchema;