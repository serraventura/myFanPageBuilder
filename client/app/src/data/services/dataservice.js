'use strict';

angular.module('DataMod')
	.service('DataService', function DataService() {

		var DataService = {};

		DataService.disableWatch = false;
		DataService.loading = false;
		DataService.facebookData = {};
		DataService.facebookStatus = {
			status: undefined
		};
		DataService.params = {
		};

		DataService.default = {
			params: angular.copy(DataService.params),
			disableWatch: angular.copy(DataService.disableWatch)
		};

		return DataService;

	});



