'use strict';

/**
* FUNCTION: getColor( ctx )
*	Wraps a function context and returns a function.
*
* @param {Object} ctx - context
* @returns {Function} function which returns a color class
*/
function getColor( ctx ) {
	/**
	* FUNCTION: getColor( d, i )
	*	Returns a color based on a provided index.
	*
	* @param {Array} d - datum
	* @param {Number} i - index
	* @returns {String} color class/data attribute
	*/
	return function getColor( d, i ) {
		return ctx._colors[ i % ctx._colors.length ];
	}; // end FUNCTION getColor()
} // end FUNCTION getColor()


// EXPORTS //

module.exports = getColor;
