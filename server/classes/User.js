var User = require('../models/users').userSchema;

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

        if(err) cb(err, user);

        if(!user){
            cb('User not found.', user);
        }else{
            cb(err, user);
        }

    });

};

var save = function(params, cb){

    var user = new User({
        name: params.name,
        username: params.email,
        password: '',
        facebookUserId: params.facebookUserId,
        facebookPageId: params.pageId,
        active: true
    });

    user.save(function(err) {

        if (err) {
            console.log('Error: ', err);
        }else{
            console.log('user saved');
        }

        cb(err, true);

    });

}

exports.get = get;
exports.save = save;