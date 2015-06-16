'use strict';

/**
* FUNCTION: graphWidth()
*	Computes the expected graph width.
*
* @returns {Number} graph width
*/
function graphWidth() {
	/* jshint validthis:true */
	return this.width - this.paddingLeft - this.paddingRight;
} // end FUNCTION graphWidth()


// EXPORTS //

module.exports = graphWidth;
