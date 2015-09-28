var express = require('express');
var _ = require('lodash');
var Q = require('q');
var moment = require('moment');

var builderService = require('../services/builder');
//var settings = require('../../includes/settings');
//var utils = require('../../includes/utils');

function signup(req, res) {

    builderService.save(req.query, req.headers, function(data){

        res.status(200);
        res.json({});

    });

};

exports.signup = signup;

