'use strict';

angular.module('WebsiteBuilder')
    .service('WBService', function WBService($http, $q) {

        var WBService = {};


        WBService.saveData = function(){

            var d = $q.defer();

            var URL = 'https://staging-api.kurtosys.io/tools/ksys319/fundfinder/fsdfhsdkj'

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



