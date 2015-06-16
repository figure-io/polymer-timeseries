'use strict';

/**
* FUNCTION: isDefined( d )
*	Accessor function which controls where a line is defined. Used to specify how missing values are encoded. Default behavior is to ignore data points or y-values which are `null`. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined}.
*
* @param {Array} d - datum
* @return {Boolean} boolean indicating if the value is defined
*/
function isDefined( d ) {
	return ( d !== null && d[ 1 ] !== null );
} // end FUNCTION isDefined()


// EXPORTS //

module.exports = isDefined;
