'use strict';

/**
* FUNCTION: getLabel( ctx )
*	Wraps a function context and returns a function.
*
* @param {Object} ctx - context
* @returns {Function} function which returns a label
*/
function getLabel( ctx ) {
	/**
	* FUNCTION: getLabel( d, i )
	*	Returns a label based on a provided index.
	*
	* @param {Array} d - datum
	* @param {Number} i - index
	* @returns {String} data label
	*/
	return function getLabel( d, i ) {
		return ctx.labels[ i ];
	}; // end FUNCTION getLabel()
}  // end FUNCTION getLabel()


// EXPORTS //

module.exports = getLabel;
