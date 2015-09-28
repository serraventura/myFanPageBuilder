var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('lodash');

var settings = require('../../includes/settings');
var utils = require('../../includes/utils');
var FB = require('../../classes/FB');

function save(params, headers, cb) {

    FB.tokenValidation(headers['auth-token']).then(function (data) {

        cb(true);

    }, function(error){

        cb(false);

    });

}

exports.save = save