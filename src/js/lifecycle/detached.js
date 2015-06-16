'use strict';

/**
* FUNCTION: detached()
*	Event listener for when an element is removed from the DOM.
*/
function detached() {
	/* jshint validthis:true */
	this._removeListeners();
} // end FUNCTION detached()


// EXPORTS //

module.exports = detached;
