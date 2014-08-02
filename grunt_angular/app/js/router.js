/*
 * Router
 * See docs: http://angular-ui.github.io/ui-router/site/#/api/ui.router
 */
angular.module('App.router', [])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/site/home');

	$stateProvider
	
	// layout template
	.state('site', {
		url: '/site',
		templateUrl: 'partials/layout.html'
	})

	// home
	.state('site.home', {
		url: '/home',
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	});
});