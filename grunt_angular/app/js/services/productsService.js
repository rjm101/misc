/*
 * Store products data here
 */
angular.module('App.services')

.service('ProductsService', function(){

	this.products = [
		{
			name: 'Product A',
			id: '097123',
			description: 'Product A description here',
			price: 200
		},
		{
			name: 'Product B',
			id: '0325145',
			description: 'Product B description here',
			price: 500
		},
		{
			name: 'Product C',
			id: '064234',
			description: 'Product C description here',
			price: 800
		}
	];

});