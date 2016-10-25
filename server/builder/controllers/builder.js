var express = require('express');
var _ = require('lodash');
var Q = require('q');
var moment = require('moment');

var builderService = require('../services/builder');
var Return = require('../../classes/Return');
//var settings = require('../../includes/settings');
//var utils = require('../../includes/utils');

var previewPage = function(req, res) {

    builderService.previewPage(req.body, req.headers, function(err, ret){

        var http;

        if(!err && ret){

            http = Return.http.ok;
            http.customMessage = 'Page config generated successfully.';
            http.response = ret;

            res.status(http.statusCode);
            res.json(http);

        }else{

            http = Return.http.badRequest;
            http.customMessage = 'Not possible to preview the changes to the page.';
            http.response = err;

            res.status(http.statusCode);
            res.json(http);

        }

    });

};

var signup = function(req, res) {

    builderService.save(req.body, req.headers, function(err, ret){

        var http;

        if(!err && ret){

            http = Return.http.ok;
            http.customMessage = 'Step 1 data saved.';
            http.response = ret;

            res.status(http.statusCode);
            res.json(http);

        }else{

            http = Return.http.badRequest;
            http.customMessage = 'Not possible to save data.';
            http.response = err;

            res.status(http.statusCode);
            res.json(http);

        }

    });

};

var listTemplates = function(req, res) {

    builderService.listTemplates(req.headers, function(err, ret){

        var http;

        if(!err && ret){

            http = Return.http.ok;
            http.customMessage = '';
            http.response = ret;

            res.status(http.statusCode);
            res.json(http);

        }else{

            if( _.has(err, 'error', 'type', 'OAuthException') ){
                http = Return.http.error;
                http.customMessage = err.error.message;
            }else if( _.has(err, 'message') ){
                http = Return.http.error;
                http.customMessage = err.message;
            }else{
                http = Return.http.badRequest;
                http.customMessage = err;
            }

            http.response = err;

            res.status(http.statusCode);
            res.json(http);

        }

    });

};

var getUser = function(req, res){

    builderService.getUser(req.query, req.headers, function(err, user, msg){

        var http;

        if(!err && user) {

            http = Return.http.ok;
            http.customMessage = 'User Found.';
            http.response = user;

            res.status(http.statusCode);
            res.json(http);

        }else if(!err && !user && msg){

            http = Return.http.handledError;
            http.customMessage = msg;
            http.response = msg;

            res.status(http.statusCode);
            res.json(http);

        }else{

            if( _.has(err, 'error', 'type', 'OAuthException') ) {
                http = Return.http.error;
                http.customMessage = err.error.message;
            }else if( _.has(err, 'message') ){
                http = Return.http.error;
                http.customMessage = err.message;
            }else{
                http = Return.http.badRequest;
                http.customMessage = err;
            }

            http.response = err;

            res.status(http.statusCode);
            res.json(http);

        }

    });

};

var setTemplate = function(req, res){

    builderService.setTemplate(req.body, req.headers, function(err, template, msg){

        var http;

        if(!err && template) {

            http = Return.http.ok;
            http.customMessage = 'Template Found.';
            http.response = template;

            res.status(http.statusCode);
            res.json(http);

        }else if(!err && !template && msg){

            http = Return.http.handledError;
            http.customMessage = msg;
            http.response = msg;

            res.status(http.statusCode);
            res.json(http);

        }else{

            if( _.has(err, 'error', 'type', 'OAuthException') ) {
                http = Return.http.error;
                http.customMessage = err.error.message;
            }else if( _.has(err, 'message') ){
                http = Return.http.error;
                http.customMessage = err.message;
            }else{
                http = Return.http.badRequest;
                http.customMessage = err;
            }

            http.response = err;

            res.status(http.statusCode);
            res.json(http);

        }

    });

};

exports.setTemplate = setTemplate;
exports.getUser = getUser;
exports.listTemplates = listTemplates;
exports.signup = signup;
exports.previewPage = previewPage;