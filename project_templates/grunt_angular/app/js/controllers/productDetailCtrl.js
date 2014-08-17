/* 
 * Product Detail controller
 */
angular.module('App.controllers')

.controller('ProductDetailCtrl', function($stateParams, ProductsService) {

	this.item = _.findWhere(ProductsService.products, {id: $stateParams.productId});

});