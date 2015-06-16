/* global window */
'use strict';

/**
* FUNCTION: removeListeners()
*	Removes event listeners.
*
* @returns {Object} context
*/
function removeListeners() {
	/* jshint validthis:true */
	window.removeEventListener( 'resize', this._onResize );
	return this;
} // end FUNCTION removeListeners()


// EXPORTS //

module.exports = removeListeners;
