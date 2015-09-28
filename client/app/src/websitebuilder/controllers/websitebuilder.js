'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService, WBService) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};

        $scope.signUp = function(){

            var userData = {
                name: $scope.facebookData.user.name,
                email: $scope.facebookData.user.email,
                userId: $scope.facebookData.user.id,
                pageId: $scope.chosenPage.id
            };

            WBService.signUp(userData).then(function (d) {
                console.log(d)
            });

        };

        $scope.isFanPagesAvailable = function(){
            return ($scope.facebookData.fanpages||[]).length>1;
        };

    });