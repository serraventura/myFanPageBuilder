var express = require('express');
var _ = require('lodash');
var Q = require('q');
var moment = require('moment');

var builderService = require('../services/builder');
var Return = require('../../classes/Return');
//var settings = require('../../includes/settings');
//var utils = require('../../includes/utils');

function signup(req, res) {

    builderService.save(req.query, req.headers, function(err, ret){

        var http;

        if(!err && ret){

            http = Return.http.ok;
            http.customMessage = 'Step 1 data saved.';

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

exports.signup = signup;

