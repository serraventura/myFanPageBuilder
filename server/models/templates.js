var mongoose = require('mongoose');

var templateSchema = mongoose.model('Template', {
    name:{
        type: Array,
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