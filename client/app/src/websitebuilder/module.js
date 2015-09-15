'use strict';
angular.module('WebsiteBuilder', [
])

.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider){

    $ocLazyLoadProvider.config({
        modules: [

            {
                name: 'FacebookLogin',
                files: [
                    'src/facebooklogin/module.js',
                    'src/facebooklogin/directives/facebooklogin.js',
                    'src/facebooklogin/controllers/facebooklogin.js'
                ],
                serie: true
            }

        ]
    });

}])

.run(function ($ocLazyLoad) {

    $ocLazyLoad.load([
        'FacebookLogin'
    ]);

})