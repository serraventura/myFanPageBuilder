var mongoose = require('mongoose');

var templateSchema = mongoose.model('Template', {
    name:{
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

exports.templateSchema = templateSchema;