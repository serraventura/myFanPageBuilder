var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs-extra');
var readline = require('readline');
var path = require('path');

var settings = require('../../includes/settings');
var utils = require('../../includes/utils');
var FB = require('../../classes/FB');
var User = require('../../classes/User');
var Template = require('../../models/templates').templateSchema;

var save = function(params, headers, cb) {

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        User.get({email: params.email}, function(err, user){

            if(err) {
                cb(err, user);
                return false;
            }

            if(!user){
                User.save(params, function(err, ret){

                    if(!err){

                        try{

                            var page = params.pages.filter(function(item) {
                                return item.id === params.selectedPageId
                            });

                            if (page.length > 0){
                                //get from link the page name
                                page = page[0].link.match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];
                            } else {
                                throw new Error('No page name found. You need the page name to create a user space.');
                            }

                        }catch(err){
                            cb(err, undefined);
                        };

                        User.createUserSpace(page, function(err, info) {

                            if(!err){
                                cb(err, ret);
                            }else{
                                cb(err, info);
                            }

                        });

                    }else{
                        cb(err, ret);
                    }

                });
            }else{
                cb('User already exist.', undefined);
            }

        });

    }, function(err){
        cb(err, false);
    });

}

var listTemplates = function(headers, cb) {

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        var query = Template.where({active: true});
        query.find({}, function (err, templates) {

            if(!err){
                cb(err, templates);
            }else{
                cb(err, templates);
            }

        })

    }, function(err){
        cb(err, false);
    });

}

var getUser = function(params, headers, cb){

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        User.get(params, function(err, user, msg){
            cb(err, user, msg);
        });

    }, function(err){
        cb(err, false);
    });

}

//TODO: refactoring to remove deep inner functions
var setTemplate = function(params, headers, cb){

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        var srcBasePath = path.join(__dirname + '/../../_engine/myFanPage/app/src/webcontent/views/templates/'+params.templateName+'/config.js');
        var dist = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/');

        // first of all copy the template version of the config file to the live template
        fs.copy(srcBasePath, dist + 'config.js', function (err) {

            if(err){
                cb(true, err);
            }else{

                // if everything is ok get content of the config file
                var file = '';
                var rd = readline.createInterface({
                    input: fs.createReadStream(srcBasePath),
                    output: process.stdout,
                    terminal: false
                });

                rd.on('line', function(line) {

                    var endFile = line.indexOf(');') !== -1;
                    var beginFile = line.indexOf('use strict') !== -1;
                    var angularBeginFile = line.indexOf('constant') !== -1;

                    // getting only the content needed to manipulate a JSON.
                    // the javascript part is ignored 
                    if ( !beginFile && !angularBeginFile && !endFile ) {
                        file += line.trim();
                    }

                });

                rd.on('close', function(line) {

                    // transform the file content to a JSON.
                    var jsonObj = JSON.parse('{'+file+'}');
                    var json = JSON.stringify(jsonObj);
                    var jsonFormatted = JSON.stringify(jsonObj, null, 2);

                    // save the JSON file representation of the config file 
                    // to manipulate later dynamically.
                    fs.writeFile(dist + 'config.json', jsonFormatted, 'utf8', function(err, data) {

                        if(err) {
                            cb(true, err);
                        } else {

                            //TODO: refactoring to one single function
                            // replace config file with latest changes
                            fs.writeFile(dist + 'config.js', genenerateConfigFileJS(jsonObj, params.templateName), 'utf8', function(err, data) {

                                if(err) {
                                    cb(true, err);
                                } else {
                                    cb(err, {
                                        path: 'templates/'+params.pageName,
                                        details: params,
                                        templateConfig: json
                                    });
                                }

                            });

                        }

                    });

                });


            };

        });

    }, function(err){
        cb(err, false);
    });

}

var previewPage = function(params, headers, cb) {

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        var src = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/config.json');
        var dist = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/config.js');

        fs.readFile(src, 'utf8', function (err, data) {
            
            if(err){
                cb(true, err);
            }else{

                var jsonObj = JSON.parse(data);
                var json = JSON.stringify(jsonObj);
                jsonObj.menu = params.templateConfig.menu;

                //TODO: refactoring to one single function
                // replace config file with latest changes
                fs.writeFile(dist, genenerateConfigFileJS(jsonObj), 'utf8', function(err, data) {

                    if(err) {
                        cb(true, err);
                    } else {
                        cb(err, {
                            path: 'templates/'+params.pageName,
                            details: params,
                            templateConfig: json
                        });
                    }

                });

            }

        });

    });

}

var genenerateConfigFileJS = function (jsonConfig, templateName) {

    //keep myfanpageapp hardcoded for fake data
    jsonConfig.fanPageId = 'myfanpageapp';//params.pageName;
    if (templateName) jsonConfig.template = templateName;

    var jsonFormatted = JSON.stringify(jsonConfig, null, 2);
    var jsConfig = 'angular.module("myFanPageApp").constant("FanPageConfig",'+jsonFormatted+');';

    return jsConfig;

}

exports.setTemplate = setTemplate;
exports.listTemplates = listTemplates;
exports.getUser = getUser;
exports.save = save;
exports.previewPage = previewPage;