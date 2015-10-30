var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');

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

var createUserSpace = function(pageName, cb) {

    var srcBasePath = path.join(__dirname + '/../_engine/myFanPage/dist');
    var dist = path.join(__dirname + '/../live-pages/'+pageName);

    var dirItems = [];
    var scriptSource;

    var symLinkMaker = function (symLinkCb) {

        var symLinks = [
            '/scripts',
            '/styles',
            '/404.html',
            '/index.html',
            '/src/core',
            '/src/webcontent',
            '/src'
        ];

        symLinks.push(scriptSource);

        var ensureSymLinkLoop = function (i) {

            if( i < symLinks.length ) {

                fs.ensureSymlink( srcBasePath+symLinks[i], dist+symLinks[i], function(err){

                    if(err){
                        symLinkCb(true, err);
                        return;
                    }else{
                        ensureSymLinkLoop(i+1);
                    }
                });

            }else{
                symLinkCb(false, 'success');
                return;
            }

        };

        ensureSymLinkLoop(0);

    };

    var copyConfigFile = function () {

        fs.copy(srcBasePath+'/src/config', dist+'/src/config', function (err) {

            if(err){
                cb(true, err);
            }else{

                symLinkMaker(function (err, d) {
                    cb(err, d);
                });

            }

        });

    }

    //TODO: doing the walk just to get scripts.js. Need to find way to get the file to a symLink
    fs.walk(srcBasePath).on('data', function (item) {
        dirItems.push(item.path);
    }).on('end', function () {

        scriptSource = dirItems.filter(function (i) {
            return i.search('scripts.js') != -1;
        })[0];

        scriptSource = scriptSource.replace(srcBasePath, '');
        copyConfigFile();

    });

}

exports.createUserSpace = createUserSpace;
exports.get = get;
exports.save = save;