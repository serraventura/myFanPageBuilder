'use strict';

angular.module('WebsiteBuilder')
    .controller('WBController', function($scope, DataService, WBService, $timeout) {
        $scope.DataService = DataService;
        $scope.facebookData = DataService.facebookData;
        $scope.chosenPage = {id: ''};
        $scope.listThumbTemplates = [];
        $scope.isUserRegistered = undefined;
        $scope.isFanPageRegistered = false;
        $scope.isLoading = true;
        $scope.isConnected = false;

        var getPageDetails = function (pageId, fanPages) {

            var pageDetails = _.get(_.where(fanPages, {id: pageId}), ['0'], undefined)
            var pageName = _.get(pageDetails, ['link'], '').match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];

            pageDetails['pageName'] = pageName;

            return pageDetails;

        };

        var checkStatus = function(){

            WBService.getUser({
                facebookUserId: DataService.facebookStatus.authResponse.userID
            }).then(function(d){

                if(d.statusCode == 200 && !d.isError){
                    $scope.isUserRegistered = true;
                    $scope.isFanPageRegistered = (d.response.pages.length>0);
                    $scope.currentFanPageId = _.first( d.response.pages).pageId;

                    if(!_.first(d.response.pages).template){
                        $scope.listTemplates();
                    }

                };

                $scope.isLoading = false;

            }, function(err){
                $scope.isLoading = false;
            });

        };

        $scope.chooseTemplate = function (template) {

            var pageDetails = getPageDetails($scope.currentFanPageId, $scope.facebookData.fanpages);

            WBService.getTemplate(template.name, pageDetails.pageName).then(function (d) {

                //$('#templateContainer').attr('src', 'http://localhost:3319/' + d.response.path);
                $.get('http://localhost:3319/' + d.response.path, function (d) {

                    d = d.replace('styles/main.css', 'http://localhost:3319/templates/myfanpageapp/styles/main.css');
                    d = d.replace('scripts/vendor.js', 'http://localhost:3319/templates/myfanpageapp/scripts/vendor.js');
                    d = d.replace('src/scripts.js', 'http://localhost:3319/templates/myfanpageapp/src/scripts.js');
                    d = d.replace('src/config/config.js', 'http://localhost:3319/templates/myfanpageapp/src/config/config.js');
                    d = d.replace('ng-app', 'id');

                    $('#templateContainer2').html(d);

                    setTimeout(function () {
                        var container = $('#templateContainer2').find('.myfp__container');
                        $('#templateContainer').html(container);
                        angular.bootstrap($('#templateContainer'), ['myFanPageApp']);
                    }, 800);

                });

            });

        };

        $scope.listTemplates = function(){

            WBService.listTemplates().then(function (d) {

                if(d.statusCode == 200){
                    $scope.listThumbTemplates = d.response;
                }

            }, function(err){
                console.error(err);
            });

        };

        $scope.signUp = function(){

            $scope.currentFanPageId = $scope.chosenPage.id;

            var userData = {
                name: $scope.facebookData.user.name,
                email: $scope.facebookData.user.email,
                userId: $scope.facebookData.user.id,
                pageId: $scope.chosenPage.id,
                pageDetails: getPageDetails($scope.currentFanPageId, $scope.facebookData.fanpages)
            };

            WBService.signUp(userData).then(function (d) {

                if(d.statusCode == 200){
                    $scope.isUserRegistered = true;
                    $scope.isFanPageRegistered = true;
                    $scope.listTemplates();
                };

            }, function(err){
                console.error(err);
            });

        };

        $scope.isFanPagesAvailable = function(){
            return (($scope.facebookData.fanpages||[]).length>0) && !$scope.isFanPageRegistered;
        };

        //TODO: calling twice  check why
        $scope.$watch(function() {
            return DataService.facebookStatus.status;
        }, function(newVal, oldVal) {

            //if (newVal !== oldVal) {
            if (newVal === 'connected') { // testing

                if (!DataService.disableWatch) {

                    if(DataService.facebookStatus.status == 'connected'){
                        checkStatus();
                        $scope.isConnected = true;
                    }else{
                        $scope.isLoading = false;
                        $scope.isConnected = false;
                    }

                }else{
                    $timeout(function() { DataService.disableWatch = false; });
                };

            }else{
                $scope.isConnected = false;
            }

        });


    });