/*
 * Angular UI Router
 * See docs: http://angular-ui.github.io/ui-router/site/#/api/ui.router
 */
angular.module('App.router', [])

.config(function($stateProvider, $urlRouterProvider) {

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
		controller: 'HomeCtrl as home'
	})

	// products
	.state('site.products', {
		url: '/products',
		templateUrl: 'partials/products.html',
		controller: 'ProductsCtrl as products'
	})

	// product detail
	.state('site.product', {
		url: '/product/:productId',
		templateUrl: 'partials/productDetail.html',
		controller: 'ProductDetailCtrl as productDetail'
	});

	$urlRouterProvider.otherwise('/site/home');

});