'use strict';
angular.module('FacebookLogin', [
    'facebook',
    ['bower_components/angular-facebook/lib/angular-facebook.js']
])

.config(function(FacebookProvider) {

    FacebookProvider.setSdkVersion('v2.4');

    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('1670460713200673');
})