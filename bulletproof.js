(function() {
	"use strict";

	/**
	 * Prevent extensibility, property deletion
	 * and value change of js objects.
	 *           .-""-.
	 *          / .--. \
	 *         / /    \ \
	 *         | |    | |
	 *         | |.-""-.|
	 *        ///`.::::.`\
	 *       ||| ::/  \:: ;
	 *       ||; ::\__/:: ;
	 *        \\\ '::::' /
	 *         `=':-..-'`
	 */


	/**
	 * Prevent extensions with Object.preventExtensions.
	 */
	var obj1 = {
		foo: "foo"
	};

	Object.preventExtensions(obj1);

	try {
		obj1.bar = "bar"; // This won't work
		console.log(obj1);
	} catch (e) {
		console.log(e);
	}


	/**
	 * Prevent extension and removal of object
	 * properties with Object.seal
	 */
	var obj2 = {};

	Object.defineProperty(obj2, "foo", {
		value: "foo"
	});

	Object.seal(obj2);

	try {
		// Trying to define another property will not work..
		Object.defineProperty(obj2, "foo", {
			value: "bar"
		});

	} catch (e) {
		console.log(e);
	}


	/**
	 * Nothing can be changed with Object.freeze
	 */
	var obj3 = {
		foo: "foo1"
	};

	Object.freeze(obj3);

	try {
		// All of the following will fail, and result in errors in strict mode
		obj3.foo = "foo2"; // cannot change values
		obj3.bar = "bar"; // cannot add a property
		delete obj3.bar; // cannot delete a property

		// cannot call defineProperty on a frozen object
		Object.defineProperty(obj3, "foo", {
			value: "foo2"
		});

	} catch (e) {
		console.log(e);
	}
}());