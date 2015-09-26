'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};
    });