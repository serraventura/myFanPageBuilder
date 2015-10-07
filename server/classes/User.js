var User = require('../models/users').userSchema;
var UserPage = require('../models/userPages').userPageSchema;

var get = function(params, cb){

    var objQuery;

    try{

        if(params.email){
            objQuery = {username: params.email};
        }else if(params.facebookUserId){
            objQuery = {_facebookUserId: params.facebookUserId};
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
        _facebookUserId: params.facebookUserId
    });

    var userPage = new UserPage({
        _facebookUserId: user._facebookUserId,
        facebookPageId: params.pageId,
        templateName: 'default'//params.templateName
    });

    user.pages.push(userPage); //push ObjectId
    user.save(function(err) {

        if (err) {
            cb(err, undefined);
            return false;
        }

        userPage.save(function(err){

            if (err) {
                cb(err, undefined);
                return false;
            }

            User.findOne({
                _facebookUserId: user._facebookUserId
            }).populate('pages').exec(function (err, user) {

                if (err) {
                    cb(err, undefined);
                    return false;
                }

                cb(err, user);

            });

        });

    });

}

exports.get = get;
exports.save = save;