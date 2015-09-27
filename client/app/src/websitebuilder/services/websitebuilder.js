'use strict';

angular.module('WebsiteBuilder')
    .service('WBService', function WBService($http, $q) {

        var WBService = {};


        WBService.saveData = function(){

            var d = $q.defer();

            var URL = 'http://localhost:3319/builder/signup'

            $http({
                method: 'get',
                url: URL,
                //params: {
                //    isin: isinCode,
                //    shareclassName: shareclassName
                //},
            }).success(function(res) {
                return d.resolve(res);
            }).error(function(err) {
                return d.reject(err);
            });

            return d.promise;

        };

        return WBService;

    });



