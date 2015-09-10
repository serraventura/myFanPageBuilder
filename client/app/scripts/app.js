'use strict';

angular.module('BuilderApp', [
    'oc.lazyLoad'
])

.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider){

    $ocLazyLoadProvider.config({
        modules: [

            {
                name: 'WebsiteBuilder',
                files: [
                    'src/websitebuilder/module.js',
                    'src/websitebuilder/directives/websitebuilder.js',
                    'src/websitebuilder/controllers/websitebuilder.js'
                ],
                serie: false
            },

            {
                name: 'DataMod',
                files: [
                    'src/data/module.js',
                    'src/data/services/dataservice.js'
                ],
                serie: false
            }

        ]
    });

}])

.run(function ($ocLazyLoad) {

    $ocLazyLoad.load([
        'WebsiteBuilder',
        'DataMod'
    ]);

})

.controller('BuilderCtrl', function ($scope) {

})

.directive('builder', function(){
    return {
        restrict:'AE',
        controller: function($scope) {
            $scope.files = [
                'src/websitebuilder/directives/websitebuilder.js',
                'src/websitebuilder/views/websitebuilder.html'
            ];
        },
        template:"<div oc-lazy-load='files'><div website-builder></div></div>"
    }
})