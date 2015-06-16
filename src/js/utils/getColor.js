'use strict';

/**
* FUNCTION: getColor( d, i )
*	Returns a color based on a provided index.
*
* @param {Array} d - datum
* @param {Number} i - index
* @returns {String} color class/data attribute
*/
function getColor( d, i ) {
	/* jshint validthis:true */
	return this._colors[ i % this._colors.length ];
} // end FUNCTION getColor()


// EXPORTS //

module.exports = getColor;
