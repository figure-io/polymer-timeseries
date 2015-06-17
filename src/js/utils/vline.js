'use strict';

/**
* FUNCTION: vline( ctx )
*	Wraps a function context and returns a function.
*
* @param {Object} ctx - context
* @returns {Function} function for creating a vertical line using an SVG path
*/
function vline( ctx ) {
	/**
	* FUNCTION: vline( d, i )
	*	Creates a vertical line using an SVG path.
	*
	* @private
	* @param {Array} d - datum
	* @param {Number} i - datum index
	* @returns {String} SVG path string
	*/
	return function vline( d ) {
		var x, h, p1, p2;
		x = ctx._x( d );
		h = ctx._graphHeight();
		p1 = x + ',' + h;
		p2 = x + ',0';
		return 'M' + p1 + 'L' + p2;
	}; // end FUNCTION vline()
} // end FUNCTION vline()

// EXPORTS //

module.exports = vline;
