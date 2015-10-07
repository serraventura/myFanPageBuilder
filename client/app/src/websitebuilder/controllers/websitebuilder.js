'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService, WBService, $timeout) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};
        $scope.listTemplates = [];
        $scope.isUserRegistered = undefined;
        $scope.isFanPageRegistered = false;

        $scope.signUp = function(){

            var userData = {
                name: $scope.facebookData.user.name,
                email: $scope.facebookData.user.email,
                userId: $scope.facebookData.user.id,
                pageId: $scope.chosenPage.id
            };

            WBService.signUp(userData).then(function (d) {

                if(d.statusCode == 200){

                    WBService.listTemplates().then(function (d) {

                        if(d.statusCode == 200){
                            $scope.listTemplates = d.response;
                        }

                    }, function(err){
                        console.error(err);
                    });

                };

            }, function(err){
                console.error(err);
            });

        };

        $scope.isFanPagesAvailable = function(){
            return (($scope.facebookData.fanpages||[]).length>1) && !$scope.isFanPageRegistered;
        };

        $scope.$watch(function() {
            return DataService.facebookData.userStatus;
        }, function(newVal, oldVal) {
            if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {

                if (!DataService.disableWatch) {

                    if(DataService.facebookData.userStatus.status == 'connected' && $scope.isUserRegistered == undefined){

                        DataService.disableWatch = true;

                        WBService.getUser({
                            facebookUserId: DataService.facebookData.userStatus.authResponse.userID
                        }).then(function(d){
                            if(d.statusCode == 200){
                                $scope.isUserRegistered = true;
                                $scope.isFanPageRegistered = (d.response.facebookPageId.length>0);
                            }

                        });

                    }

                }else{
                    $timeout(function() { DataService.disableWatch = false; });
                };

            };

        }, true);


    });