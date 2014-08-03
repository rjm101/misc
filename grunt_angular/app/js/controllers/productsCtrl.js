/* 
 * Products controller
 */
angular.module('App.controllers')

.controller('ProductsCtrl', function(ProductsService){

	this.items = ProductsService.products;

});