/* global window */
'use strict';

/**
* FUNCTION: addListeners()
*	Adds event listeners.
*
* @returns {Object} context
*/
function addListeners() {
	/* jshint validthis:true */
	this.removeListeners();
	if ( this.autoResize ) {
		window.addEventListener( 'resize', this._onResize, false );
	}
	return this;
} // end FUNCTION addListeners()


// EXPORTS //

module.exports = addListeners;
