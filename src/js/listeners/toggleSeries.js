'use strict';

/**
* FUNCTION: toggleSeries( ctx )
*	Wraps a function context and returns an event handler.
*
* @param {Object} ctx - context
* @returns {Function} event handler
*/
function toggleSeries( ctx ) {
	/**
	* FUNCTION: toggleSeries( d, i )
	*	Event handler to toggle a displayed time series.
	*
	* @param {Number} d - element data
	* @param {Number} i - element index
	* @returns {Boolean} false
	*/
	return function toggleSeries( d, i ) {
		var d3 = ctx._d3,
			selection,
			path,
			flg;

		// Toggle the legend entry visibility...
		selection = d3.select( ctx.$.legendEntries[ 0 ][ i ] );

		// NOTE: catch case where method may be invoked with an out-of-bounds index; e.g., 3rd party code. => this should not happen. Do not expose to 3rd parties.
		if ( !selection.node() ) {
			return;
		}
		flg = !selection.classed( 'hidden' );
		selection.classed( 'hidden', flg );

		// Toggle the path visibility...
		path = d3.select( ctx.$.paths[ 0 ][ i ] );

		if ( path.node() ) {
			path.classed( 'hidden', flg );
		}

		// FIXME: this should not be in this function. The function should be kept general. Move to separate click handler. Bind two listeners to the legend entry --> no, click handler should simply invoke the toggleSeries method with `(null, i)`. Here, emit a toggled event (???).
		ctx.fire( 'clicked', {
			'el': 'legend',
			'data': {
				'idx': i,
				'state': ( flg ? 'hidden' : '' )
			},
			'msg': 'Legend entry clicked.'
		});
		return false;
	}; // end FUNCTION toggleSeries()
} // end FUNCTION toggleSeries()


// EXPORTS //

module.exports = toggleSeries;
