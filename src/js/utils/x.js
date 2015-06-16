'use strict';

/**
* FUNCTION: x( xScale )
*	Wraps a scale and returns a function.
*
* @param {Function} xScale - x-scale
* @returns {Function} function which maps an x-value to a pixel value
*/
function x( xScale ) {
	/**
	* FUNCTION: x( d )
	*	Maps an x-value to a pixel value.
	*
	* @param {Array} d - datum
	* @returns {Number} pixel value
	*/
	return function x( d ) {
		return xScale( d[ 0 ] );
	}; // end FUNCTION x()
} // end FUNCTION x()


// EXPORTS //

module.exports = x;
