'use strict';

angular.module('BuilderApp', [
    'WebsiteBuilder'
])

.controller('BuilderCtrl', function ($scope) {

})

.directive('builder', function(){
    return {
        restrict:'AE',
        controller: 'BuilderCtrl',
        template:"<div><div website-builder></div></div>"
    }
})