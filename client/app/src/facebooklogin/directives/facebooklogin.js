'use strict';

angular.module('FacebookLogin')
.directive('facebookLogin', function(){
    return {
        restrict:'AE',
        controller: function($scope) {
        },
        templateUrl: 'src/facebooklogin/views/facebooklogin.html'
    }
})