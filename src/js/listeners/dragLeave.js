'use strict';

/**
* FUNCTION: onDragLeave( evt, detail, sender )
*	Event handler invoked on a 'dragleave' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Boolean} false
*/
function onDragLeave( evt ) {
	/* jshint validthis:true */

	// TODO: define additional behavior

	this.fire( 'dragLeave', evt );
	return false;
} // end FUNCTION onDragLeave()


// EXPORTS //

module.exports = onDragLeave;
