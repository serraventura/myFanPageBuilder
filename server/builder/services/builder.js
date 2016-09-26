var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('lodash');
var fs = require('fs-extra');
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

var setTemplate = function(params, headers, cb){

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        var srcBasePath = path.join(__dirname + '/../../_engine/myFanPage/app/src/webcontent/views/templates/'+params.templateName+'/config.js');
        var dist = path.join(__dirname + '/../../live-pages/'+params.pageName+'/src/config/config.js');

        fs.copy(srcBasePath, dist, function (err) {

            if(err){
                cb(true, err);
            }else{
                cb(err, {
                    path: 'templates/'+params.pageName,
                    details: params
                });
            };

        });

    }, function(err){
        cb(err, false);
    });

}

exports.setTemplate = setTemplate;
exports.listTemplates = listTemplates;
exports.getUser = getUser;
exports.save = save;