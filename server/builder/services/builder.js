var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('lodash');

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

                        var link = _.get(JSON.parse(params.pageDetails||{}), ['link'], '');
                        var pageName = link.match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];

                        User.createUserSpace(pageName, function(err, info) {

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

exports.listTemplates = listTemplates;
exports.getUser = getUser;
exports.save = save;