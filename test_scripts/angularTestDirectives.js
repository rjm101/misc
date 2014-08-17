angular.module('App.directives')

/* =================================================================
 *	Test directives
 * ================================================================= */
/**  
 *  Determine number of watchers on page
 *  This directive will run on page load simply by labelling a html tag as 
 *  the directive e.g: 'body'
 */
.directive('TAGNAMEHERE', function($log){
	return {
		restrict: 'E',
		link: function (scope, element, attrs) {
			//Run check every 3 seconds
			setInterval(function(){

				var root = $(document.getElementsByTagName('body')),
					watchers = [],
				
				f = function (element) {
					if (element.data().hasOwnProperty('$scope')) {
						angular.forEach(element.data().$scope.$$watchers, function (watcher) {
							watchers.push(watcher);
						});
					}

					angular.forEach(element.children(), function (childElement) {
						f($(childElement));
					});
				};

				f(root);

				$log.info("Total watchers: ", watchers.length);
			}, 2000); 
		}
	};
})
/**  
 *  Determine seconds taken to render ng repeated list
 *  Example: <li class="thumb_wrapper thumb_mob" data-ng-repeat="hotel in hotels" post-repeat-directive>
 */
.directive('postRepeatDirective', function($timeout, $log) {
	return function(scope, element, attrs) {

		var Log = function(){
			var reviewListLoaded = null;

			this.reviewListLoaded = function () {
				return reviewListLoaded;
			};

			this.setReviewListLoaded = function (date) {
				reviewListLoaded = date;
			};
		};

		var $log = new Log();

		if (scope.$last){
			$timeout(function(){
				
				var timeFinishedLoadingList = $log.reviewListLoaded(),
					ref = new Date(timeFinishedLoadingList),
					end = new Date();
				
				$log.info("## DOM rendering list took: " + (end - ref) + " ms");
			});
		}
	};
});