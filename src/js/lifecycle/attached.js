'use strict';

/**
* FUNCTION: attached()
*	Event listener for when an element is inserted in the DOM.
*/
function attached() {
	/* jshint validthis:true */
	this._create()
		._addListeners();
} // end FUNCTION attached()


// EXPORTS //

module.exports = attached;
