/*
 * Prevent digest error with safeApply
 * Only trigger $apply if it is needed
 */
angular.module('App.services')

.factory('safeApply', function() {

	return function($scope, fn) {
		var phase = $scope.$root.$$phase;
		
		if(phase == '$apply' || phase == '$digest') {
			if (fn) {
				$scope.$eval(fn);
			}
		} else {
			if (fn) {
				$scope.$apply(fn);
			} else {
				$scope.$apply();
			}
		}
	};
});