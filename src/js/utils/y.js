'use strict';

/**
* FUNCTION: y( yScale )
*	Wraps a scale and returns a function.
*
* @param {Function} yScale - y-scale
* @returns {Function} function which maps a y-value to a pixel value
*/
function y( yScale ) {
	/**
	* FUNCTION: y( d )
	*	Maps a y-value to a pixel value.
	*
	* @param {Array} d - datum
	* @returns {Number} pixel value
	*/
	return function y( d ) {
		/* jshint validthis:true */
		return yScale( d[ 1 ] );
	}; // end FUNCTION y()
} // end FUNCTION y()


// EXPORTS //

module.exports = y;
