var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('lodash');

var settings = require('../../includes/settings');
var utils = require('../../includes/utils');
var FB = require('../../classes/FB');
var User = require('../../models/users').userSchema;
var Template = require('../../models/templates').templateSchema;

function saveToDB(params, cb){

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

function save(params, headers, cb) {

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        var query  = User.where({username: params.email});
        query.findOne(function(err, user){

            if(err) cb(err, false);

            if(!user){
                saveToDB(params, function(err, ret){
                    cb(err, ret);
                });
            }else{
                cb('User already exist.', false);
            }

        });

    }, function(err){
        cb(err, false);
    });

}

function listTemplates(headers, cb) {

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

exports.listTemplates = listTemplates;
exports.save = save