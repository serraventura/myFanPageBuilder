'use strict';

angular.module('WebsiteBuilder')
.directive('websiteBuilder', function(){
    return {
        restrict:'AE',
        scope: true,
        controller: function($scope) {

        },
        templateUrl: 'src/websitebuilder/views/websitebuilder.html'
    }
})