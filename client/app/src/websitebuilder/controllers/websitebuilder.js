'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService, WBService, $timeout) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};
        $scope.listTemplates = [];
        $scope.isUserRegistered = undefined;
        $scope.isFanPageRegistered = false;
        $scope.isLoading = true;
        $scope.isConnected = false;

        $scope.listTemplates = function(){

            WBService.listTemplates().then(function (d) {

                if(d.statusCode == 200){
                    $scope.listTemplates = d.response;
                }

            }, function(err){
                console.error(err);
            });

        }

        $scope.signUp = function(){

            var userData = {
                name: $scope.facebookData.user.name,
                email: $scope.facebookData.user.email,
                userId: $scope.facebookData.user.id,
                pageId: $scope.chosenPage.id
            };

            WBService.signUp(userData).then(function (d) {

                if(d.statusCode == 200){
                    $scope.isUserRegistered = true;
                    $scope.isFanPageRegistered = true;
                };

            }, function(err){
                console.error(err);
            });

        };

        $scope.isFanPagesAvailable = function(){
            return (($scope.facebookData.fanpages||[]).length>0) && !$scope.isFanPageRegistered;
        };

        //TODO: calling twice  check why
        $scope.$watch(function() {
            return DataService.facebookStatus.status;
        }, function(newVal, oldVal) {
            if (newVal !== oldVal) {

                if (!DataService.disableWatch) {

                    if(DataService.facebookStatus.status == 'connected'){

                        //DataService.disableWatch = true;

                        WBService.getUser({
                            facebookUserId: DataService.facebookStatus.authResponse.userID
                        }).then(function(d){

                            if(d.statusCode == 200 && !d.isError){
                                $scope.isUserRegistered = true;
                                $scope.isFanPageRegistered = (d.response.pages.length>0);
                            }else{
                                $scope.listTemplates();
                            };

                            $scope.isLoading = false;

                        }, function(err){
                            $scope.isLoading = false;
                            $scope.listTemplates();
                        });

                        $scope.isConnected = true;
                    }else{
                        $scope.isLoading = false;
                        $scope.isConnected = false;
                    }

                }else{
                    $timeout(function() { DataService.disableWatch = false; });
                };

            }else{
                $scope.isConnected = false;
            }

        });


    });