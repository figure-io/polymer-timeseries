'use strict';

/**
* FUNCTION: triangle( xScale )
*	Wraps a scale and returns a function.
*
* @param {Function} x-scale
* @returns {Function} function for creating a triangle using an SVG path
*/
function triangle( xScale ) {
	/**
	* FUNCTION: triangle( d, i )
	*	Creates a triangle using an SVG path.
	*
	* @private
	* @param {Array} d - datum
	* @param {Number} i - datum index
	* @returns {String} SVG path string
	*/
	return function triangle( d ) {
		var x, p1, p2, p3;
		x = xScale( d );
		p1 = (x-4) + ',-9';
		p2 = x + ',-2';
		p3 = (x+4) + ',-9';
		return 'M' + p1 + 'L' + p2 + 'L' + p3 + 'Z';
	}; // end FUNCTION triangle()
} // end FUNCTION triangle()


// EXPORTS //

module.exports = triangle;
