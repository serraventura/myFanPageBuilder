var _ = require('lodash');

var User = require('../models/users').userSchema;
var UserPage = require('../models/userPages').userPageSchema;

var get = function(params, cb){

    var objQuery;

    try{

        if(params.email){
            objQuery = {username: params.email};
        }else if(params.facebookUserId){
            objQuery = {facebookUserId: params.facebookUserId};
        }

        if(!objQuery){
            throw new Error('No query defined.');
        }

    }catch(err){
        cb(err, undefined);
        return false;
    }

    var query  = User.where(objQuery);
    query.findOne(function(err, user){

        if(err){
            cb(err, user);
            return false;
        }

        if(!user){
            cb(err, user, 'User not found.');
        }else{
            cb(err, user);
        }

    });

};

var save = function(params, cb){

    var user = new User({
        name: params.name,
        username: params.email,
        facebookUserId: params.facebookUserId,
        pages: [{
            pageId: params.pageId,
            template: undefined
        }]
    });

    user.save(function(err, ret) {

        if (err) {
            cb(err, undefined);
            return false;
        }

        var retObj = _.pick(ret.toObject(), ['name', 'username', 'facebookUserId', 'pages']);

        cb(err, retObj);

    });

}

exports.get = get;
exports.save = save;