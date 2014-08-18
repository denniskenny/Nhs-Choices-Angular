'use strict';


angular.module('nhsApp', ['ngRoute', 'ngSanitize', 'nhsApp.filters', 'nhsApp.services', 'nhsApp.directives', 'nhsApp.controllers']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/conditions', {
		templateUrl : 'partials/conditions.html',
		controller : 'choicesController'
	});
	$routeProvider.otherwise({
		redirectTo : '/conditions'
	});
}]);

