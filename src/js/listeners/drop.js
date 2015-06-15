'use strict';

/**
* FUNCTION: onDrop( evt, detail, sender )
*	Event handler invoked on a 'drop' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Undefined|Boolean} undefined or false
*/
function onDrop( evt ) {
	/* jshint validthis: true */
	var types = evt.dataTransfer.types,
		flg = false,
		mimeType,
		payload;

	if ( !this.isDroppable ) {
		return;
	}
	mimeType  = 'application/x-polymer-chart-data';
	for ( var i = 0; i < types.length; i++ ) {
		if ( types[ i ] === mimeType ) {
			flg = true;
			break;
		}
	}
	if ( !flg ) {
		return;
	}
	payload = evt.dataTransfer.getData( 'application/x-polymer-chart-data' );

	payload = JSON.parse( payload );

	// Add the new dataset...
	if ( payload.data.length ) {
		this.data.push( payload.data );
	}
	// Add the new label:
	this.labels.push( payload.label );

	// TODO: define additional behavior (#39)

	if ( evt.preventDefault ) {
		evt.preventDefault();
	}
	if ( evt.stopPropagation ) {
		evt.stopPropagation();
	}
	this.fire( 'dropped', payload );
	return false;
} // end FUNCTION onDrop()


// EXPORTS //

module.exports = onDrop;
