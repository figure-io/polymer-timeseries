'use strict';

/**
* FUNCTION: vline( xScale, graphHeight )
*	Wraps a scale and function to calculate the graph height and returns a function.
*
* @param {Function} x-scale
* @param {Function} function to calculate the graph height
* @returns {Function} function for creating a vertical line using an SVG path
*/
function vline( xScale, graphHeight ) {
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
		x = xScale( d );
		h = graphHeight();
		p1 = x + ',' + h;
		p2 = x + ',0';
		return 'M' + p1 + 'L' + p2;
	}; // end FUNCTION vline()
} // end FUNCTION vline()

// EXPORTS //

module.exports = vline;
