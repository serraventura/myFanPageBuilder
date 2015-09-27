'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService, WBService) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};

        $scope.save = function(){

            WBService.saveData().then(function (d) {
                console.log(d)
            });

        }

    });