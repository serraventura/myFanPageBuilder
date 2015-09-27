'use strict';

angular.module('BuilderApp', [
    'WebsiteBuilder'
])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
})

.controller('BuilderCtrl', function ($scope) {

})

.directive('builder', function(){
    return {
        restrict:'AE',
        controller: 'BuilderCtrl',
        template:"<div><div website-builder></div></div>"
    }
})