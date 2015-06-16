'use strict';

/**
* FUNCTION: toggleVLine( ctx )
*	Wraps a function context and returns an event handler.
*
* @param {Object} ctx - context
* @returns {Function} event handler
*/
function toggleVLine( ctx ) {
	/**
	* FUNCTION: toggleVLine( d, i )
	*	Event handler to toggle a vertical line marking an annotation.
	*
	* @param {Number} d - element data
	* @param {Number} i - element index
	* @returns {Boolean} false
	*/
	return function toggleVLine( d, i ) {
		var d3 = ctx._d3,
			path,
			flg;

		// Get the vertical line element corresponding to the clicked annotation marker...
		path = d3.select( ctx.$.annotationLines[ 0 ][ i ] );

		// NOTE: catch case where method may be invoked with an out-of-bounds index; e.g., 3rd party code. => this should not happen. Do not expose to 3rd parties.
		if ( !path.node() ) {
			return;
		}
		// Toggle the line visibility...
		flg = !path.classed( 'hidden' );
		path.classed( 'hidden', flg );

		// FIXME: clicked event should be moved to click handler
		ctx.fire( 'clicked', {
			'el': 'annotationMarker',
			'data': {
				'idx': i,
				'state': ( flg ? 'hidden' : '' )
			},
			'msg': 'Annotation marker clicked.'
		});
		if ( !flg ) {
			ctx.fire( 'annotation', {
				'idx': i,
				'value': d[ 0 ]
			});
		}
		return false;
	}; // end FUNCTION toggleVLine()
} // end FUNCTION toggleVLine()


// EXPORTS //

module.exports = toggleVLine;
