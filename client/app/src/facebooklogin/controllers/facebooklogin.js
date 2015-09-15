'use strict';

angular.module('FacebookLogin')
    .controller('FBLoginController', function($scope, Facebook) {

            var userIsConnected = false;

            // Defining user logged status
            $scope.logged = false;
            $scope.user   = {};

            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    userIsConnected = true;
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
                    $scope.$apply(function() {
                        console.log('me: ', response);
                        $scope.user = response;
                    });

                });
            };

            $scope.myAccounts = function() {
                Facebook.api('/me/accounts', function(response) {

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
                if (data.status == 'connected') {
                    $scope.$apply(function() {
                        $scope.logged = true;
                        $scope.me();
                        $scope.myAccounts();
                    });
                } else {
                    $scope.$apply(function() {
                        $scope.logged = false;
                    });
                }

            });

    });