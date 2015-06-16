'use strict';

/**
* FUNCTION: getLabel( d, i )
*	Returns a label based on a provided index.
*
* @param {Array} d - datum
* @param {Number} i - index
* @returns {String} data label
*/
function getLabel( d, i ) {
	/* jshint validthis:true */
	return this.labels[ i ];
} // end FUNCTION getLabel()


// EXPORTS //

module.exports = getLabel;
