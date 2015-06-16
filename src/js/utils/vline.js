'use strict';

/**
* FUNCTION: vline( d, i )
*	Creates a vertical line using an SVG path.
*
* @private
* @param {Array} d - datum
* @param {Number} i - datum index
* @returns {String} SVG path string
*/
function vline( d ) {
	/* jshint validthis: true */
	var x, h, p1, p2;
	x = this._x( d );
	h = this._graphHeight();
	p1 = x + ',' + h;
	p2 = x + ',0';
	return 'M' + p1 + 'L' + p2;
} // end FUNCTION vline()


// EXPORTS //

module.exports = vline;
