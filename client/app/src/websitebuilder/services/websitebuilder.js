'use strict';

angular.module('WebsiteBuilder')
    .service('WBService', function WBService($http, $q) {

        var WBService = {};


        WBService.signUp = function(userData){

            var d = $q.defer();

            var URL = 'http://localhost:3319/builder/signup'

            $http({
                method: 'post',
                url: URL,
                params: {
                    userData: userData
                }
            }).success(function(res) {
                return d.resolve(res);
            }).error(function(err) {
                return d.reject(err);
            });

            return d.promise;

        };

        return WBService;

    });



