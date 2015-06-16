'use strict';

/**
* FUNCTION: graphHeight()
*	Computes the expected graph height.
*
* @returns {Number} graph height
*/
function graphHeight() {
	/* jshint validthis:true */
	return this.height - this.paddingTop - this.paddingBottom;
} // end FUNCTION graphHeight()


// EXPORTS //

module.exports = graphHeight;
