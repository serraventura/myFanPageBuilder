'use strict';
angular.module('WebsiteBuilder', [
    'facebook',
    ['bower_components/angular-facebook/lib/angular-facebook.js']
])

.config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('1219941394699091');
})