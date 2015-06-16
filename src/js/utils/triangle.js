'use strict';

/**
* FUNCTION: triangle( d, i )
*	Creates a triangle using an SVG path.
*
* @private
* @param {Array} d - datum
* @param {Number} i - datum index
* @returns {String} SVG path string
*/
function triangle( d ) {
	/* jshint validthis: true */
	var x, p1, p2, p3;
	x = this._x( d );
	p1 = (x-4) + ',-9';
	p2 = x + ',-2';
	p3 = (x+4) + ',-9';
	return 'M' + p1 + 'L' + p2 + 'L' + p3 + 'Z';
} // end FUNCTION triangle()


// EXPORTS //

module.exports = triangle;
