'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService, WBService, $timeout) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};
        $scope.listThumbTemplates = [];
        $scope.isUserRegistered = undefined;
        $scope.isFanPageRegistered = false;
        $scope.isLoading = true;
        $scope.isConnected = false;

        $scope.listTemplates = function(){

            WBService.listTemplates().then(function (d) {

                if(d.statusCode == 200){
                    $scope.listThumbTemplates = d.response;
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
                    $scope.listTemplates();
                };

            }, function(err){
                console.error(err);
            });

        };

        var checkStatus = function(){

            WBService.getUser({
                facebookUserId: DataService.facebookStatus.authResponse.userID
            }).then(function(d){

                if(d.statusCode == 200 && !d.isError){
                    $scope.isUserRegistered = true;
                    $scope.isFanPageRegistered = (d.response.pages.length>0);

                    if(!_.first(d.response.pages).template){
                        $scope.listTemplates();
                    }

                };

                $scope.isLoading = false;

            }, function(err){
                $scope.isLoading = false;
            });

        };

        $scope.isFanPagesAvailable = function(){
            return (($scope.facebookData.fanpages||[]).length>0) && !$scope.isFanPageRegistered;
        };

        //TODO: calling twice  check why
        $scope.$watch(function() {
            return DataService.facebookStatus.status;
        }, function(newVal, oldVal) {

            //if (newVal !== oldVal) {
            if (newVal === 'connected') { // testing

                if (!DataService.disableWatch) {

                    if(DataService.facebookStatus.status == 'connected'){
                        checkStatus();
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