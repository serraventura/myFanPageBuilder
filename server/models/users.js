var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new mongoose.Schema({
    pageId: {
        type: String,
        required: true
    },
    template: {
        type: String,
        required: false
    }
});

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
    facebookUserId:{
        type: String,
        require: true
    },
    pages:[PageSchema],
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