(function(angular, APPNAME){

	'use strict';

	// Declare app level module which depends on filters and services
	APPNAME.app = angular.module('App', [
		'ui.router',
		'ngAnimate',
		'App.templates',
		'App.router',
		'App.services',
		'App.filters',
		'App.directives',
		'App.controllers'
	])

	// Attach fast click handling
	.run(function(){

		FastClick.attach(document.body);
	});

	// Instantiate modules containing an array of items 
	// in order to prevent modules overriding other modules
	// defined with the same name
	angular.module('App.controllers', []);
	angular.module('App.filters', []);
	angular.module('App.directives', []);
	angular.module('App.services', []);

}(angular, APPNAME));