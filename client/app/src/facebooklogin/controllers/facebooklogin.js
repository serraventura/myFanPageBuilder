'use strict';

angular.module('FacebookLogin')
    .controller('FBLoginController', function($scope, Facebook, DataService) {

            var userIsConnected = false;
            $scope.isLoading = true;

            // Defining user logged status
            $scope.logged = false;
            $scope.user   = {};

            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    userIsConnected = true;
                }else{
                    $scope.isLoading = false;
                }
            });

            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(function() {
                    return Facebook.isReady();
                }, function(newVal) {
                    if (newVal) {
                        $scope.facebookReady = true;
                    }
                }
            );

            $scope.login = function() {

                if(!userIsConnected) {

                    Facebook.login(function(response) {

                        if (response.status == 'connected') {
                            $scope.logged = true;
                            $scope.me();
                            $scope.myAccounts();
                        }

                    }, {scope: 'email,manage_pages'});

                }

            };

            $scope.me = function() {
                Facebook.api('/me?fields=id,name,email', function(response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    DataService.facebookData['user'] = response;
                    $scope.$apply(function() {
                        console.log('me: ', response);
                        $scope.user = response;
                    });

                    $scope.isLoading = false;

                });
            };

            $scope.myAccounts = function() {
                Facebook.api('/me/accounts?fields=link,about,name,category', function(response) {
                    DataService.facebookData['fanpages'] = response.data;
                    console.log('accounts: ', response);

                });
            };

            $scope.logout = function() {
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user   = {};
                        $scope.logged = false;
                    });
                });
            }

            /**
             * Taking approach of Events
             */
            $scope.$on('Facebook:statusChange', function(ev, data) {
                console.log('Status: ', data);
                DataService.facebookStatus = data;
                if (data.status == 'connected') {
                    $scope.$apply(function() {
                        $scope.logged = true;
                        $scope.me();
                        $scope.myAccounts();
                    });
                } else {
                    $scope.$apply(function() {
                        $scope.logged = false;
                        $scope.isLoading = false;
                    });
                }

            });

    });