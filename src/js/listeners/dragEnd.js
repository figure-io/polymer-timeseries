'use strict';

/**
* FUNCTION: onDragEnd( ctx )
*	Wraps a function context and returns an event handler.
*
* @param {Object} ctx - context
* @returns {Function} event handler
*/
function onDragEnd( ctx ) {
	/**
	* FUNCTION: onDragEnd( d, i )
	*	Event handler invoked on a 'dragend' event.
	*
	* @param {Array|Number} d - data
	* @param {Number} i - index
	* @returns {Boolean} false
	*/
	return function onDragEnd( d, i ) {
		// Remove the dragged label:
		ctx.labels.splice( i, 1 );

		// Remove the dragged timeseries:
		ctx.data.splice( i, 1 );

		// FIXME: having to reallocate memory should not be the answer!!!
		ctx.data = ctx.data.slice();
		ctx.labels = ctx.labels.slice();

		if ( !ctx.data.length && !ctx.labels.length ) {
			ctx.clear();
		}
		ctx.fire( 'dragEnd', ctx._d3.event );
		return false;
	}; // end FUNCTION onDragEnd()
} // end FUNCTION onDragEnd()


// EXPORTS //

module.exports = onDragEnd;
