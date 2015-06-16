'use strict';

/**
* FUNCTION: y( d )
*	Maps an y-value to a pixel value.
*
* @param {Array} d - datum
* @returns {Number} pixel value
*/
function y( d ) {
	/* jshint validthis:true */
	return this._yScale( d[ 1 ] );
} // end FUNCTION y()


// EXPORTS //

module.exports = y;
