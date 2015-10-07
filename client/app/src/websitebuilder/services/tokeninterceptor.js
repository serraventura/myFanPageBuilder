angular.module('WebsiteBuilder')
    .factory('TokenInterceptor', function ($q, $window, $location, DataService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};

                if (DataService.facebookStatus && DataService.facebookStatus.status == 'connected') {
                    config.headers['Auth-Token'] = DataService.facebookStatus.authResponse.accessToken;
                }

                //if ($window.sessionStorage.token) {
                //    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                //}
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200) {

                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401) {
                    $location.path("/");
                }

                return $q.reject(rejection);
            }
        };
    });