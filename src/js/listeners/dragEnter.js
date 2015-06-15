'use strict';

/**
* FUNCTION: onDragEnter( evt, detail, sender )
*	Event handler invoked on a 'dragenter' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Boolean} false
*/
function onDragEnter( evt ) {
	/* jshint validthis:true */
	if ( evt.preventDefault ) {
		evt.preventDefault();
	}

	// TODO: define additional behavior

	this.fire( 'dragEnter', evt );
	return false;
} // end FUNCTION onDragEnter()


// EXPORTS //

module.exports = onDragEnter;
