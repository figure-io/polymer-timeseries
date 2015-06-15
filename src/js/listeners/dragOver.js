'use strict';

/**
* FUNCTION: onDragOver( evt, detail, sender )
*	Event handler invoked on a 'dragover' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Boolean} false
*/
function onDragOver( evt ) {
	if ( evt.preventDefault ) {
		evt.preventDefault();
	}
	return false;
} // end FUNCTION onDragOver()


// EXPORTS //

module.exports = onDragOver;
