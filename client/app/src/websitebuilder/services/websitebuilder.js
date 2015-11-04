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
                    name: userData.name,
                    email: userData.email,
                    facebookUserId: userData.userId,
                    pageId: userData.pageId,
                    pageDetails: userData.pageDetails
                }
            }).success(function(res) {
                return d.resolve(res);
            }).error(function(err) {
                return d.reject(err);
            });

            return d.promise;

        };

        WBService.getUser = function(params){

            var d = $q.defer();

            var URL = 'http://localhost:3319/builder/user'

            $http({
                method: 'get',
                url: URL,
                params: params
            }).success(function(res) {
                return d.resolve(res);
            }).error(function(err) {
                return d.reject(err);
            });

            return d.promise;

        };

        WBService.getTemplate = function(name, pageName){

            var d = $q.defer();

            var URL = 'http://localhost:3319/builder/gettemplate'

            $http({
                method: 'get',
                url: URL,
                params: {
                    templateName: name,
                    pageName: pageName
                }
            }).success(function(res) {
                return d.resolve(res);
            }).error(function(err) {
                return d.reject(err);
            });

            return d.promise;

        };

        WBService.listTemplates = function(userData){

            var d = $q.defer();

            var URL = 'http://localhost:3319/builder/listtemplates'

            $http({
                method: 'get',
                url: URL
            }).success(function(res) {
                return d.resolve(res);
            }).error(function(err) {
                return d.reject(err);
            });

            return d.promise;

        };

        return WBService;

    });



