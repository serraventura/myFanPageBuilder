'use strict';

angular.module('WebsiteBuilder')
.directive('websiteBuilder', function(){
    return {
        restrict:'AE',
        scope: true,
        controller: function($scope) {

            $scope.files = [
                'src/facebooklogin/directives/facebooklogin.js',
                'src/facebooklogin/views/facebooklogin.html'
            ];

        },
        templateUrl: 'src/websitebuilder/views/websitebuilder.html'
    }
})