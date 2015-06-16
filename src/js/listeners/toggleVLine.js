'use strict';

/**
* FUNCTION: toggleVLine( d, i )
*	Event handler to toggle a vertical line marking an annotation.
*
* @param {Number} d - element data
* @param {Number} i - element index
* @returns {Boolean} false
*/
function toggleVLine( d, i ) {
	/* jshint validthis:true */
	var d3 = this._d3,
		path,
		flg;

	// Get the vertical line element corresponding to the clicked annotation marker...
	path = d3.select( this.$.annotationLines[ 0 ][ i ] );

	// NOTE: catch case where method may be invoked with an out-of-bounds index; e.g., 3rd party code. => this should not happen. Do not expose to 3rd parties.
	if ( !path.node() ) {
		return;
	}
	// Toggle the line visibility...
	flg = !path.classed( 'hidden' );
	path.classed( 'hidden', flg );

	// FIXME: clicked event should be moved to click handler
	this.fire( 'clicked', {
		'el': 'annotationMarker',
		'data': {
			'idx': i,
			'state': ( flg ? 'hidden' : '' )
		},
		'msg': 'Annotation marker clicked.'
	});
	if ( !flg ) {
		this.fire( 'annotation', {
			'idx': i,
			'value': d[ 0 ]
		});
	}
	return false;
} // end FUNCTION toggleVLine()


// EXPORTS //

module.exports = toggleVLine;
