'use strict';

/**
* FUNCTION: onDragEnd( d, i )
*	Event handler invoked on a 'dragend' event.
*
* @param {Array|Number} d - data
* @param {Number} i - index
* @returns {Boolean} false
*/
function onDragEnd( d, i ) {
	/* jshint validthis:true */

	// Remove the dragged label:
	this.labels.splice( i, 1 );

	// Remove the dragged timeseries:
	this.data.splice( i, 1 );

	if ( !this.data.length && !this.labels.length ) {
		this.clear();
	}
	this.fire( 'dragEnd', this._d3.event );
	return false;
} // end FUNCTION onDragEnd()


// EXPORTS //

module.exports = onDragEnd;
