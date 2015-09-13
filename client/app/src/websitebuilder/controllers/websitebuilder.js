'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, Facebook) {

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
                        }

                    });

                }

            };

            $scope.me = function() {
                Facebook.api('/me', function(response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function() {
                        $scope.user = response;
                    });

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
                    });
                } else {
                    $scope.$apply(function() {
                        $scope.logged = false;
                    });
                }

            });

    });