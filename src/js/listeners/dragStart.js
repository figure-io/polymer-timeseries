'use strict';

/**
* FUNCTION: onDragStart( ctx )
*	Wraps a function context and returns an event handler.
*
* @param {Object} ctx - context
* @returns {Function} event handler
*/
function onDragStart( ctx ) {
	/**
	* FUNCTION: onDragStart( d, i )
	*	Event handler invoked at the start of dragging chart elements.
	*
	* @param {Array|Number} d - element data
	* @param {Number} i - element index
	* @returns {Boolean} false
	*/
	return function onDragStart( d, i ) {
		var evt = ctx._d3.event,
			path,
			label,
			data;

		// Get the label:
		label = ctx.$.legendLabels[ i ][ 0 ].innerHTML;

		// Get the path data...
		if ( ctx.$.paths ) {
			path = ctx.$.paths[ 0 ][ i ];
			// Possibility that a corresponding path has not yet been drawn; e.g., more labels than datasets.
			if ( path ) {
				data = ctx._d3.select( path ).data();
			} else {
				data = [];
			}
		} else {
			data = [];
		}
		// Create a data object:
		data = {
			'uid': ctx.__uid__,
			'id': i,
			'type': 'timeseries',
			'data': data[ 0 ],
			'label': label,
			'xMin': ctx.xMin,
			'xMax': ctx.xMax,
			'yMin': ctx.yMin,
			'yMax': ctx.yMax,
			'yLabel': ctx.yLabel
		};

		// Set the drag payload:
		evt.dataTransfer.effectAllowed = 'move';
		evt.dataTransfer.setData( 'application/x-polymer-chart-data', JSON.stringify( data ) );

		// TODO: define additional behavior

		ctx.fire( 'dragStart', evt );
		return false;
	}; // end FUNCTION onDragStart()
} // end FUNCTION onDragStart()


// EXPORTS //

module.exports = onDragStart;
