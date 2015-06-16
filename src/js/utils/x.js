'use strict';

/**
* FUNCTION: x( d )
*	Maps an x-value to a pixel value.
*
* @param {Array} d - datum
* @returns {Number} pixel value
*/
function x( d ) {
	/* jshint validthis:true */
	return this._xScale( d[ 0 ] );
} // end FUNCTION x()


// EXPORTS //

module.exports = x;
