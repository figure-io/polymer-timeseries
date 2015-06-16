'use strict';

/**
* FUNCTION: toggleSeries( d, i )
*	Event handler to toggle a displayed time series.
*
* @param {Number} d - element data
* @param {Number} i - element index
* @returns {Boolean} false
*/
function toggleSeries( d, i ) {
	/* jshint validthis:true */
	var d3 = this._d3,
		selection,
		path,
		flg;

	// Toggle the legend entry visibility...
	selection = d3.select( this.$.legendEntries[ 0 ][ i ] );

	// NOTE: catch case where method may be invoked with an out-of-bounds index; e.g., 3rd party code. => this should not happen. Do not expose to 3rd parties.
	if ( !selection.node() ) {
		return;
	}
	flg = !selection.classed( 'hidden' );
	selection.classed( 'hidden', flg );

	// Toggle the path visibility...
	path = d3.select( this.$.paths[ 0 ][ i ] );

	if ( path.node() ) {
		path.classed( 'hidden', flg );
	}

	// FIXME: this should not be in this function. The function should be kept general. Move to separate click handler. Bind two listeners to the legend entry --> no, click handler should simply invoke the toggleSeries method with `(null, i)`. Here, emit a toggled event (???).
	this.fire( 'clicked', {
		'el': 'legend',
		'data': {
			'idx': i,
			'state': ( flg ? 'hidden' : '' )
		},
		'msg': 'Legend entry clicked.'
	});
	return false;
} // end FUNCTION toggleSeries()


// EXPORTS //

module.exports = toggleSeries;
