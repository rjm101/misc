angular.module('App.directives')

/* =================================================================
 *	Generic directives
 * ================================================================= */
/**
 * Stop propagation directive eg: data-stop-prop
 */
.directive('stopProp', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			
			element.bind('click', function (event) {
				event.stopPropagation();
			});
		}
	};
})
/**
 * Prevent default behavour e.g. <button> inside form triggering submit
 */
.directive('preventDefault', function() {
	return function(scope, element, attrs) {

		element.bind('click', function(event) {
			event.preventDefault();
		});
	};
})
/**
 * Focus element when true returned 
 */
.directive('focusMe', function($timeout, $parse) {
	return {
		//scope: true,   // optionally create a child scope
		link: function(scope, element, attrs) {
			
			var model = $parse(attrs.focusMe);

			scope.$watch(model, function(value) {
				
				if (value === true) {
					$timeout(function() {
						element[0].focus();
					}, 500);
				}
			});

			// set attribute value to 'false'
			// on blur event:
			element.bind('blur', function() {
				scope.$apply(model.assign(scope, false));
			});
		}
	};
})

/**
 * Listen for keydown event on backspace/delete button and prevent
 * default browser behaviour from returning to previous page
 */
.directive('disableDefaultReturn', function(){
	return function(scope, element, attrs){
		
		$(document).on('keydown', function(event){
			
			var $target = $(event.target);

			if((event.keyCode == 8 || event.keyCode == 73) && $target.is('input') === false && $target.is('textarea') === false){
				event.preventDefault();
			}
		});
	};
})
/** 
 * Two way data binding frameworks have problems with auto fill functionality
 * due to browsers failing to submit a change event on selection of auto fill option.
 * As a work around grab input value from form on submit instead and assign back to 
 * scope by triggering change event.
 * See: https://github.com/angular/angular.js/issues/1460
 */
.directive('form', function() {
	return {
		restrict: 'E',
		priority: 10,
		link: function(scope, element, attrs) {

			var $form = element;

			//Listen for submit click
			$form.find(':submit').bind('click', function(event) {

				//Loop through inputs 
				$.each($form.find('input'), function(key, val){
					
					if($(this).val().length){
							
						//Triger input update
						$(this).trigger('input');
					}
				});
			});
		}
	};
})
/** 
 * Page scroll top/bottom 
 * <div data-scroll="top"></div>
 * <div data-scroll="bottom"></div>
 * <div data-scroll="#element"></div>
 */
.directive('scroll', function($document){
	return function(scope, element, attrs){

		var scrollDistance;

		element.bind('click', function(){

			if(attrs.scroll === 'top'){

				scrollDistance = 0;

			}else if(attrs.scroll === 'bottom'){

				scrollDistance = $document.height();

			//Scroll to defined position of element
			//Subtract header height to make sure header is not overlapping container
			}else {

				scrollDistance = $(attrs.scroll).offset().top;
			}

			$('html, body').animate({scrollTop:scrollDistance}, '600');
		});
	};
});