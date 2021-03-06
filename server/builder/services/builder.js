var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs-extra');
var readline = require('readline');
var path = require('path');
var cheerio = require('cheerio');

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
                    cb(err, ret);
                });
            }else{
                cb('User already exist.', undefined);
            }

        });

    }, function(err){
        cb(err, false);
    });

}

var createUserSpace = function(page, params, headers, cb) {

    if (!page && (!headers || !params)) return cb('Not possible to create user space. no parameters passed.', false);

    var userSpaceCreation = function(page) {
        User.createUserSpace(page, function(err, info) {
            cb(err, info);
        });
    };

    if (page) {
        userSpaceCreation(page);
    } else {

        FB.tokenValidation(headers['auth-token']).then(function (data) {
            var page = params.pages.filter(function(item) {
                return item.id === params.selectedPageId
            });

            if (page.length > 0){
                //get from link the page name
                page = page[0].link.match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];
            } else {
                throw new Error('No page name found. You need the page name to create a user space.');
            }
            userSpaceCreation(page);
        }, function(err){
            cb(err, false);
        });

    }

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

var generateConfigFiles = function(templateName, pageName, fileContent, makeBackup, cb) {

    var dist = path.join(__dirname + '/../../live-pages/'+pageName+'/src/config/');
    var jsonObj = JSON.parse(fileContent);

    // save the JSON file representation of the config file
    // to manipulate later dynamically.
    fs.writeFile(dist + 'config.json', fileContent, 'utf8', function(err, data) {

        if(err) {
            cb(true, err);
        } else {

            if (!makeBackup) {

                fs.writeFile(dist + 'config.js', genenerateConfigFileJS(jsonObj), 'utf8', function(err, data) {
                    cb(err, data);
                });

            } else {

                fs.writeFile(dist+'config.js', genenerateConfigFileJS(jsonObj), 'utf8', function(err, data) {

                    if(err) {
                        cb(err);
                    } else {

                        fs.copy(dist+'config.json', dist+'config-bkp-'+pageName+'-'+templateName+'.json', function(err, data) {
                            cb(err, data);
                        });

                    }

                });

            }

        }

    });

}

var copyConfigFromTemplate = function(templateName, pageName, cb) {

    // copy the template version of the config file to the live template
    var srcTemplatePath = path.join(__dirname + '/../../_engine/myFanPage/app/src/webcontent/views/templates/'+templateName+'/config.js');
    var dist = path.join(__dirname + '/../../live-pages/'+pageName+'/src/config/');

    //TODO: review the real need to use copy here
    fs.copy(srcTemplatePath, dist + 'config.js', function (err) {

        if(err){
            cb(true, err);
        }else{

            // if everything is ok get content of the config file
            var file = '';
            var rd = readline.createInterface({
                input: fs.createReadStream(srcTemplatePath),
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
                jsonObj.prefixAbsoluteTemplateUrl = jsonObj.prefixAbsoluteTemplateUrl.replace(/{@@PAGE}/g, pageName);
                var json = JSON.stringify(jsonObj);
                var jsonFormatted = JSON.stringify(jsonObj, null, 2);

                generateConfigFiles(templateName, pageName, jsonFormatted, false, function(err, data) {

                    if (err) {
                        cb(err);
                    } else {
                        cb(err, {
                            path: 'templates/'+pageName,
                            details: {
                                pageName: pageName,
                                templateName: templateName
                            },
                            templateConfig: json
                        });
                    }

                });

            });


        };

    });

}

//TODO: refactoring to remove deep inner functions (using promises)
var setTemplate = function(params, headers, cb){

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        createUserSpace(params.pageName, null, null, function(err, data) {

            if (err) {
                cb(err);
            } else {

                //TODO: change template accordingly. currently using same template all the time
                var dist = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/');

                //if config file backup exist setTemplate should load config file from live template folder
                fs.readFile(dist+'config-bkp-'+params.pageName+'-'+params.templateName+'.json', 'utf8', function(err, data) {

                    if (!err) {

                        console.log('using preview backup');
                        generateConfigFiles(params.templateName, params.pageName, data, false, function(err) {

                            if (err) {
                                cb(err);
                            } else {

                                cb(err, {
                                    path: 'templates/'+params.pageName,
                                    details: params,
                                    templateConfig: data
                                });

                            }

                        });

                    } else {

                        copyConfigFromTemplate(params.templateName, params.pageName, function(err, data) {
                            cb(err, data);
                        });

                    }

                });
            }

        });

    }, function(err){
        cb(err, false);
    });

}

var previewPage = function(params, headers, cb) {

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        var src = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/config.json');
        var dist = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/');
        var indexHTML = path.join(__dirname + '/../../live-pages/'+params.pageName+'/index.html');

        var defer = Q.defer();

        var updateConfigFile = function() {

            fs.readFile(src, 'utf8', function (err, data) {

                if(err){
                    // cb(true, err);
                    defer.reject(err);
                }else{
                    var jsonObj = JSON.parse(data);
                    var json = JSON.stringify(jsonObj);

                    //TODO: check if config.json file should be updated too (Answer: YES)
                    // for now only config.js is being updated with new menu
                    jsonObj.menu = params.templateConfig.menu;
                    jsonObj.enableCache = false;

                    var newConfig = JSON.stringify(jsonObj, null, 2);

                    generateConfigFiles(params.templateName, params.pageName, newConfig, true, function(err, data) {

                        if (!err) {
                            console.log('preview page config.json file backup done');
                            defer.resolve({
                                path: 'templates/'+params.pageName
                            });
                        } else {
                            defer.reject(err);
                        }

                    });

                }

            });

            return defer.promise;

        }

        var updateIndexHTML = function() {

            fs.readFile(indexHTML, 'utf8', function (err, data) {

                if (err) {
                    defer.reject(err);
                } else {

                    var DOM = cheerio.load(data);
                    var scripts = DOM('script');
                    scripts.eq(scripts.length-1).attr('src', 'src/config/config.js?rel='+Math.random());

                    fs.writeFile(indexHTML, DOM.html(), 'utf8', function(err, data) {

                        if (err) {
                            defer.reject(err);
                        } else {
                            defer.resolve(data);
                        }

                    });

                }

            });

            return defer.promise;
        }

        var arrPromises = [
            updateConfigFile(),
            updateIndexHTML()
        ];

        Q.all(arrPromises)
            .then(function (data) {
                cb(null, {
                    pageName: params.pageName
                });
            })
            .catch(function(err) {
                cb(err, null);
            });

    });

}

var genenerateConfigFileJS = function (jsonConfig, templateName) {

    //keep myfanpageapp hardcoded for fake data
    jsonConfig.fanPageId = 'myfanpageapp';//params.pageName;
    jsonConfig.enableCache = false;

    var jsonFormatted = JSON.stringify(jsonConfig, null, 2);
    var jsConfig = 'angular.module("myFanPageApp").constant("FanPageConfig",'+jsonFormatted+');';

    return jsConfig;

}

exports.setTemplate = setTemplate;
exports.listTemplates = listTemplates;
exports.getUser = getUser;
exports.save = save;
exports.previewPage = previewPage;
exports.createUserSpace = createUserSpace;
